import { Request } from 'express';
import { Users } from '@/entity/users.entity';

export interface DataStoredInToken {
  id: number;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: Users;
}
