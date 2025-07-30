import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

export const validateRequest = (schema: yup.ObjectSchema<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return res.status(400).json({
          message: 'Dados inválidos',
          errors: error.errors,
        });
      }
      return res.status(500).json({
        message: 'Erro interno do servidor',
      });
    }
  };
}; 