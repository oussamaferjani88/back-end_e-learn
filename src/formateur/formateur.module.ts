import { Module } from '@nestjs/common';
import { FormateurService } from './formateur.service';
import { FormateurController } from './formateur.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Formateur } from './entities/formateur.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Formateur])],
  controllers: [FormateurController],
  providers: [FormateurService],
  exports: [FormateurService]
})
export class FormateurModule {}
