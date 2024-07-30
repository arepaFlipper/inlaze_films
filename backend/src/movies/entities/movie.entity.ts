import { Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Rating} from './rating.entity';
import {Favorite} from './favorite.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int', nullable: true })
  releaseYear: number;

  @OneToMany(()=> Rating, rating => rating.movie)
  ratings: Rating[];

  @OneToMany(()=> Favorite, favorite => favorite.movie)
  favorites: Favorite[];
}
