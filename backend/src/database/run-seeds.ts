import { seedCategories } from './seeds/category.seed';
import { seedProducts } from './seeds/product.seed';
import { seedUsers } from './seeds/user.seed';
import { sequelize } from './config';

async function runAllSeeds() {
  try {
    console.log('🌱 Iniciando execução dos seeds...');
    
    console.log('🔄 Sincronizando banco de dados...');
    await sequelize.sync({ force: true });
    
    console.log('📂 Executando seed de categorias...');
    await seedCategories(false);
    
    console.log('📦 Executando seed de produtos...');
    await seedProducts(false);
    
    console.log('👤 Executando seed de usuários...');
    await seedUsers(false);
    
    console.log('✅ Todos os seeds foram executados com sucesso!');
    await sequelize.close();
  } catch (error) {
    console.error('❌ Erro ao executar seeds:', error);
    await sequelize.close();
    process.exit(1);
  }
}

runAllSeeds(); 