import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import productRoutes from './routes/product.routes';
import authMiddleware from './middlewares/auth.middleware';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/products', authMiddleware, productRoutes);

app.get('/', (_req, res) => res.send('API B4You rodando 🚀'));

export default app;
