import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Etudiant } from 'src/etudiant/entities/etudiant.entity';
import { Formation } from 'src/formation/entities/formation.entity';
import {
  DataSource,
  getRepository,
  Repository,
  TreeRepositoryNotSupportedError,
} from 'typeorm';
import { CreateAchatDto } from './dto/create-achat.dto';
import { UpdateAchatDto } from './dto/update-achat.dto';
import { Achat } from './entities/achat.entity';

@Injectable()
export class AchatService {
  constructor(
    @InjectRepository(Achat)
    private achatRep: Repository<Achat>,
    private dataSource: DataSource,
  ) {}

  async create(createAchatDto: CreateAchatDto) {
    const { etudId, formationId, prix } = createAchatDto;
    const etudRep = this.dataSource.getRepository(Etudiant);
    const formRep = this.dataSource.getRepository(Formation);
    const etudiant = await etudRep.findOneBy({ id: etudId });
    const form = formRep.findOneBy({ id: formationId });
    /*const test = await this.achatRep.create({
      etudiant,
      formation: form,
      prix,
    });*/
    return this.achatRep.save(createAchatDto);
  }

  findAll() {
    return `This action returns all achat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} achat`;
  }

  update(id: number, updateAchatDto: UpdateAchatDto) {
    return `This action updates a #${id} achat`;
  }

  remove(id: number) {
    return `This action removes a #${id} achat`;
  }
}
