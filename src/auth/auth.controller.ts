import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateUserInput } from 'src/users/dto/input/create-user.input';

import { User } from '../users/models/user';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req: Request): { access_token: string } {
    return this.authService.login((req as any).user as User);
  }

  @Post('register')
  public async register(@Body() createUserDto: CreateUserInput) {
    return this.authService.register(createUserDto);
  }
}
