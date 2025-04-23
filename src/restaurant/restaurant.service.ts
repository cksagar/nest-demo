import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from './restaurant.entity';
import { Repository } from 'typeorm';
import { MenuItem } from './menu-item.entity';
import { Category } from './category.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepo: Repository<Restaurant>,

    @InjectRepository(MenuItem)
    private readonly menuRepo: Repository<MenuItem>,

    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  getAllRestaurants() {
    return this.restaurantRepo.find({
      relations: ['menu'],
    });
  }
  getAllCategories() {
    return this.categoryRepo.find();
  }
  getAllMenuItems() {
    return this.menuRepo.find();
  }
}
