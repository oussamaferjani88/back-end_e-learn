import { Module } from '@nestjs/common';
import { FormationService } from './formation.service';
import { FormationController } from './formation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Formation } from './entities/formation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Formation])],
  controllers: [FormationController],
  providers: [FormationService],
})
export class FormationModule {}
