import { BooksController } from '@/controllers/books.controller';
import { Routes } from '@/interfaces/routes.interface';
import { Router } from 'express';

export class BooksRoute implements Routes {
  public path = '/books';
  public router = Router();
  public booksController = new BooksController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.booksController.getBooks);
    // this.router.get(`${this.path}/:id(\\d+)`, this.user.getUserById);
    // this.router.post(`${this.path}`, ValidationMiddleware(CreateUserDto), this.user.createUser);
    // this.router.put(`${this.path}/:id(\\d+)`, ValidationMiddleware(UpdateUserDto), this.user.updateUser);
    // this.router.delete(`${this.path}/:id(\\d+)`, this.user.deleteUser);
  }
}
