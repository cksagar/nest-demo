import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from '../restaurant.entity';
import { MenuItem } from '../menu-item.entity';
import { restaurantData } from './restaurant-data';
import { Category } from '../category.entity';
import { categoryData } from './category.data';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepo: Repository<Restaurant>,

    @InjectRepository(MenuItem)
    private readonly menuRepo: Repository<MenuItem>,

    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async seedAll() {
    await this.seedCategories();
    await this.seedRestaurants();
    console.log('🌱 All data seeded successfully!');
  }

  private async seedCategories() {
    const existing = await this.categoryRepo.count();
    if (existing === 0) {
      await this.categoryRepo.save(categoryData);
      console.log('✅ Categories inserted');
    } else {
      console.log('⚠️ Categories already exist, skipping...');
    }
  }

  private async seedRestaurants() {
    const existing = await this.restaurantRepo.count();
    if (existing === 0) {
      for (const data of restaurantData) {
        const { menu, ...rest } = data;
        const restaurant = this.restaurantRepo.create(rest);
        restaurant.menu = menu.map((item) => this.menuRepo.create(item));
        await this.restaurantRepo.save(restaurant);
      }
      console.log('✅ Restaurants inserted');
    } else {
      console.log('⚠️ Restaurants already exist, skipping...');
    }
  }
}
