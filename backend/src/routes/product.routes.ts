import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.json([
    { id: 1, name: 'Produto A', price: 10 },
    { id: 2, name: 'Produto B', price: 20 },
  ]);
});

export default router;
