import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { UsersService } from '../users.service';
import { User } from '../user.entity';

declare module 'express' {
  interface Request {
    currentUser?: User | null; // Add currentUser property to Request
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    // Check if the user is authenticated
    const { userId } = req.session || {};
    if (userId) {
      // If authenticated, find the user in the database
      const user = await this.usersService.findOne(userId);

      req.currentUser = user;
    } else {
      // If not authenticated, set currentUser to null
      req.currentUser = null;
    }
    next();
  }
}
