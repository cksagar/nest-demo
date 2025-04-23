import { Expose } from 'class-transformer';

export class RestaurantDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  cuisine: string[];

  @Expose()
  promoted: boolean;

  @Expose()
  rating: number;

  @Expose()
  deliveryTime: string;

  @Expose()
  image: string;
}
