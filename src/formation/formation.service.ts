import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFormationDto } from './dto/create-formation.dto';
import { UpdateFormationDto } from './dto/update-formation.dto';
import { Formation } from './entities/formation.entity';
import { Formateur } from 'src/formateur/entities/formateur.entity';
import { FormateurService } from 'src/formateur/formateur.service';
import { Video } from 'src/video/entities/video.entity';

@Injectable()
export class FormationService {
  constructor(
    @InjectRepository(Formation)
    private formationRep: Repository<Formation>,

    @InjectRepository(Formateur)
    private formateurRep: Repository<Formateur>,

    private formateurService: FormateurService,
    @InjectRepository(Video)
    private videoRep: Repository<Video>,
  ) {}

  async create(
    createFormationDto: CreateFormationDto,
    image: string,
    videoUploadName: string,
  ) {
    if (image === undefined || videoUploadName === undefined) return false;
    console.log(image + ' and ' + videoUploadName);

    const { formateurId, ...rest } = createFormationDto;
    console.log('formateurId = ' + formateurId);
    const formateur = await this.formateurService.findOne(formateurId);

    console.log('formateur = ' + formateur);
    const newForm = await this.formationRep.create(rest);
    newForm.coverImage = image;
    const video = await this.videoRep.create(createFormationDto.video);
    video.fileName = videoUploadName;
    console.log('video = ' + JSON.stringify(video));
    newForm.videos = [];
    newForm.videos.push(video);
    newForm.formateur = formateur;
    console.log(newForm);
    return this.formationRep.save(newForm);
  }

  findAll() {
    return this.formationRep.find({ relations: ['formateur', 'videos'] });
  }

  findOne(id: number) {
    return this.formationRep.findOne({ where: { id }, relations: ['videos'] });
  }

  update(id: number, updateFormationDto: UpdateFormationDto) {
    return this.formationRep.update(id, updateFormationDto);
  }

  remove(id: number) {
    return this.formationRep.delete(id);
  }
}
