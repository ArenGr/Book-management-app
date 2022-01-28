import { Controller, Body, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthorDto } from '../authors/dto/author.dto';
import { DoesAuthorExist } from '../../core/guards/doesAuthorExist.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() author) {
    return await this.authService.login(author);
  }

  @UseGuards(DoesAuthorExist)
  @Post('signup')
  async signUp(@Body() author: AuthorDto) {
    return await this.authService.create(author);
  }
}
