import { Achat } from 'src/achat/entities/achat.entity';
import { Entity , Column , PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class Etudiant {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nom_complet:string;

    @Column()
    email : string;

    @Column()
    password : string ;


    // @OneToMany(type => Achat,achat => achat.etudiant)
    // achats : Achat[];


}
