import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './restaurant.entity';
import { MenuItem } from './menu-item.entity';
import { SeedService } from './tobe-deleted/seed.service';
import { SeedController } from './tobe-deleted/seed.controller';
import { Category } from './category.entity';
import { CategoryService } from './tobe-deleted/category-seed.service';
import { CategoryController } from './tobe-deleted/category-seed.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, MenuItem, Category])],
  providers: [SeedService, CategoryService],
  controllers: [SeedController, CategoryController],
})
export class RestaurantModule {}
