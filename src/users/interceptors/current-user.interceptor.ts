// user.interceptor.ts
import {
  Injectable,
  ExecutionContext,
  CallHandler,
  NestInterceptor,
} from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private userService: UsersService) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();

    // Extract userId from the session (it was set in signin method)
    const { userId } = request.session || {};

    if (userId) {
      // Fetch user from database
      const user = await this.userService.findOne(userId);
      // Attach user to the request object
      request.currentUser = user;
    } else {
      console.log('No user found in request');
    }

    return next.handle();
  }
}
