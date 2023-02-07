import { Module } from '@nestjs/common';
import { AchatService } from './achat.service';
import { AchatController } from './achat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Achat } from './entities/achat.entity';
import { Etudiant } from 'src/etudiant/entities/etudiant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Achat, Etudiant])],
  controllers: [AchatController],
  providers: [AchatService],
})
export class AchatModule {}
