// export class CreateFormationDto {
//   titre: string;
//   description: string;
//   langue: string;
//   note: string;
//   prix: number;
//   coverImage : string;
//   // formateurId : number;
// }
import { Formateur } from 'src/formateur/entities/formateur.entity';
import { Categorie } from 'src/categorie/entities/categorie.entity';
import { Video } from 'src/video/entities/video.entity';

export class CreateFormationDto {
  titre: string;
  description: string;
  langue: string;
  prix: string;
  formateurId: number;
  categorie: Categorie;
}
