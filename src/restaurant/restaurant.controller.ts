import { Controller, Get, Param } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
@Controller('restaurant')
export class RestaurantController {
  constructor(private restaurantService: RestaurantService) {}

  @Get()
  getRestaurants() {
    return this.restaurantService.getAllRestaurants();
  }

  @Get('categories')
  getCategories() {
    return this.restaurantService.getAllCategories();
  }

  @Get(':id')
  getRestaurantById(@Param('id') id: string) {
    return this.restaurantService.getRestaurantById(parseInt(id));
  }

  @Get('categories/:id')
  getCategoryById(@Param('id') id: string) {
    return this.restaurantService.getCategoryById(parseInt(id));
  }
}
