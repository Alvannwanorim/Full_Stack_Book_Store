import { hash } from 'bcrypt';
import Container, { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import { UsersRepository } from '@/repository/user.repository';
import { Users } from '@/entity/users.entity';
import { CreateUserDto, UpdateUserDto } from '@/dtos/users.dto';

@Service()
export class UserService {
  private readonly usersRepository = Container.get(UsersRepository);

  public async findAllUser(): Promise<Users[]> {
    return await this.usersRepository.findAll();
  }

  public async findUserById(userId: number): Promise<Users> {
    const findUser: Users = await this.usersRepository.findOne(userId);
    if (!findUser) throw new HttpException(404, "User doesn't exist");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<Users> {
    const findUser: Users = await this.usersRepository.findByEmail(userData.email);
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    userData.password = hashedPassword;

    return await this.usersRepository.create(userData);
  }

  public async updateUser(userId: number, userData: UpdateUserDto): Promise<Users> {
    const findUser: Users = await this.usersRepository.findOne(userId);
    if (!findUser) throw new HttpException(404, "User doesn't exist");

    const hashedPassword = await hash(userData.password, 10);
    findUser.password = hashedPassword;

    return await this.usersRepository.update(userId, findUser);
  }

  public async deleteUser(userId: number): Promise<Users> {
    const findUser: Users = await this.usersRepository.findOne(userId);
    if (!findUser) throw new HttpException(404, "User doesn't exist");
    await this.usersRepository.delete(userId);
    return findUser;
  }
}
