import { join } from 'path';
import { Module, MiddlewareConsumer } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../../../config';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthMiddleware } from './middlewares/auth-middleware';
import { GraphQLError, GraphQLFormattedError } from 'graphql/error';
import {
  EmailAddressResolver,
  DateResolver,
  NonEmptyStringResolver,
} from 'graphql-scalars';
import { adminDirectiveTransformer } from './directives/admin.directive';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      inject: [ConfigService],
      driver: ApolloDriver,
      useFactory: (config: ConfigService) => {
        return {
          playground: config.get<boolean>('gateway.graphQl.playground'),
          debug: config.get<boolean>('gateway.graphQl.debug'),
          typePaths: ['./**/*.graphql'],
          definitions: {
            path: join(process.cwd(), 'schema/graphql.ts'),
          },
          formatError: (error: GraphQLError) => {
            const graphQLFormattedError: GraphQLFormattedError = {
              message: error?.message || 'SOMETHING WENT WRONG',
            };
            return graphQLFormattedError;
          },
          resolvers: {
            Date: DateResolver,
            Email: EmailAddressResolver,
            NonEmptyString: NonEmptyStringResolver,
          },
          transformSchema: (schema) =>
            adminDirectiveTransformer(schema, 'admin'),
        };
      },
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('jwtSecret'),
        };
      },
    }),
    UserModule,
    BookModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('/graphql');
  }
}
