import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFormationDto } from './dto/create-formation.dto';
import { UpdateFormationDto } from './dto/update-formation.dto';
import { Formation } from './entities/formation.entity';
import { Formateur } from 'src/formateur/entities/formateur.entity';
import { FormateurService } from 'src/formateur/formateur.service';
import { Video } from 'src/video/entities/video.entity';
import { CreateVideoDto } from 'src/video/dto/create-video.dto';

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

  async create(createFormationDto: CreateFormationDto) {
    const { formateurId, ...rest } = createFormationDto;
    console.log('formateurId = ' + formateurId);
    const formateur = await this.formateurService.findOne(formateurId);
    console.log('formateur = ' + formateur);
    const newForm = await this.formationRep.create(rest);
    newForm.formateur = formateur;
    console.log(newForm);
    return this.formationRep.save(newForm);
  }

  async uploadCoverImage(coverImage: string, id: number) {
    return this.formationRep.update(id, { coverImage: coverImage });
  }

  async uploadVideos(video: CreateVideoDto, id: number) {
    /*
    first we need to get the formation id so before uploading the videos 
    you need to be sure that the needed formation is saved in the db 
    if not an error message will pop up in the response :)
    */
    const formation = await this.findOne(id);
    // we need to initialize the videos array property
    formation.videos = [];

    let createdVideo = await this.videoRep.create(video);
    formation.videos.push(createdVideo);
    return await this.formationRep.save(formation);
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
