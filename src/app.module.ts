import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesModule } from './messages/messages.module';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RestaurantController } from './restaurant/restaurant.controller';
import { RestaurantModule } from './restaurant/restaurant.module';
import cookieSession from 'cookie-session';
import { Restaurant } from './restaurant/restaurant.entity';
import { MenuItem } from './restaurant/menu-item.entity';
import { Category } from './restaurant/category.entity';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`, // loads .env file into process.env
    }), // loads .env file into process.env
    TypeOrmModule.forRoot(),
    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => {
    //     return {
    //       type: 'postgres', // changed from sqlite
    //       host: config.get<string>('DB_HOST'),
    //       port: config.get<number>('DB_PORT'),
    //       username: config.get<string>('DB_USERNAME'),
    //       password: config.get<string>('DB_PASSWORD'),
    //       database: config.get<string>('DB_NAME'),
    //       entities: [User, Report, Restaurant, MenuItem, Category],
    //       synchronize: process.env.NODE_ENV === 'development', // true only in dev
    //       migrations: ['dist/migrations/*.js'], // Path to compiled migrations
    //       migrationsRun: process.env.NODE_ENV === 'production', // Run migrations in prod
    //     };
    //   },
    // }),
    MessagesModule,
    UsersModule,
    ReportsModule,
    AuthModule,
    RestaurantModule,
  ],
  controllers: [AppController, RestaurantController],
  providers: [AppService],
})
export class AppModule {
  constructor(private configService: ConfigService) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: [
            this.configService.get('COOKIE_SECRET') || 'default_cookie_key',
          ],
        }),
      )
      .forRoutes('*');
  }
}
