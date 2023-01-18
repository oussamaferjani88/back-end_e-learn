import { Injectable } from '@nestjs/common';
import { CreateAchatDto } from './dto/create-achat.dto';
import { UpdateAchatDto } from './dto/update-achat.dto';

@Injectable()
export class AchatService {
  create(createAchatDto: CreateAchatDto) {
    return 'This action adds a new achat';
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
