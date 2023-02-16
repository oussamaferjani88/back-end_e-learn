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

  @Column({ default: 'new video' })
  Nom_video: string;

  @Column()
  fileName: string;

  @Column({ nullable: true })
  description: string;

    @ManyToOne((type) => Formation, (formation) => formation.videos)
    formation: Formation;




}


