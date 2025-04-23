import { Transform } from 'class-transformer';
import {
  IsString,
  IsNumber,
  Max,
  Min,
  IsLongitude,
  IsLatitude,
} from 'class-validator';

export class GetEstimateDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Max(2030)
  @Min(1950)
  year: number;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Max(250000)
  @Min(0)
  mileage: number;

  @Transform(({ value }) => parseFloat(value))
  @IsLongitude()
  lng: number;

  @Transform(({ value }) => parseFloat(value))
  @IsLatitude()
  lat: number;
}
