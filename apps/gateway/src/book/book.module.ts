import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookResolver } from './book.resolver';
import { RmqModule } from '@app/common';

@Module({
  imports: [RmqModule.register({ name: 'BOOK_SERVICE' })],
  providers: [BookService, BookResolver],
})
export class BookModule {}
