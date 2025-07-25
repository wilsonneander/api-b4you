import { Router } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
  }

  if (email === 'admin@b4you.dev' && password === '123456') {
    try {
      const token = jwt.sign({ email }, process.env.JWT_SECRET as string, {
        expiresIn: process.env.JWT_EXPIRES_IN || '1h'
      });

      return res.json({ token });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao gerar token.' });
    }
  }

  return res.status(401).json({ error: 'Credenciais inválidas' });
});

export default router;
