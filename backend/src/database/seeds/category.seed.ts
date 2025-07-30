import { CreationAttributes } from "sequelize";
import { Category } from "../../models/category.model";
import { sequelize } from "../config";

export const CATEGORY_IDS = {
    SUPLEMENTACAO_FEMININAS: 1,
    MOVELEIROS: 2,
    COSMETICOS: 3,
    ELETRONICOS: 4,
    SUPLEMENTACAO: 5,
    CASA_E_DECORACAO: 6,
} as const

export async function seedCategories(closeConnection: boolean = true) {
  
    const initialCategories: CreationAttributes<Category>[] = [
      {
        id: CATEGORY_IDS.SUPLEMENTACAO_FEMININAS,
        name: "Suplementação Feminina",
      },
      {
        id: CATEGORY_IDS.MOVELEIROS,
        name: "Moveleiro",
      },
      {
        id: CATEGORY_IDS.COSMETICOS,
        name: "Cosméticos",
      },  
      {
        id: CATEGORY_IDS.ELETRONICOS,
        name: "Eletrônicos",
      },
      {
        id: CATEGORY_IDS.SUPLEMENTACAO,
        name: "Suplementação",
      },
      {
        id: CATEGORY_IDS.CASA_E_DECORACAO,
        name: "Casa e decoração",
      },
    ];
  
    for (const categoryData of initialCategories) {
      await Category.findOrCreate({
        where: { id: categoryData.id },
        defaults: categoryData
      });
    }
    
    console.log('Categorias inseridas/atualizadas com sucesso!'); 
    if (closeConnection) {
      await sequelize.close();
    }
  }
