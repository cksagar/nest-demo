import {
  IsString,
  IsNumber,
  Max,
  Min,
  IsLongitude,
  IsLatitude,
} from 'class-validator';

export class CreateReportDto {
  @IsString()
  make: string;
  @IsString()
  model: string;
  @IsNumber()
  @Max(2030)
  @Min(1950)
  year: number;

  @IsNumber()
  @Max(250000)
  @Min(0)
  mileage: number;
  @IsNumber()
  @Max(2500000)
  @Min(0)
  price: number;
  @IsLongitude()
  lng: number;

  @IsLatitude()
  lat: number;
}
