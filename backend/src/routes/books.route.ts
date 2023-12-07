import { BooksController } from '@/controllers/books.controller';
import { BooksDto } from '@/dtos/books.dto';
import { Routes } from '@/interfaces/routes.interface';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
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
    this.router.post(`${this.path}`, ValidationMiddleware(BooksDto), this.booksController.createBooks);
    this.router.get(`${this.path}/:id(\\d+)`, this.booksController.getBookById);
    this.router.delete(`${this.path}/:id(\\d+)`, this.booksController.deleteBook);
    // this.router.put(`${this.path}/:id(\\d+)`, ValidationMiddleware(UpdateUserDto), this.user.updateUser);
  }
}
