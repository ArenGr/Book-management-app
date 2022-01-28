import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';

import { Author } from '../authors/author.entity';

@Table
export class Book extends Model<Book> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    description: string;

    @ForeignKey(() => Author)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    authorId: number;

    @BelongsTo(() => Author)
    author: Author;
}