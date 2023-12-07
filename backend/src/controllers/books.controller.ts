import { BooksService } from '@/services/books.service';
import { NextFunction, Request, Response } from 'express';
import Container from 'typedi';

export class BooksController {
  public booksService = Container.get(BooksService);
  public getBooks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const books = await this.booksService.findAll();
      res.status(200).json({ data: books });
    } catch (error) {
      next(error);
    }
  };
}
