import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN, USER_PASSWORD, USER_EMAIL } from '../types/env';

export function login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
    }
  
    if (email === USER_EMAIL && password === USER_PASSWORD) {
      try {
        const token = jwt.sign(
          { email },
          JWT_SECRET as string,
          { expiresIn: JWT_EXPIRES_IN as string }
        );
        return res.json({ token });
      } catch (error) {
        return res.status(500).json({ error: 'Erro ao gerar token.' });
      }
    }
  
    return res.status(401).json({ error: 'Credenciais inválidas' });
}