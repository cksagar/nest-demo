import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CurrentUserMiddleware } from './middlewares/current-user.middleware';
import { AuthService } from '../auth/auth.service';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UsersService],
  providers: [UsersService, AuthService],
  controllers: [UsersController],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
