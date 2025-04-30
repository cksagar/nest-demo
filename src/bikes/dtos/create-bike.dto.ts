import { IsString, IsNumber, IsOptional, IsArray } from 'class-validator';

export class CreateBikeDto {
  @IsString()
  name: string;

  @IsNumber()
  rating: number;

  @IsString()
  reviews: string; // Example: "83 Reviews"

  @IsString()
  description: string;

  @IsNumber()
  priceLow: number;

  @IsNumber()
  priceHigh: number;

  @IsString()
  priceUnit: string; // Example: "₹"

  @IsOptional()
  @IsArray()
  features?: string[]; // If you want to store additional bike features
}
