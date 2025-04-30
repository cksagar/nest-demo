// src/bikes/bikes.controller.ts

import { Controller, Post, Body, Get } from '@nestjs/common';
import { BikesService } from './bikes.service';
import { CreateBikeDto } from './dtos/create-bike.dto';
import { Bike } from './entities/bike.entity';
import { Brand } from './entities/brand.entity';

@Controller('bikes')
export class BikesController {
  constructor(private readonly bikesService: BikesService) {}

  @Post()
  async create(@Body() createBikeDto: CreateBikeDto): Promise<Bike> {
    return this.bikesService.create(createBikeDto);
  }

  @Get()
  async findAll(): Promise<Brand[]> {
    return this.bikesService.getAllBrands();

    // You can add other endpoints here like get, update, delete, etc.
  }
}
