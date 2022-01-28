import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthorsService } from '../authors/authors.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authorService: AuthorsService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWTKEY,
    });
  }

  async validate(payload: any) {
    console.log(payload, "payloadddddd")
    // check if author (user) in the token actually exist
    const author = await this.authorService.findOneById(payload.id);
    if (!author) {
      throw new UnauthorizedException('You are not authorized to perform the operation');
    }
    return payload;
  }
}