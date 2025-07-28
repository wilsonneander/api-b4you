import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const [, token] = authHeader.split(' ');

  try {
    jwt.verify(token, process.env.JWT_SECRET as string);
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' });
  }
}
