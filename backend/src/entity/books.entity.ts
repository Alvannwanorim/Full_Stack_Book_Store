import { BooksInterface } from '@/interfaces/books.interface';
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Books extends BaseEntity implements BooksInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  writer: string;

  @Column()
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
