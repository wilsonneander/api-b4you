import { CreationAttributes } from "sequelize";
import { Product } from "../../models/product.model";
import { sequelize } from "../config";
import { CATEGORY_IDS } from "./category.seed";

export async function seedProducts(closeConnection: boolean = true) {
  
    const initialProducts: CreationAttributes<Product>[]  = [
      {
        name: "LipeLift", 
        result: "100 mil reais em 30 dias",
        days: 30,
        categoryId: CATEGORY_IDS.SUPLEMENTACAO_FEMININAS,
        image: "https://framerusercontent.com/images/Zbp1UP7yzNqMe1huiY8AtuROMY.png",
      },
      {
        name: "Dreams Coffe",
        result: "10 milhões de Faturados em 2024",
        days: 7,
        categoryId: CATEGORY_IDS.SUPLEMENTACAO,
        image: "https://m.media-amazon.com/images/I/71HcPxesSAL._AC_SX425_.jpg",
      },
      {
        name: "Blessy",
        result: "386 mil reais em 30 dias",
        days: 30,
        categoryId: CATEGORY_IDS.SUPLEMENTACAO_FEMININAS,
        image: "https://framerusercontent.com/images/twOG22AZuVj5yT6hSjiIUsUcxSc.png?scale-down-to=1024",
      },
      {
        name: "Lucence",
        result: "1,4 milhão em 65 dias",
        days: 65,
        categoryId: CATEGORY_IDS.COSMETICOS,
        image: "https://framerusercontent.com/images/h3CiXdNgOpVbL905D5pLJzA4u8.jpg?scale-down-to=1024",
      },
      {
        name: "Bigboom",
        result: "5 milhões faturados",
        days: 90,
        categoryId: CATEGORY_IDS.SUPLEMENTACAO_FEMININAS,
        image: "https://framerusercontent.com/images/uTRb2UCSURJnqFfE4BRcUqqMfk.png",
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
  