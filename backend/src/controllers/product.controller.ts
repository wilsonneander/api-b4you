import { Request, Response } from 'express';
import { Product } from '../models/product.model';
import { Category } from '../models/category.model';

// Listar todos os produtos
export const listProducts = async (_req: Request, res: Response) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name']
        }
      ],
      order: [['id', 'DESC']],
    });
    return res.status(200).json({
      success: true,
      data: products,
      count: products.length,
    });
  } catch (error) {
    console.error('Erro ao listar produtos:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Erro interno do servidor ao listar produtos',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
};

// Criar novo produto
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, result, days, categoryId, image } = req.body;

    // Validação adicional no controller
    if (!name || !result || !days || !categoryId || !image) {
      return res.status(400).json({
        success: false,
        message: 'Todos os campos são obrigatórios',
        requiredFields: ['name', 'result', 'days', 'categoryId', 'image']
      });
    }

    // Verificar se a categoria existe antes de criar o produto
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Categoria não encontrada',
        categoryId: categoryId
      });
    }

    const product = await Product.create({
      name,
      result,
      days,
      categoryId,
      image
    });

    return res.status(201).json({
      success: true,
      message: 'Produto criado com sucesso',
      data: product
    });
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Erro interno do servidor ao criar produto',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
};

// Buscar produto por ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const productId = parseInt(id);

    if (isNaN(productId)) {
      return res.status(400).json({
        success: false,
        message: 'ID do produto deve ser um número válido'
      });
    }

    const product = await Product.findByPk(productId, {
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name']
        }
      ]
    });
    
    if (!product) {
      return res.status(404).json({ 
        success: false,
        message: 'Produto não encontrado' 
      });
    }

    return res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Erro interno do servidor ao buscar produto',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
};

// Atualizar produto por ID
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const productId = parseInt(id);

    if (isNaN(productId)) {
      return res.status(400).json({
        success: false,
        message: 'ID do produto deve ser um número válido'
      });
    }

    // Verificar se o produto existe
    const existingProduct = await Product.findByPk(productId);
    if (!existingProduct) {
      return res.status(404).json({ 
        success: false,
        message: 'Produto não encontrado' 
      });
    }

    const [updated] = await Product.update(req.body, { 
      where: { id: productId } 
    });

    if (updated === 0) {
      return res.status(404).json({ 
        success: false,
        message: 'Produto não encontrado' 
      });
    }

    // Buscar o produto atualizado
    const updatedProduct = await Product.findByPk(productId);

    return res.status(200).json({
      success: true,
      message: 'Produto atualizado com sucesso',
      data: updatedProduct
    });
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Erro interno do servidor ao atualizar produto',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
};

// Deletar produto por ID
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const productId = parseInt(id);

    if (isNaN(productId)) {
      return res.status(400).json({
        success: false,
        message: 'ID do produto deve ser um número válido'
      });
    }

    // Verificar se o produto existe antes de deletar
    const existingProduct = await Product.findByPk(productId);
    if (!existingProduct) {
      return res.status(404).json({ 
        success: false,
        message: 'Produto não encontrado' 
      });
    }

    const deleted = await Product.destroy({ where: { id: productId } });
    
    if (!deleted) {
      return res.status(404).json({ 
        success: false,
        message: 'Produto não encontrado' 
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Produto removido com sucesso',
      deletedProduct: existingProduct
    });
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Erro interno do servidor ao deletar produto',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
};
