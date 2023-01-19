import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Formation } from 'src/formation/entities/formation.entity';
import { Etudiant } from 'src/etudiant/entities/etudiant.entity';

@Entity()
export class Achat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'real' })
  prix: string;

  @CreateDateColumn()
  date_achat: Date;

  @ManyToOne((type) => Formation, (formation) => formation.achats)
  formation: Formation;

  @ManyToOne((type) => Etudiant, (etudiant) => etudiant.achats)
  etudiant: Etudiant;
}
