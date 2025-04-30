import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Restaurant } from './restaurant.entity';
import { MenuItem } from './menu-item.entity';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string; // Category name, e.g., 'Pizza', 'Burgers', etc.

  @Column({ type: 'varchar', length: 255, nullable: true })
  category: string; // Additional categorization if needed, e.g., 'Main Course', 'Sides'

  @Column({ type: 'text', nullable: true })
  description: string; // Description of the category

  @Column({ type: 'varchar', length: 255, nullable: true })
  imageId: string; // Image for the category

  @Column({ type: 'boolean', default: true })
  inStock: boolean; // Whether items in this category are in stock

  @Column({ type: 'boolean', default: false })
  isVeg: boolean; // If this category is for vegetarian items

  @Column({ type: 'int', nullable: true })
  price: number; // General price range for items in the category, if applicable

  @Column({ type: 'json', nullable: true })
  addons: object; // Add-ons available in this category (e.g., extra cheese, sauces)

  @Column({ type: 'json', nullable: true })
  itemAttribute: object; // Attributes specific to items in this category (e.g., spicy, gluten-free)

  @Column({ type: 'json', nullable: true })
  ratings: object; // Ratings and reviews for the category or its items

  @Column({ type: 'boolean', default: false })
  isBestseller: boolean; // If this category is considered a bestseller

  @Column({ type: 'json', nullable: true })
  offerTags: object; // Offers available for the category

  @Column({ type: 'boolean', default: false })
  isBolt: boolean; // Bolt-related flag for the category

  @Column({ type: 'varchar', length: 255, nullable: true })
  boltImageId: string | null;

  @Column({ type: 'json', nullable: true })
  ribbon: object; // Ribbon-related info (e.g., promotion labels)

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.categories, {
    onDelete: 'CASCADE',
  })
  restaurant: Restaurant;

  @OneToMany(() => MenuItem, (menuItem) => menuItem.category)
  menuItems: MenuItem[];
}
