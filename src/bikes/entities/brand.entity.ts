import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Model } from './model.entity';

@Entity('brands')
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Model, (model) => model.brand)
  models: Model[];
}
