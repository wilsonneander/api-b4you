import { CreationAttributes } from "sequelize";
import { Product } from "../../models/product.model";
import { sequelize } from "../config";
import { CATEGORY_IDS } from "./category.seed";

export async function seedProducts(closeConnection: boolean = true) {
    // await sequelize.sync({ force: false });
  
    const initialProducts: CreationAttributes<Product>[]  = [
      {
        name: "LipeLift", 
        result: "100 mil reais em 30 dias",
        days: 30,
        categoryId: CATEGORY_IDS.SUPLEMENTACAO_FEMININAS,
        image: "/products/Lipefit.webp",
      },
      {
        name: "Dreams Coffe",
        result: "10 milhões de Faturados em 2024",
        days: 7,
        categoryId: CATEGORY_IDS.SUPLEMENTACAO,
        image: "/products/Dreams.coffee.jpg",
      },
      {
        name: "Blessy",
        result: "386 mil reais em 30 dias",
        days: 30,
        categoryId: CATEGORY_IDS.SUPLEMENTACAO_FEMININAS,
        image: "/products/Blessy.jpeg",
      },
      {
        name: "Lucence",
        result: "1,4 milhão em 65 dias",
        days: 65,
        categoryId: CATEGORY_IDS.COSMETICOS,
        image: "/products/Lucence.avif",
      },
      {
        name: "Bigboom",
        result: "5 milhões faturados",
        days: 90,
        categoryId: CATEGORY_IDS.SUPLEMENTACAO_FEMININAS,
        image: "/products/Bigboom.avif",
      },
    ];
  
    for (const productData of initialProducts) {
      await Product.findOrCreate({
        where: { name: productData.name },
        defaults: productData
      });
    }
    
    console.log('Produtos inseridos/atualizados com sucesso!'); 
    if (closeConnection) {
      await sequelize.close();
    }
  }
  