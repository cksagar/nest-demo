import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Bike {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('float')
  rating: number;

  @Column()
  reviews: string;

  @Column()
  description: string;

  @Column()
  priceLow: number;

  @Column()
  priceHigh: number;

  @Column()
  priceUnit: string;

  @Column('simple-array', { nullable: true })
  features: string[];
}
