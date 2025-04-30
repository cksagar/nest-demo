import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from './entities/brand.entity';
import { Model } from './entities/model.entity';

@Injectable()
export class BrandSeedService {
  constructor(
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
    @InjectRepository(Model)
    private modelRepository: Repository<Model>,
  ) {}

  // Method to insert brand data
  async seedBrands(): Promise<Brand[]> {
    const brands = [
      { name: 'Honda' },
      { name: 'Yamaha' },
      { name: 'Bajaj' },
      { name: 'Suzuki' },
      { name: 'Hero' },
      { name: 'Kawasaki' },
      { name: 'BMW' },
      { name: 'Royal Enfield' },
      { name: 'TVS' },
      { name: 'KTM' },
    ];

    return await this.brandRepository.save(brands);
  }

  // Method to insert model data
  async seedModels(): Promise<Model[]> {
    const models = [
      { name: 'CBR' },
      { name: 'FZ' },
      { name: 'Pulsar' },
      { name: 'Ninja' },
      { name: 'Duke' },
      { name: 'Apache' },
      { name: 'Bullet' },
      { name: 'Royal Enfield Classic' },
      { name: 'Z900' },
      { name: 'RS 200' },
      { name: 'R15' },
      { name: 'MT-15' },
      { name: 'R3' },
      { name: 'FZ 25' },
      { name: 'KX 250' },
      { name: 'Interceptor 650' },
      { name: 'V-Strom' },
      { name: 'BMW GS' },
      { name: 'Thunderbird' },
      { name: 'KTM RC 390' },
    ];

    return await this.modelRepository.save(models);
  }

  // Combined method to seed both brands and models
  async seedAllData(): Promise<any> {
    const brands = await this.seedBrands();
    const models = await this.seedModels();
    return {
      brands,
      models,
    };
  }
}
