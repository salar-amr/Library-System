import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from '../dto/user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @EventPattern('user-created')
  CreateUser(@Payload() data: CreateUserDto): Promise<User> {
    return this.userService.create(data.id, data.email);
  }
}
