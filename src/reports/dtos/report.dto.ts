import { Expose, Transform } from 'class-transformer';

export class ReportDto {
  @Expose()
  id: number;
  @Expose()
  make: string;
  @Expose()
  model: string;
  @Expose()
  year: number;
  @Expose()
  mileage: number;
  @Expose()
  price: number;
  @Expose()
  lng: number;
  @Expose()
  lat: number;

  @Expose()
  approved: boolean;

  @Transform(({ obj }) => {
    return obj.user ? obj.user.id : null;
  })
  @Expose()
  userId: number;
}
