import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import Container, { Service } from 'typedi';
import { SECRET_KEY } from '@config';
import { HttpException } from '@exceptions/httpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { Users } from '@/entity/users.entity';
import { UsersRepository } from '@/repository/user.repository';
import { CreateUserDto, LoginUser } from '@/dtos/users.dto';

const createToken = (user: Users): TokenData => {
  const dataStoredInToken: DataStoredInToken = { id: user.id };
  const expiresIn: number = 60 * 60;

  return { expiresIn, token: sign(dataStoredInToken, SECRET_KEY, { expiresIn }) };
};

const createCookie = (tokenData: TokenData): string => {
  return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
};

@Service()
export class AuthService {
  private readonly usersRepository = Container.get(UsersRepository);

  public async signup(userData: CreateUserDto): Promise<Users> {
    const findUser: Users = await this.usersRepository.findByEmail(userData.email);
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    userData.password = hashedPassword;

    return await this.usersRepository.create(userData);
  }

  public async login(userData: LoginUser): Promise<{ cookie: string; findUser: Users }> {
    const findUser: Users = await this.usersRepository.findByEmail(userData.email);
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(403, "You're password not matching");

    const tokenData = createToken(findUser);
    const cookie = createCookie(tokenData);

    return { cookie, findUser };
  }

  public async logout(userData: Users): Promise<Users> {
    const findUser: Users = await this.usersRepository.findByEmail(userData.email);
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }
}
