import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Rating } from 'src/movies/entities/rating.entity';
import { Favorite } from 'src/favorites/entities/favorite.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => Rating, (rating: Rating) => rating.user)
  ratings: Rating[];

  @OneToMany(() => Favorite, (favorite: Favorite): User => favorite.user)
  favorites: Favorite[];

  @Column()
  password: string;

  @Column({ default: false })
  isVerified: boolean;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
