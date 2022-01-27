import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(authorname: string, password: string): Promise<any> {
    console.log(authorname, "ccccccc");
    const author = await this.authService.validateAuthor(authorname, password);
    if (!author) {
      throw new UnauthorizedException('Invalid author credentials');
    }
    return author;
  }
}