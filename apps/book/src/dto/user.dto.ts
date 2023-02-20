import { IsEmail, IsInt } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsInt()
  id: number;
}
