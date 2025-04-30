import { Controller, Post } from '@nestjs/common';
import { BrandSeedService } from './brandseed.service';

@Controller('brandseed')
export class BrandSeedController {
  constructor(private readonly brandSeedService: BrandSeedService) {}

  @Post('seed')
  async seedData() {
    return await this.brandSeedService.seedAllData();
  }
}
