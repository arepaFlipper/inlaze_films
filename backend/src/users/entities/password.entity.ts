import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class PasswordResetToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
