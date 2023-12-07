import { BooksDto } from '@/dtos/books.dto';
import { Books } from '@/entity/books.entity';
import { HttpException } from '@/exceptions/httpException';
import { BooksRepository } from '@/repository/books.repository';
import Container, { Service } from 'typedi';

@Service()
export class BooksService {
  private readonly booksRepository = Container.get(BooksRepository);

  async findAll(): Promise<Books[]> {
    return await this.booksRepository.findAll();
  }

  async findOne(id: number): Promise<Books | undefined> {
    const book = await this.booksRepository.findOne(id);
    if (!book) throw new HttpException(404, 'Book not found');

    return book;
  }

  async create(book: BooksDto): Promise<Books> {
    const existingBook = await this.booksRepository.findByTitle(book.title);
    if (existingBook) throw new HttpException(403, 'Book title already exists');
    return await this.booksRepository.create(book);
  }

  async update(id: number, book: Books): Promise<Books> {
    return await this.booksRepository.update(id, book);
  }

  async delete(id: number): Promise<Books> {
    const book = await this.booksRepository.findOne(id);
    if (!book) throw new HttpException(404, 'Book not found');
    await this.booksRepository.delete(id);
    return book;
  }
}
