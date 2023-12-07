import { BooksInterface } from '@/interfaces/books.interface';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class BooksDto implements BooksInterface {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  writer: string;

  @IsNumber()
  @Min(10)
  @Max(999)
  point: number;

  @IsString()
  @IsNotEmpty()
  tag: string;
}
