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

export class CreateFormationDto {
titre: string;
description: string;
langue: string;
coverImage: string;
prix: number;
formateurId: Formateur;
categorie: Categorie;
}