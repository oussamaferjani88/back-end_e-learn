import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from './entities/video.entity';
@Injectable()
export class VideoService {

  constructor(
    @InjectRepository(Video)
    private videoRep: Repository<Video>,
  ) {}
  


  create(createVideoDto: CreateVideoDto) {
    return this.videoRep.save(createVideoDto);
  }

  findAll() {
    return this.videoRep.find();
  }

  findOne(id: number) {
    return this.videoRep.findOne({ where: { id } });
  }

  update(id: number, updateVideoDto: UpdateVideoDto) {
    return this.videoRep.update(id, updateVideoDto);
  }

  remove(id: number) {
    return this.videoRep.delete(id);
  }
}
