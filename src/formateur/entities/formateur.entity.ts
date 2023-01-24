import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Formation } from 'src/formation/entities/formation.entity';

@Entity()
export class Formateur {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom_complet: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  bio: string;

  @OneToMany((type) => Formation, (formation) => formation.formateur)
  formations: Formation[];
}
