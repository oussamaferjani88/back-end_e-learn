import { Formation } from "src/formation/entities/formation.entity";
import { Entity , Column , PrimaryGeneratedColumn, ManyToOne, OneToOne, OneToMany } from "typeorm";



@Entity()
export class Categorie {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nomCat : string ; 

    @OneToMany(type => Formation , formation => formation.categorie )
    formations : Formation[];



}
