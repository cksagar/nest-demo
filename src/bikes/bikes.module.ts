import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BikesController } from './bikes.controller';
import { BikesService } from './bikes.service';
import { Bike } from './entities/bike.entity';
import { BrandSeedController } from './brand.controller';
import { BrandSeedService } from './brandseed.service';
import { Brand } from './entities/brand.entity';
import { Model } from './entities/model.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bike, Brand, Model])],
  controllers: [BikesController, BrandSeedController],
  providers: [BikesService, BrandSeedService],
})
export class BikesModule {}
