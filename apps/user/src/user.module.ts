import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import configuration from '../../../config';
import { RmqModule } from '@app/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          host: config.get<string>('user.database.host'),
          port: config.get<number>('user.database.port'),
          username: config.get<string>('user.database.username'),
          password: config.get<string>('user.database.password'),
          database: config.get<string>('user.database.name'),
          entities: [User],
          synchronize: false,
        };
      },
    }),
    TypeOrmModule.forFeature([User]),
    RmqModule.register({ name: 'BOOK_SERVICE' }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
