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
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common/decorators';

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
  @Header('Access-Control-Allow-Origin', '*')
  async serveVideo(@Res() res: Response, @Param('filename') filename: string) {
    const video = readFileSync(`./uploads/${filename}`);
    res.send(video);
  }
}
