import { Module } from '@nestjs/common';
import { EtudiantService } from './etudiant.service';
import { EtudiantController } from './etudiant.controller';
import { Etudiant } from './entities/etudiant.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Etudiant])],
  controllers: [EtudiantController],
  providers: [EtudiantService],
  exports: [EtudiantService],
})
export class EtudiantModule {}
