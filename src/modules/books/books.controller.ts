import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { BooksService } from './books.service';
import { Book as BookEntity } from './book.entity';
import { BookDto } from './dto/book.dto';

@Controller('books')
export class BooksController {
    constructor(private readonly bookService: BooksService) { }

    @Get()
    async findAll() {
        // get all books in the db
        return await this.bookService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<BookEntity> {
        // find the book with this id
        const book = await this.bookService.findOne(id);

        // if the post doesn't exit in the db, throw a 404 error
        if (!book) {
            throw new NotFoundException('This book doesn\'t exist');
        }

        // if book exist, return the book
        return book;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body() book: BookDto, @Request() req): Promise<BookEntity> {
        console.log(req.user)
        // create a new book and return the newly created book
        return await this.bookService.create(book, req.author.id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(@Param('id') id: number, @Body() book: BookDto, @Request() req): Promise<BookEntity> {
        // get the number of row affected and the updated book
        const { numberOfAffectedRows, updatedBook } = await this.bookService.update(id, book, req.author.id);

        // if the number of row affected is zero, it means the book doesn't exist in our db
        if (numberOfAffectedRows === 0) {
            throw new NotFoundException('This book doesn\'t exist');
        }

        // return the updated book
        return updatedBook;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        // delete the book with this id
        const deleted = await this.bookService.delete(id, req.author.id);

        // if the number of row affected is zero, then the book doesn't exist in our db
        if (deleted === 0) {
            throw new NotFoundException('This book doesn\'t exist');
        }

        // return success message
        return 'Successfully deleted';
    }
}