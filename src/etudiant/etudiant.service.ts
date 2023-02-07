import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEtudiantDto } from './dto/create-etudiant.dto';
import { UpdateEtudiantDto } from './dto/update-etudiant.dto';
import { Etudiant } from './entities/etudiant.entity';

@Injectable()
export class EtudiantService {
  constructor(
    @InjectRepository(Etudiant)
    private etudRep: Repository<Etudiant>,
  ) {}
  create(createEtudiantDto: CreateEtudiantDto) {
    return this.etudRep.save(createEtudiantDto);
  }

  findAll() {
    return this.etudRep.find();
  }

  findOne(id: number) {
    return this.etudRep.findOne({
      where: { id: id },
    });
  }

  update(id: number, updateEtudiantDto: UpdateEtudiantDto) {
    return this.etudRep.update(id, updateEtudiantDto);
  }

  remove(id: number) {
    return this.etudRep.delete(id);
  }

  async login(nom_complet: string, password: string): Promise<string> {
    const etudiant = await this.etudRep.findOne({ where: { nom_complet } });
    if (!etudiant) {
      throw new Error('Invalid credentials');
    }
    if (password !== etudiant.password) {
      throw new Error('Invalid credentials');
    }
    return 'secret-token';
  }



}
