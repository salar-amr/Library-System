import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { User, AuthenticatedUser } from 'schema/graphql';
import { UserInput } from 'schema/graphql';
import { AdminGuard } from '../guards/admin.guard';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @Query()
  @UseGuards(AdminGuard)
  Users(): Observable<User[]> {
    return this.userService.ListUsers();
  }

  @Mutation()
  SignIn(@Args('data') data: UserInput): Promise<AuthenticatedUser> {
    return this.userService.SignInHandler(data.email, data.password);
  }
}
