// import { Etudiant } from "src/etudiant/entities/etudiant.entity";
// import { Formation } from "src/formation/entities/formation.entity";

export class CreateAchatDto {
  etudId: number;
  formationId: number;
  prix: string;
  date_achat : Date;
  // formationId : Formation;
  // etudiantId : Etudiant;
}
