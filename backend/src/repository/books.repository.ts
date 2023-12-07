import { DatabaseConnection } from '@/database';
import { BooksDto } from '@/dtos/books.dto';
import { Books } from '@/entity/books.entity';
import { Service } from 'typedi';

@Service()
export class BooksRepository {
  private repository = DatabaseConnection.getRepository(Books);

  async findAll(): Promise<Books[]> {
    return await this.repository.find();
  }

  async findOne(id: number): Promise<Books | undefined> {
    return await this.repository.findOne({ where: { id } });
  }

  async create(book: BooksDto): Promise<Books> {
    return await this.repository.create(book).save();
  }

  async findByTitle(title: string) {
    return await this.repository.findOne({ where: { title } });
  }
  async update(id: number, book: Books): Promise<Books | undefined> {
    // Use update method directly, no need to find and update separately
    await this.repository.update(id, book);
    return await this.repository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
