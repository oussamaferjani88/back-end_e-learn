import { Module } from '@nestjs/common';
import { FormationService } from './formation.service';
import { FormationController } from './formation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Formation } from './entities/formation.entity';
import { MulterModule } from '@nestjs/platform-express/multer';

@Module({
  imports: [
    TypeOrmModule.forFeature([Formation]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [FormationController],
  providers: [FormationService],
})
export class FormationModule {}
