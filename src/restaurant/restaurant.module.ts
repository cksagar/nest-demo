import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './restaurant.entity';
import { MenuItem } from './menu-item.entity';
import { SeedService } from './tobe-deleted/seed.service';
import { SeedController } from './tobe-deleted/seed.controller';
import { Category } from './category.entity';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, MenuItem, Category])],
  providers: [SeedService, RestaurantService],
  controllers: [SeedController, RestaurantController],
})
export class RestaurantModule {}
