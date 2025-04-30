import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MenuItem } from './menu-item.entity';
import { Category } from './category.entity';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text', { array: true })
  cuisine: string[];

  @Column()
  promoted: boolean;

  @Column('float')
  rating: number;

  @Column()
  deliveryTime: string;

  @Column()
  image: string;

  @OneToMany(() => MenuItem, (menu) => menu.restaurant, { cascade: true })
  menu: MenuItem[];

  @OneToMany(() => Category, (category) => category.restaurant, {
    cascade: true,
  })
  categories: Category[];
}
