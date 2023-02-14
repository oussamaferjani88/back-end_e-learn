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
} from '@nestjs/common';
import { Response } from 'express';
import { readFileSync } from 'fs';
import { FormationService } from './formation.service';
import { CreateFormationDto } from './dto/create-formation.dto';
import { UpdateFormationDto } from './dto/update-formation.dto';
import {
  FileFieldsInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import {
  Header,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common/decorators';
import * as fs from 'fs';

@Controller('formation')
export class FormationController {
  constructor(private readonly formationService: FormationService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'coverImage', maxCount: 1 },
      { name: 'vid', maxCount: 1 },
    ]),
  )
  async create(
    @UploadedFiles()
    files: { coverImage: Express.Multer.File[]; vid: Express.Multer.File[] },
    @Body() createFormationDto: CreateFormationDto,
  ) {
    return this.formationService.create(
      createFormationDto,
      files.coverImage.find((f) => f.fieldname == 'coverImage').filename,
      files.vid.find((f) => f.fieldname == 'vid').filename,
    );
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
