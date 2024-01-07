import { Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

export class RequestService {
  constructor(@Inject(REQUEST) private request: any) {}

  get userId(): any {
    return this.request.req.user.userId;
  }

  get organisationId(): any {
    return this.request.req.user.organisationId;
  }

    get role(): any {
        return this.request.req.user.role;
    }
}
