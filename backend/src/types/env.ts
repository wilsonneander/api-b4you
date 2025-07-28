import dotenv from 'dotenv';

dotenv.config();

export const JWT_SECRET: string = process.env.JWT_SECRET || '';
export const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || '1h';
export const USER_EMAIL: string = process.env.USER_EMAIL || '';
export const USER_PASSWORD: string = process.env.USER_PASSWORD || '';



