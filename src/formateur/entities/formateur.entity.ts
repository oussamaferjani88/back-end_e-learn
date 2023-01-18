import { Entity , Column , PrimaryGeneratedColumn, ManyToOne, OneToOne, OneToMany } from "typeorm";
import { Formation } from "src/formation/entities/formation.entity";

@Entity()
export class Formateur {

    @PrimaryGeneratedColumn()
    id: number;

    @Column() 
    Nom_Complet : string;

    @Column()
    bio : string ;

    @OneToMany( type => Formation , formation => formation.formateur)
    formations : Formation[];


}
