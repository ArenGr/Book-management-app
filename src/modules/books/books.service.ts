import { Injectable, Inject } from '@nestjs/common';

import { Book } from './book.entity';
import { BookDto } from './dto/book.dto';
import { Author } from '../authors/author.entity';
import { BOOK_REPOSITORY } from '../../core/constants';

@Injectable()
export class BooksService {
    constructor( @Inject(BOOK_REPOSITORY) private readonly bookRepository: typeof Book ) { }

    async create(book: BookDto, authorId): Promise<Book> {
        return await this.bookRepository.create<Book>({ ...book, authorId });
    }

    async findAll(): Promise<Book[]> {
        return await this.bookRepository
            .findAll<Book>({
                include: [{
                    model: Author,
                    attributes: { exclude: ['password'] }
                }],
            });
    }

    async findOne(id): Promise<Book> {
        return await this.bookRepository
            .findOne({
                where: { id },
                include: [{
                    model: Author,
                    attributes: { exclude: ['password'] }
                }],
            });
    }

    async delete(id, authorId) {
        return await this.bookRepository.destroy({ where: { id, authorId } });
    }

    async update(id, data, authorId) {
        const [numberOfAffectedRows, [updatedBook]] = await this.bookRepository
            .update({ ...data }, { where: { id, authorId }, returning: true });

        return { numberOfAffectedRows, updatedBook };
    }
}