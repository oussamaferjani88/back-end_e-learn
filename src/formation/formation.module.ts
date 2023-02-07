import { Module } from '@nestjs/common';
import { FormationService } from './formation.service';
import { FormationController } from './formation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Formation } from './entities/formation.entity';
import { FormateurModule } from 'src/formateur/formateur.module';
import { Formateur } from 'src/formateur/entities/formateur.entity';
import { Repository } from 'typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([Formation]), FormateurModule],
  controllers: [FormationController],
  providers: [
    FormationService,
    {
      provide: 'FormateurRepository',
      useClass: Repository<Formateur>,
    }, 
  ],
})
export class FormationModule {}
