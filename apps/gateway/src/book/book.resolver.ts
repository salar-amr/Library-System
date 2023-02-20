import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Book, RentInput, RetainInput, User, BookQuery } from 'schema/graphql';
import { CurrentUser } from '../decorators/current-user.decorator';
import { AuthGuard } from '../guards/auth.guard';
import { BookService } from './book.service';

@Resolver()
@UseGuards(AuthGuard)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Query()
  Books(@Args('query') query: BookQuery = {}): Promise<Book[]> {
    return this.bookService.ListBooks(query);
  }

  @Mutation()
  RentBook(
    @Args('data') data: RentInput,
    @CurrentUser() user: Partial<User>,
  ): Promise<Book> {
    return this.bookService.RentBookHandler(
      user.id,
      data.id,
      data.availability,
    );
  }

  @Mutation()
  RetainBook(
    @Args('data') data: RetainInput,
    @CurrentUser() user: Omit<User, 'role'>,
  ): Promise<Book> {
    return this.bookService.RetainBookHandler(user.id, data.id);
  }
}
