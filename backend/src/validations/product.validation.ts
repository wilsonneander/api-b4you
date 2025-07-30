import * as yup from 'yup';

// Schema para criação de produto
export const createProductSchema = yup.object({
  body: yup.object({
    name: yup
      .string()
      .required('Nome é obrigatório')
      .min(2, 'Nome deve ter pelo menos 2 caracteres')
      .max(100, 'Nome deve ter no máximo 100 caracteres'),
    result: yup
      .string()
      .required('Resultado é obrigatório')
      .min(2, 'Resultado deve ter pelo menos 2 caracteres')
      .max(500, 'Resultado deve ter no máximo 500 caracteres'),
    days: yup
      .number()
      .required('Dias é obrigatório')
      .positive('Dias deve ser um número positivo')
      .integer('Dias deve ser um número inteiro')
      .min(1, 'Dias deve ser pelo menos 1')
      .max(365, 'Dias deve ser no máximo 365'),
    categoryId: yup
      .number()
      .required('ID da categoria é obrigatório')
      .positive('ID da categoria deve ser um número positivo')
      .integer('ID da categoria deve ser um número inteiro'),
    image: yup
      .string()
      .required('Imagem é obrigatória')
      .url('Imagem deve ser uma URL válida'),
  }),
});

// Schema para atualização de produto
export const updateProductSchema = yup.object({
  params: yup.object({
    id: yup
      .string()
      .required('ID é obrigatório')
      .matches(/^\d+$/, 'ID deve ser um número válido'),
  }),
  body: yup.object({
    name: yup
      .string()
      .optional()
      .min(2, 'Nome deve ter pelo menos 2 caracteres')
      .max(100, 'Nome deve ter no máximo 100 caracteres'),
    result: yup
      .string()
      .optional()
      .min(2, 'Resultado deve ter pelo menos 2 caracteres')
      .max(500, 'Resultado deve ter no máximo 500 caracteres'),
    days: yup
      .number()
      .optional()
      .positive('Dias deve ser um número positivo')
      .integer('Dias deve ser um número inteiro')
      .min(1, 'Dias deve ser pelo menos 1')
      .max(365, 'Dias deve ser no máximo 365'),
    categoryId: yup
      .number()
      .optional()
      .positive('ID da categoria deve ser um número positivo')
      .integer('ID da categoria deve ser um número inteiro'),
    image: yup
      .string()
      .optional()
      .url('Imagem deve ser uma URL válida'),
  }),
});

// Schema para buscar produto por ID
export const getProductByIdSchema = yup.object({
  params: yup.object({
    id: yup
      .string()
      .required('ID é obrigatório')
      .matches(/^\d+$/, 'ID deve ser um número válido'),
  }),
});

// Schema para deletar produto por ID
export const deleteProductSchema = yup.object({
  params: yup.object({
    id: yup
      .string()
      .required('ID é obrigatório')
      .matches(/^\d+$/, 'ID deve ser um número válido'),
  }),
}); 