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
export class Video {

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    Nom_video: string;


    @ManyToOne((type) => Formation, (formation) => formation.videos)
    formation: Formation;

}
