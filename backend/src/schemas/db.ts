import { Sequelize } from 'sequelize-typescript';
import { Product } from './product';
import 'dotenv/config';

export const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  models: [Product],
  logging: false,
});
