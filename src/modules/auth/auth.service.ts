import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { AuthorsService } from '../authors/authors.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly authorService: AuthorsService,
    private readonly jwtService: JwtService,
  ) { }

  async validateAuthor(authorname: string, pass: string) {
    // find if author exist with this email
    const author = await this.authorService.findOneByEmail(authorname);
    if (!author) {
      return null;
    }

    // find if author password match
    const match = await this.comparePassword(pass, author.password);

    if (!match) {
      return null;
    }

    // tslint:disable-next-line: no-string-literal
    const { password, ...result } = author['dataValues'];
    return result;
  }

  public async login(author) {
    const token = await this.generateToken(author);
    return { author, token };
  }

  public async create(author) {
    // hash the password
    const pass = await this.hashPassword(author.password);

    // create the author
    const newAuthor = await this.authorService.create({ ...author, password: pass });

    // tslint:disable-next-line: no-string-literal
    const { password, ...result } = newAuthor['dataValues'];

    // generate token
    const token = await this.generateToken(result);

    // return the author and the token
    return { author: result, token };
  }

  private async generateToken(author) {
    const token = await this.jwtService.signAsync(author);
    return token;
  }

  private async hashPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  private async comparePassword(enteredPassword, dbPassword) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }
}
