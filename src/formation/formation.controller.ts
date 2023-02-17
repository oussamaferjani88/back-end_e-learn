import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  Res,
  CanActivate,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import { readFileSync } from 'fs';
import { FormationService } from './formation.service';
import { CreateFormationDto } from './dto/create-formation.dto';
import { UpdateFormationDto } from './dto/update-formation.dto';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import {
  Header,
  Injectable,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common/decorators';
import * as fs from 'fs';
import { CreateVideoDto } from 'src/video/dto/create-video.dto';

@Injectable()
export class isFormationExistGuard implements CanActivate {
  constructor(private formationService: FormationService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const idFormation = req.params.id;
    console.log('#guard, formation id = ' + idFormation);
    const f = await this.formationService.findOne(idFormation);
    if (!f)
      throw new NotFoundException(`Formation with ID ${idFormation} not found`);
    return true;
  }
}

//////////////////////////////////////////////////////////

@Controller('formation')
export class FormationController {
  constructor(private readonly formationService: FormationService) {}

  @Post()
  create(@Body() createFormationDto: CreateFormationDto) {
    return this.formationService.create(createFormationDto);
  }

  // upload image

  @Post('coverImage/:id')
  @UseInterceptors(FileInterceptor('coverImage'))
  @UseGuards(isFormationExistGuard)
  uploadCoverImage(
    @UploadedFile() coverImage: Express.Multer.File,
    @Param('id') id: string,
  ) {
    console.log('coverImage = ' + JSON.stringify(coverImage));
    return this.formationService.uploadCoverImage(coverImage.filename, +id);
  }

  @Post('videos/:id')
  @UseInterceptors(FilesInterceptor('videos'))
  @UseGuards(isFormationExistGuard)

  // you need to provide an array of videos informations
  uploadVideos(
    @UploadedFiles() videos: Express.Multer.File[],
    @Param('id') id: string,
    @Body() createVideoDto: CreateVideoDto,
  ) {
    console.log(id);
    console.log(videos);
    //taking just the filenames from files
    const videosFilenames = videos.map((f) => f.filename);
    console.log(videosFilenames);
    console.log('createVideoDto = ' + JSON.stringify(createVideoDto));
    const videosDtos: CreateVideoDto[] = [];
    // assigning each filename to the create dto of a video
    for (const [index, value] of videosFilenames.entries()) {
      const v = new CreateVideoDto();
      v.Nom_video = createVideoDto.Nom_video[index];
      v.fileName = value;
      v.description = createVideoDto.description[index];
      videosDtos.push(v);
    }
    console.log('createVideoDto = ' + JSON.stringify(videosDtos));

    return this.formationService.uploadVideos(videosDtos, +id);
  }

  @Get()
  findAll() {
    return this.formationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFormationDto: UpdateFormationDto,
  ) {
    return this.formationService.update(+id, updateFormationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formationService.remove(+id);
  }

  @Get('image/:filename')
  async serveImage(@Res() res: Response, @Param('filename') filename: string) {
    const image = readFileSync(`./uploads/${filename}`);
    res.contentType('image/jpeg');
    res.send(image);
  }

  @Get('video/:filename')
  async streamVideo(
    @Req() req,
    @Res() res,
    @Param('filename') filename: string,
  ) {
    console.log('filename = ' + filename);

    const path = `./uploads/${filename}`;
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = end - start + 1;
      const file = fs.createReadStream(path, { start, end });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      };

      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(200, head);
      fs.createReadStream(path).pipe(res);
    }
  }
}
