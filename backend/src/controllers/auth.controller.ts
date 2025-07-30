import { Request, Response } from "express";
import jwt from 'jsonwebtoken';

const JWT_SECRET: string = process.env.JWT_SECRET || '';
const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || '1h';
const USER_EMAIL: string = process.env.USER_EMAIL || '';
const USER_PASSWORD: string = process.env.USER_PASSWORD || '';

export function login(req: Request, res: Response) {
    try {
        const { email, password } = req.body;
        if (email === USER_EMAIL && password === USER_PASSWORD) {
            try {
                const token = jwt.sign(
                    { email },
                    JWT_SECRET as string,
                    { expiresIn: JWT_EXPIRES_IN as string }
                );
                
                return res.status(200).json({ 
                    success: true,
                    message: 'Login realizado com sucesso',
                    token,
                    expiresIn: JWT_EXPIRES_IN
                });
            } catch (error) {
                console.error('Erro ao gerar token:', error);
                return res.status(500).json({ 
                    success: false,
                    message: 'Erro interno do servidor ao gerar token',
                    error: process.env.NODE_ENV === 'development' ? error : undefined
                });
            }
        }

        return res.status(401).json({ 
            success: false,
            message: 'Credenciais inválidas' 
        });
    } catch (error) {
        console.error('Erro no login:', error);
        return res.status(500).json({ 
            success: false,
            message: 'Erro interno do servidor',
            error: process.env.NODE_ENV === 'development' ? error : undefined
        });
    }
}