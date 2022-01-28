import { IsNotEmpty, MinLength } from 'class-validator';

export class BookDto {
    @IsNotEmpty()
    @MinLength(4)
    readonly title: string;

    @IsNotEmpty()
    readonly description: string;
}