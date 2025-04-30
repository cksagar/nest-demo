import { Injectable } from '@nestjs/common';
import { CreateBikeDto } from './dtos/create-bike.dto';
import { Bike } from './entities/bike.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from './entities/brand.entity';
import { Model } from './entities/model.entity';

@Injectable()
export class BikesService {
  constructor(
    @InjectRepository(Bike)
    private bikeRepository: Repository<Bike>,
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
    @InjectRepository(Model)
    private modelRepository: Repository<Model>,
  ) {}

  async create(createBikeDto: CreateBikeDto): Promise<Bike> {
    const bike = this.bikeRepository.create(createBikeDto);
    return this.bikeRepository.save(bike);
  }

  async getAllBrands(): Promise<Brand[]> {
    return this.brandRepository.find({ relations: ['models'] });
  }
  // You can add more methods as needed like finding, updating, deleting, etc.
}
