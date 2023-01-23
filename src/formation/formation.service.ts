import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFormationDto } from './dto/create-formation.dto';
import { UpdateFormationDto } from './dto/update-formation.dto';
import { Formation } from './entities/formation.entity';

@Injectable()
export class FormationService {
  constructor(
    @InjectRepository(Formation)
    private formationRep: Repository<Formation>,
  ) {}
  create(createFormationDto: CreateFormationDto) {
    return this.formationRep.save(createFormationDto);
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
