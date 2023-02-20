import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user/user.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: true })
  available: boolean;

  @Column({ default: null })
  availability: Date | null;

  @ManyToOne(() => User, (user) => user.books)
  user: User;
}
