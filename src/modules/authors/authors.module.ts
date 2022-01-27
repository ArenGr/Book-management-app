import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { authorsProviders } from './authors.providers';

@Module({
  providers: [AuthorsService, ...authorsProviders],
  exports: [AuthorsService],
})
export class AuthorsModule {}
