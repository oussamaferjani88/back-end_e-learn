import { Achat } from 'src/achat/entities/achat.entity';
import { Categorie } from 'src/categorie/entities/categorie.entity';
import { Formateur } from 'src/formateur/entities/formateur.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Formation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titre: string;

  @Column()
  description: string;

  @Column()
  langue: string;

  @Column()
  note: string;

  @Column({ type: 'real' })
  prix: string;

  // @Column()
  // video: string;

  // @Column()
  // document: string;

  @ManyToOne((type) => Formateur, (formateur) => formateur.formations)
  formateur: Formateur;

  @OneToMany((type) => Achat, (achat) => achat.formation)
  achats: Achat[];

  @ManyToOne((type) => Categorie, (categorie) => categorie.formations)
  categorie: Categorie;
}
