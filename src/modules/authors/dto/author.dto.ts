import { IsNotEmpty, MinLength, IsEmail } from 'class-validator';

export class AuthorDto {

  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;

}