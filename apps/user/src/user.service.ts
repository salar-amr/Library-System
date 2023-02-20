import { scrypt as _scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ClientProxy, RpcException } from '@nestjs/microservices';

const scrypt = promisify(_scrypt);

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    @Inject('BOOK_SERVICE') private client: ClientProxy,
  ) {}

  async findOrCreate(email: string, password: string): Promise<User> {
    let user = await this.repo.findOne({ where: { email } });

    if (!user) {
      const salt = randomBytes(8).toString('hex');
      const hash = (await scrypt(password, salt, 32)) as Buffer;
      const hashedPassword = `${salt}.${hash.toString('hex')}`;

      const newUser = this.repo.create({ email, password: hashedPassword });
      user = await this.repo.save(newUser);
      this.client.emit('user-created', { id: user.id, email: user.email });
    } else {
      const [salt, storedHash] = user.password.split('.');
      const hash = (await scrypt(password, salt, 32)) as Buffer;

      const isPasswordCorrect = hash.toString('hex') === storedHash;

      if (!isPasswordCorrect) throw new RpcException('Invalid Credentials');
    }

    return user;
  }

  async find(): Promise<User[]> {
    return this.repo.find();
  }
}
