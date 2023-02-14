import { Module } from '@nestjs/common';
import { FormationService } from './formation.service';
import { FormationController } from './formation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Formation } from './entities/formation.entity';
import { MulterModule } from '@nestjs/platform-express/multer';
import { Repository } from 'typeorm';
import { Formateur } from 'src/formateur/entities/formateur.entity';
import { FormateurModule } from 'src/formateur/formateur.module';
import { VideoModule } from 'src/video/video.module';
import { Video } from 'src/video/entities/video.entity';

@Module({
  imports: [
    FormateurModule,
    VideoModule,
    TypeOrmModule.forFeature([Formation, Video]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
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
