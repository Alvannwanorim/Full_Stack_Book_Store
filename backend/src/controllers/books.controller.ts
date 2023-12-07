import { BooksDto } from '@/dtos/books.dto';
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

  public createBooks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const bookDto: BooksDto = req.body;
      const books = await this.booksService.create(bookDto);
      res.status(201).json({ data: books });
    } catch (error) {
      next(error);
    }
  };
  public getBookById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const bookId = Number(req.params.id);
      const book = await this.booksService.findOne(bookId);
      res.status(200).json({ data: book });
    } catch (error) {
      next(error);
    }
  };
  public deleteBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const bookId = Number(req.params.id);
      const book = await this.booksService.delete(bookId);
      res.status(200).json({ data: book });
    } catch (error) {
      next(error);
    }
  };
}
