import { DatabaseConnection } from '@/database';
import { CreateUserDto } from '@/dtos/users.dto';
import { Users } from '@/entity/users.entity';

import { Service } from 'typedi';

@Service()
export class UsersRepository {
  private repository = DatabaseConnection.getRepository(Users);

  async findAll(): Promise<Users[]> {
    return await this.repository.find();
  }

  async findOne(id: number): Promise<Users | undefined> {
    return await this.repository.findOne({ where: { id } });
  }

  async create(user: CreateUserDto): Promise<Users> {
    return await this.repository.create(user).save();
  }

  async findByEmail(email: string) {
    return await this.repository.findOne({ where: { email } });
  }
  async update(id: number, user: Users): Promise<Users | undefined> {
    // Use update method directly, no need to find and update separately
    await this.repository.update(id, user);
    return await this.repository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
