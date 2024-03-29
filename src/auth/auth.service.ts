import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserInput } from 'src/users/dto/input/create-user.input';

import { User } from '../utils/graphql/models/user.model';
import { UsersService } from '../users/users.service';
import { jwtSecret } from './constants';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validate(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.getUserByEmail(email);
    if (!user) return;

    return (await bcrypt.compare(password, user.password)) ? user : null;
  }

  login(user: User): { access_token: string } {
    const payload = {
      email: user.email,
      sub: user.userId,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(details: CreateUserInput) {
    try {
      if (await this.usersService.getUserByEmail(details.email))
        throw new HttpException(
          `User already registered`,
          HttpStatus.BAD_REQUEST,
        );

      return this.login(await this.usersService.createUser(details));
    } catch (err) {
      throw new HttpException(`${err.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async verify(token: string): Promise<User> {
    const decoded = this.jwtService.verify(token, {
      secret: jwtSecret,
    });

    const user = await this.usersService.getUserByEmail(decoded.email);

    if (!user) {
      throw new Error('Unable to get the user from decoded token.');
    }

    return user;
  }
}
