import { Books } from '@/entity/books.entity';
import { BooksRepository } from '@/repository/books.repository';
import Container, { Service } from 'typedi';

@Service()
export class BooksService {
  private readonly booksRepository = Container.get(BooksRepository);

  async findAll(): Promise<Books[]> {
    return await this.booksRepository.findAll();
  }

  async findOne(id: number): Promise<Books | undefined> {
    return await this.booksRepository.findOne(id);
  }

  async create(book: Books): Promise<Books> {
    return await this.booksRepository.create(book);
  }

  async update(id: number, book: Books): Promise<Books> {
    return await this.booksRepository.update(id, book);
  }

  async delete(id: number): Promise<void> {
    await this.booksRepository.delete(id);
  }
}
