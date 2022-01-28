import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';

import { AuthorsService } from '../../modules/authors/authors.service';

@Injectable()
export class DoesAuthorExist implements CanActivate {
  constructor(private readonly authorService: AuthorsService) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request) {
    const authorExist = await this.authorService.findOneByEmail(request.body.email);
    if (authorExist) {
      throw new ForbiddenException('This email already exist');
    }
    return true;
  }
}