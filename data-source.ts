import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load env file dynamically
const NODE_ENV = process.env.NODE_ENV || 'development';
dotenv.config({ path: `.env.${NODE_ENV}` });

const entitiesPath =
  NODE_ENV === 'production'
    ? path.join(__dirname, 'dist/**/*.entity.js') // For production, use compiled JS files
    : path.join(__dirname, 'src/**/*.entity.ts'); // For dev, use TS files

const migrationsPath =
  NODE_ENV === 'production'
    ? path.join(__dirname, 'dist/migrations/*.{js}') // For production, use compiled JS files
    : path.join(__dirname, 'src/migrations/*.{ts}'); // For dev, use TS files

const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as 'postgres', // e.g., 'postgres' or 'sqlite'
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: NODE_ENV === 'production' ? false : true, // Don't synchronize in production
  entities: [entitiesPath],
  migrations: [migrationsPath],
  logging: NODE_ENV === 'production' ? false : true, // Disable logging in production
  migrationsTableName: 'migrations',
  ssl: NODE_ENV === 'production' ? { rejectUnauthorized: false } : false, // SSL for production
});

export default AppDataSource;
