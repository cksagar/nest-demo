import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from '../restaurant.entity';
import { MenuItem } from '../menu-item.entity';
import { restaurantData } from './restaurant-data'; // this will be the cleaned JSON file

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepo: Repository<Restaurant>,
    @InjectRepository(MenuItem)
    private readonly menuRepo: Repository<MenuItem>,
  ) {}

  async dumpRestaurants() {
    for (const data of restaurantData) {
      const { menu, ...rest } = data;
      const restaurant = this.restaurantRepo.create(rest);
      restaurant.menu = menu.map((item) => this.menuRepo.create(item));
      await this.restaurantRepo.save(restaurant);
    }
    console.log('✅ All restaurants inserted into PostgreSQL!');
  }
}
