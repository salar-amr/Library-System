import { Injectable } from '@nestjs/common';
import { FindManyOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { Book } from './book.entity';
import { RpcException } from '@nestjs/microservices';
import { UserService } from './user/user.service';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private repo: Repository<Book>,
    private readonly userService: UserService,
    @InjectQueue('book') private bookQueue: Queue,
  ) {}

  async update(userId: number, id: number, availability?: Date): Promise<Book> {
    const book = await this.repo.findOne({
      where: { id },
      relations: {
        user: true,
      },
    });

    if (!book) {
      throw new RpcException('book not found');
    }
    if (!book.available && availability) {
      throw new RpcException('book not available');
    }
    if ((!book.user || book.user?.id !== userId) && !availability) {
      throw new RpcException('access denied');
    }

    if (availability) {
      const user = await this.userService.findOne(userId);

      book.available = false;
      book.availability = availability;
      book.user = user;

      const delay = new Date(availability).getTime() - Date.now();

      await this.bookQueue.add(
        {
          id: book.id,
        },
        { delay },
      );

      return this.repo.save(book);
    } else {
      book.available = true;
      book.availability = null;
      book.user = null;
      return this.repo.save(book);
    }
  }

  find(bookFeature: FindManyOptions<Book>): Promise<Book[]> {
    return this.repo.find({
      ...bookFeature,
      relations: {
        user: true,
      },
    });
  }

  async makeAvailable(id: number): Promise<Book> {
    const book = await this.repo.findOne({
      where: { id },
    });

    book.available = true;
    book.availability = null;
    book.user = null;

    return this.repo.save(book);
  }
}
