import { Module } from '@nestjs/common';
import { FormationService } from './formation.service';
import { FormationController } from './formation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Formation } from './entities/formation.entity';
<<<<<<< HEAD
import { MulterModule } from '@nestjs/platform-express/multer';

@Module({
  imports: [
    TypeOrmModule.forFeature([Formation]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
=======
import { FormateurModule } from 'src/formateur/formateur.module';
import { Formateur } from 'src/formateur/entities/formateur.entity';
import { Repository } from 'typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([Formation]), FormateurModule],
>>>>>>> refs/remotes/origin/master
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
