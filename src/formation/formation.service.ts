import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFormationDto } from './dto/create-formation.dto';
import { UpdateFormationDto } from './dto/update-formation.dto';
import { Formation } from './entities/formation.entity';
import { Formateur } from 'src/formateur/entities/formateur.entity';
import { FormateurService } from 'src/formateur/formateur.service';

@Injectable()
export class FormationService {
  constructor(
    @InjectRepository(Formation)
    private formationRep: Repository<Formation>,

    @InjectRepository(Formateur)
    private formateurRep: Repository<Formateur>,

    private formateurService: FormateurService,
  ) {}

  async create(createFormationDto: CreateFormationDto, filename: string) {
    const { formateurId, ...rest } = createFormationDto;
    console.log('formateurId = ' + formateurId);
    const formateur = await this.formateurService.findOne(formateurId);

    console.log('formateur = ' + formateur);
    const newForm = await this.formationRep.create(rest);
    newForm.coverImage = filename;
    newForm.formateur = formateur;
    console.log(newForm);
    return this.formationRep.save(newForm);
  }
  

  findAll() {
    return this.formationRep.find();
  }



  findOne(id: number) {
    return this.formationRep.findOne({ where: { id } });
  }

  update(id: number, updateFormationDto: UpdateFormationDto) {
    return this.formationRep.update(id, updateFormationDto);
  }

  remove(id: number) {
    return this.formationRep.delete(id);
  }
}

