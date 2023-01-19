import { Injectable } from '@nestjs/common';
import { CreateCategorieDto } from './dto/create-categorie.dto';
import { UpdateCategorieDto } from './dto/update-categorie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Categorie } from './entities/categorie.entity';
import { Repository } from 'typeorm';


@Injectable()
export class CategorieService {
  constructor(
    @InjectRepository(Categorie)
    private catRep: Repository<Categorie>,
  ) {}


  create(createCategorieDto: CreateCategorieDto) {
      return this.catRep.save(createCategorieDto);
  }

  findAll() {
    return this.catRep.find({ relations: ['formations'] });
  }

  async findOne(id : number) {
    const cat: Categorie = await this.catRep.findOne(id);
    return cat;
  }


  findByCategorie() {
    return this.catRep.find({ relations: ['formations'] });
  }

  async update(id: number, updateCategorieDto: UpdateCategorieDto) {
    return this.catRep.update(id, updateCategorieDto);
  }

  remove(id: number) {
    return this.catRep.delete(id);
  }
}
