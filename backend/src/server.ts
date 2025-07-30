import dotenv from 'dotenv';
import path from 'path';
import { sequelize } from './database/config';
import app from './app';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

sequelize.sync().then(() => {
  console.log('Banco de dados sincronizado');
  app.listen(3001, () => console.log('Servidor rodando na porta 3001'));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

