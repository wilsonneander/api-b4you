import dotenv from 'dotenv';

dotenv.config();

const getEnvVar = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Variável de ambiente ${key} não está definida.`);
  }
  return value;
};


export const JWT_SECRET: string = getEnvVar('JWT_SECRET');
export const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || '1h';

