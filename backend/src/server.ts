import dotenv from 'dotenv';
import path from 'path';
import app from './app';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

console.log('JWT_SECRET:', process.env.JWT_SECRET);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

