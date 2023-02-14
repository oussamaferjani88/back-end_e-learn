import { Module } from '@nestjs/common';
import { AchatModule } from './achat/achat.module';
import { CategorieModule } from './categorie/categorie.module';
import { FormateurModule } from './formateur/formateur.module';
import { FormationModule } from './formation/formation.module';
import { AuthModule } from './auth/auth.module';
import { EtudiantModule } from './etudiant/etudiant.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoModule } from './video/video.module';
import { AppService } from './app/app.service';
import { AppController } from './app/app.controller';
import { MulterModule } from '@nestjs/platform-express';
@Module({
  imports: [
    EtudiantModule,
    FormateurModule,
    FormationModule,
    AuthModule,
    CategorieModule,
    AchatModule,
    VideoModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'karem',
      database: 'e-learn',
      autoLoadEntities: true,
      synchronize: true,
      entities: ['dist/**/*.entity.js'],
    }),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
