import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from '../restaurant.entity';
import { MenuItem } from '../menu-item.entity';
import { Category } from '../category.entity';
import { restaurantData } from './restaurant-data';
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
    await this.clearData(); // Optionally clear data before seeding
    await this.seedCategories();
    await this.seedRestaurants();
    console.log('🌱 All data seeded successfully!');
  }

  async clearData() {
    console.log('🧹 Clearing existing data...');
    await this.menuRepo.query(
      `TRUNCATE TABLE "menu_item", "restaurant", "category" RESTART IDENTITY CASCADE`,
    );
    console.log('✅ Data cleared successfully!');
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
        const { menu, ...restaurantRest } = data;
        const restaurant = this.restaurantRepo.create(restaurantRest);

        // Loop over menu items and create them
        restaurant.menu = [];
        for (const item of menu) {
          const category = await this.categoryRepo.findOne({
            where: { name: item.category },
          });

          // Check if category exists before creating the menu item
          if (!category) {
            console.log(
              `⚠️ Category "${item.category}" not found. Skipping menu item "${item.name}".`,
            );
            continue;
          }

          const menuItem = this.menuRepo.create({
            ...item,
            category, // Set the category
            restaurant, // Link to the restaurant
          });
          restaurant.menu.push(menuItem);
        }

        // Save the restaurant and its related menu items
        try {
          await this.restaurantRepo.save(restaurant);
          console.log(`✅ Restaurant "${restaurant.name}" inserted`);
        } catch (error) {
          console.error(
            `❌ Failed to insert restaurant "${restaurant.name}":`,
            error,
          );
        }
      }
    } else {
      console.log('⚠️ Restaurants already exist, skipping...');
    }
  }
}
