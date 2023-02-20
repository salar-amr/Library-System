import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { BookService } from './book.service';
import { Book } from './book.entity';

@Processor('book')
export class BookProcessor {
  constructor(private readonly bookService: BookService) {}

  @Process()
  async handleBookReturn(job: Job<Pick<Book, 'id'>>): Promise<void> {
    await this.bookService.makeAvailable(job.data.id);
  }
}
