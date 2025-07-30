import { Router } from 'express';
import { login } from '../controllers/auth.controller';
import { validateRequest } from '../middlewares/validation.middleware';
import { loginSchema } from '../validations/auth.validation';

const router = Router();

router.post('/login', validateRequest(loginSchema), login);

export default router;
