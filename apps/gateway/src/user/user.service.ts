import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';
import { AuthenticatedUser, User } from 'schema/graphql';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_SERVICE') private client: ClientProxy,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async SignInHandler(
    email: string,
    password: string,
  ): Promise<AuthenticatedUser> {
    const payload = { email, password };

    const user = await firstValueFrom(this.client.send('sign-in', payload));

    const token = this.jwtService.sign(
      { id: user.id, role: user.role },
      {
        secret: this.configService.get<string>('jwtSecret'),
        expiresIn: '30 days',
      },
    );

    return { user, token };
  }

  ListUsers(): Observable<User[]> {
    return this.client.send('users', {});
  }
}
