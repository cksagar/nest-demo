import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import cookieSession from 'cookie-session';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MessagesModule } from './messages/messages.module';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { BikesModule } from './bikes/bikes.module';
import { RestaurantModule } from './restaurant/restaurant.module';

import { Restaurant } from './restaurant/restaurant.entity';
import { MenuItem } from './restaurant/menu-item.entity';
import { Category } from './restaurant/category.entity';
import { Bike } from './bikes/entities/bike.entity';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
import { Brand } from './bikes/entities/brand.entity';
import { Model } from './bikes/entities/model.entity';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`, // loads .env file into process.env
    }), // loads .env file into process.env
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          host: config.get<string>('DB_HOST'),
          port: config.get<number>('DB_PORT'),
          username: config.get<string>('DB_USERNAME'),
          password: config.get<string>('DB_PASSWORD'),
          database: config.get<string>('DB_NAME'),
          entities: [
            User,
            Report,
            Restaurant,
            MenuItem,
            Category,
            Bike,
            Brand,
            Model,
          ],
          synchronize: process.env.NODE_ENV === 'development',
          migrations: ['dist/migrations/*.js'],
          migrationsRun: process.env.NODE_ENV === 'production',
        };
      },
    }),
    MessagesModule,
    UsersModule,
    ReportsModule,
    AuthModule,
    RestaurantModule,
    BikesModule,
  ],
  controllers: [AppController],
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
