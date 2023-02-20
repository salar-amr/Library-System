import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FindManyOptions } from 'typeorm';
import { Book } from './book.entity';
import { BookService } from './book.service';
import { RentBookDto, RetainBookDto } from './dto/book.dto';

@Controller()
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @MessagePattern('rent-book')
  RentBook(@Payload() data: RentBookDto): Promise<Book> {
    return this.bookService.update(data.userId, data.id, data.availability);
  }

  @MessagePattern('retain-book')
  RetainBook(@Payload() data: RetainBookDto): Promise<Book> {
    return this.bookService.update(data.userId, data.id);
  }

  @MessagePattern('list-book')
  ListBooks(@Payload() data: FindManyOptions<Book> = {}): Promise<Book[]> {
    return this.bookService.find(data);
  }
}
