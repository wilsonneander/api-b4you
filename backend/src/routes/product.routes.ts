import { Router } from 'express';
import {
  listProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct
} from '../controllers/product.controller';
import { validateRequest } from '../middlewares/validation.middleware';
import {
  createProductSchema,
  updateProductSchema,
  getProductByIdSchema,
  deleteProductSchema
} from '../validations/product.validation';

const router = Router();

router.get('/', listProducts);
router.post('/', validateRequest(createProductSchema), createProduct);
router.get('/:id', validateRequest(getProductByIdSchema), getProductById);
router.put('/:id', validateRequest(updateProductSchema), updateProduct);
router.delete('/:id', validateRequest(deleteProductSchema), deleteProduct);

export default router;
