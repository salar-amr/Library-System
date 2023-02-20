import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { User } from './user.entity';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('sign-in')
  SingIn(@Payload() data: CreateUserDto): Promise<User> {
    return this.userService.findOrCreate(data.email, data.password);
  }

  @MessagePattern('users')
  listUsers(): Promise<User[]> {
    return this.userService.find();
  }
}
