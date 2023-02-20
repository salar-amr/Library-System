import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { Book } from './book.entity';
import configuration from '../../../config';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { BookProcessor } from './book.processor';

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
          host: config.get<string>('book.database.host'),
          port: config.get<number>('book.database.port'),
          username: config.get<string>('book.database.username'),
          password: config.get<string>('book.database.password'),
          database: config.get<string>('book.database.name'),
          entities: [Book, User],
          synchronize: false,
        };
      },
    }),
    TypeOrmModule.forFeature([Book]),
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          redis: {
            host: config.get<string>('book.redis.host'),
            port: config.get<number>('book.redis.port'),
          },
        };
      },
    }),
    BullModule.registerQueue({
      name: 'book',
    }),
    UserModule,
  ],
  controllers: [BookController],
  providers: [BookService, BookProcessor],
})
export class BookModule {}
