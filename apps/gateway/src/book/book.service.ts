import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Book, BookQuery } from 'schema/graphql';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class BookService {
  constructor(@Inject('BOOK_SERVICE') private client: ClientProxy) {}

  async RentBookHandler(
    userId: number,
    id: number,
    availability: Date,
  ): Promise<Book> {
    const payload = { userId, id, availability };
    const book = await firstValueFrom(this.client.send('rent-book', payload));
    return book;
  }

  async RetainBookHandler(userId: number, id: number): Promise<Book> {
    const payload = { userId, id };
    const book = await firstValueFrom(this.client.send('retain-book', payload));
    return book;
  }

  async ListBooks(query: BookQuery = {}): Promise<Book[]> {
    const books = await firstValueFrom(this.client.send('list-book', query));
    return books;
  }
}
