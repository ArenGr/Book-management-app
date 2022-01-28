import { Injectable, Inject } from '@nestjs/common';

import { Author } from './author.entity';
import { AuthorDto } from './dto/author.dto';
import { AUTHOR_REPOSITORY } from '../../core/constants';

@Injectable()
export class AuthorsService {
  constructor(@Inject(AUTHOR_REPOSITORY) private readonly userRepository: typeof Author) { }

  async create(author: AuthorDto): Promise<Author> {
    return await this.userRepository.create<Author>(author);
  }

  async findOneByEmail(email: string): Promise<Author> {
    return await this.userRepository.findOne<Author>({ where: { email } });
  }

  async findOneById(id: number): Promise<Author> {
    return await this.userRepository.findOne<Author>({ where: { id } });
  }

}
