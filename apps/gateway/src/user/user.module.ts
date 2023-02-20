import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { RmqModule } from '@app/common';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [RmqModule.register({ name: 'USER_SERVICE' })],
  providers: [UserService, UserResolver, JwtService],
  exports: [JwtService],
})
export class UserModule {}
