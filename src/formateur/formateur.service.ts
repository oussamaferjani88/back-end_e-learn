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



  async login(nom_complet: string, password: string): Promise<string> {
    const etudiant = await this.formateurRep.findOne({ where: { nom_complet } });
    if (!etudiant) {
      throw new Error('Invalid credentials');
    }
    if (password !== etudiant.password) {
      throw new Error('Invalid credentials');
    }
    return 'secret-token';
  }







}
