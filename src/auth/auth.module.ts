import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport/dist';
import { EtudiantModule } from 'src/etudiant/etudiant.module';
import { FormateurModule } from 'src/formateur/formateur.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [EtudiantModule, FormateurModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
