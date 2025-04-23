import { Controller, Post } from '@nestjs/common';
import { CategoryService } from './category-seed.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('seed')
  async seed() {
    return this.categoryService.seedCategories();
  }
}
