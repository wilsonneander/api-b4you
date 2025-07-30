import { Sequelize } from 'sequelize-typescript';
import { Product } from '../models/product.model';
import { Category } from '../models/category.model';
import { User } from '../models/user.model';
import 'dotenv/config';

export const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  models: [Product, Category, User],
  logging: false,
  
});





