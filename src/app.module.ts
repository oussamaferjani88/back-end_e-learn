import { Module } from '@nestjs/common';
import { AchatModule } from './achat/achat.module';
import { CategorieModule } from './categorie/categorie.module';
import { FormateurModule } from './formateur/formateur.module';
import { FormationModule } from './formation/formation.module';
import { AuthModule } from './auth/auth.module';
import { EtudiantModule } from './etudiant/etudiant.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    EtudiantModule,
    FormateurModule,
    FormationModule,
    AuthModule,
    CategorieModule,
    AchatModule,
    ConfigModule.forRoot({ isGlobal: true, }),
    TypeOrmModule.forRoot({
    type : 'postgres',
    host : process.env.POSTGRES_HOST,
    port : parseInt(<string>process.env.POSTGRES_PORT),
    username : process.env.POSTGRES_USER,
    password : process.env.POSTGRES_PASSWORD,
    database : process.env.POSTGRES_DATABASE,
    // autoLoadEntities : true,
    // synchronize : true,



    }),
  ]

})
export class AppModule { }
