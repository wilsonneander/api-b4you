import * as yup from 'yup';

// Schema para login
export const loginSchema = yup.object({
  body: yup.object({
    email: yup
      .string()
      .required('Email é obrigatório')
      .email('Email deve ser um email válido'),
    password: yup
      .string()
      .required('Senha é obrigatória')
      .min(6, 'Senha deve ter pelo menos 6 caracteres'),
  }),
}); 