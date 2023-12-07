import { BooksInterface } from '@/interfaces/books.interface';
import { BaseEntity, Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
const cover_image = 'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg';
@Entity()
export class Books extends BaseEntity implements BooksInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('books_index')
  @Column()
  title: string;

  @Column()
  writer: string;

  @Column({ default: cover_image })
  cover_image: string;

  @Column()
  point: number;

  @Column()
  tag: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
