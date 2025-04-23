import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../category.entity';
import { Repository } from 'typeorm';
import { categoryData } from './category.data';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async seedCategories(): Promise<Category[]> {
    const savedCategories = await this.categoryRepository.save(categoryData);
    return savedCategories;
  }
}
