import { Sequelize } from 'sequelize-typescript';
import { CreationAttributes } from 'sequelize';
import { Product } from './product';
import 'dotenv/config';

console.log({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  pass: process.env.DATABASE_PASSWORD,
  db: process.env.DATABASE_NAME
});

export const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  models: [Product],
  logging: false,
  
});



async function seedProducts() {
  await sequelize.sync({ force: false });

  const initialProducts: CreationAttributes<Product>[]  = [
    {
      name: "LipeLift", 
      result: "100 mil reais em 30 dias",
      days: 30,
      category: "Suplementação Feminina",
      image: "/products/Lipefit.webp",
    },
    {
      name: "Dreams Coffe",
      result: "10 milhões de Faturados em 2024",
      days: 7,
      category: "Suplementos e Vitaminas",
      image: "/products/Dreams.coffee.jpg",
    },
    {
      name: "Blessy",
      result: "386 mil reais em 30 dias",
      days: 30,
      category: "Suplementação Feminina",
      image: "/products/Blessy.jpeg",
    },
    {
      name: "Lucence",
      result: "1,4 milhão em 65 dias",
      days: 65,
      category: "Cosméticos",
      image: "/products/Lucence.avif",
    },
    {
      name: "Saviora",
      result: "600 mil reais em 90 dias",
      days: 90,
      category: "Cosméticos",
      image: "/products/Saviora.avif",
    },
    {
      name: "Bigboom",
      result: "5 milhões faturados",
      days: 90,
      category: "Suplementação Feminina",
      image: "/products/Bigboom.avif",
    },
  ];

  await Product.bulkCreate(initialProducts);
  console.log('Produtos inseridos com sucesso!'); 
  await sequelize.close();
}

seedProducts();