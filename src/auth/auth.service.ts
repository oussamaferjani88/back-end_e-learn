import { Injectable } from '@nestjs/common';
import { EtudiantService } from 'src/etudiant/etudiant.service';
import { FormateurService } from 'src/formateur/formateur.service';

@Injectable()
export class AuthService {
  constructor(
    private etudService: EtudiantService,
    private formService: FormateurService,
  ) {}
  async validateUser(email: string, password: string): Promise<any> {
    var user;
    user = await this.formService.findByEmail(email);
    if (!user) {
      user = await this.etudService.findByEmail(email);
    }
    console.log(user);
    console.log();

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
