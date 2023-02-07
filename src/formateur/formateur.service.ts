import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFormateurDto } from './dto/create-formateur.dto';
import { UpdateFormateurDto } from './dto/update-formateur.dto';
import { Formateur } from './entities/formateur.entity';

@Injectable()
export class FormateurService {
  constructor(
    @InjectRepository(Formateur)
    private formateurRep: Repository<Formateur>,
  ) {}
  create(createFormateurDto: CreateFormateurDto) {
    return this.formateurRep.save(createFormateurDto);
  }

  findAll() {
    return this.formateurRep.find();
  }

  findOne(id: number) {
    return this.formateurRep.findOne({ where: { id } });
  }

  update(id: number, updateFormateurDto: UpdateFormateurDto) {
    return this.formateurRep.update(id, updateFormateurDto);
  }

  remove(id: number) {
    return this.formateurRep.delete(id);
  }



  async login(nom_complet: string, pwd: string): Promise<any> {
    const formateur = await this.formateurRep.findOne({ where: { nom_complet } });
    if (!formateur) {
      throw new Error('Invalid credentials');
    }
    if (pwd !== formateur.password) {
      throw new Error('Invalid credentials');
    }
    const {password, ...res} = formateur;
    return res;
  }







}
