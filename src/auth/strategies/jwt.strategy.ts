import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { User } from '../../users/models/user';
import { UsersService } from '../../users/users.service';
import * as dotenv from 'dotenv';
import { jwtSecret } from '../constants';
dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  validate(validationPayload: { email: string; sub: string }): User | null {
    return this.usersService.getUserByEmail(validationPayload.email);
  }
}
