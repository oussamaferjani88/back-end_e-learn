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
import { FileInterceptor } from '@nestjs/platform-express';
import { Header, UseInterceptors } from '@nestjs/common/decorators';

@Controller('formation')
export class FormationController {
  constructor(private readonly formationService: FormationService) {}

  @Post()
  @Header('Content-Type', 'multipart/form-data')
  @UseInterceptors(FileInterceptor('coverImage'))
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createFormationDto: CreateFormationDto,
  ) {
    console.log('my file ' + JSON.stringify(file));
    return this.formationService.create(createFormationDto, file.filename);
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



}
