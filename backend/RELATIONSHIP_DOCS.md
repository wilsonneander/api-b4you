# Relacionamento entre Produtos e Categorias

## Visão Geral

Este documento descreve o relacionamento implementado entre os modelos `Product` e `Category` no sistema B4You API.

## Relacionamento

### Tipo de Relacionamento
- **Categoria → Produtos**: One-to-Many (Uma categoria tem muitos produtos)
- **Produto → Categoria**: Many-to-One (Um produto pertence a uma categoria)

### Implementação Técnica

#### Modelo Category (`src/models/category.model.ts`)
```typescript
@HasMany(() => Product)
products!: Product[];
```

#### Modelo Product (`src/models/product.model.ts`)
```typescript
@ForeignKey(() => Category)
@Column(DataType.INTEGER)
categoryId!: number;

@BelongsTo(() => Category)
category!: Category;
```

## Funcionalidades Implementadas

### 1. Controllers Atualizados

#### Product Controller
- `listProducts`: Agora inclui informações da categoria
- `getProductById`: Inclui dados da categoria associada

#### Category Controller (Novo)
- `listCategories`: Lista categorias com seus produtos
- `createCategory`: Cria nova categoria
- `getCategoryById`: Busca categoria específica com produtos
- `getProductsByCategory`: Lista produtos de uma categoria específica

### 2. Rotas Disponíveis

#### Produtos
- `GET /products` - Lista produtos com categorias
- `GET /products/:id` - Busca produto específico com categoria
- `POST /products` - Cria produto (valida categoria existente)
- `PUT /products/:id` - Atualiza produto
- `DELETE /products/:id` - Remove produto

#### Categorias
- `GET /categories` - Lista categorias com produtos
- `POST /categories` - Cria nova categoria
- `GET /categories/:id` - Busca categoria específica com produtos
- `GET /categories/:id/products` - Lista produtos de uma categoria

## Exemplos de Uso

### Buscar Produtos com Categorias
```bash
GET /products
```

Resposta:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "LipeLift",
      "result": "100 mil reais em 30 dias",
      "days": 30,
      "categoryId": 1,
      "image": "/products/Lipefit.webp",
      "category": {
        "id": 1,
        "name": "Suplementação Feminina"
      }
    }
  ],
  "count": 1
}
```

### Buscar Categoria com Produtos
```bash
GET /categories/1
```

Resposta:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Suplementação Feminina",
    "products": [
      {
        "id": 1,
        "name": "LipeLift",
        "result": "100 mil reais em 30 dias",
        "days": 30,
        "image": "/products/Lipefit.webp"
      }
    ]
  }
}
```

### Listar Produtos por Categoria
```bash
GET /categories/1/products
```

Resposta:
```json
{
  "success": true,
  "data": {
    "category": {
      "id": 1,
      "name": "Suplementação Feminina"
    },
    "products": [
      {
        "id": 1,
        "name": "LipeLift",
        "result": "100 mil reais em 30 dias",
        "days": 30,
        "image": "/products/Lipefit.webp",
        "category": {
          "id": 1,
          "name": "Suplementação Feminina"
        }
      }
    ],
    "count": 1
  }
}
```

## Validações

### Criação de Produto
- Verifica se a categoria existe antes de criar o produto
- Retorna erro 404 se categoria não encontrada

### Integridade Referencial
- O campo `categoryId` é obrigatório em produtos
- Produtos não podem existir sem uma categoria válida

## Seeds

Os dados de teste incluem:
- 6 categorias pré-definidas
- 6 produtos distribuídos entre as categorias
- Relacionamentos já estabelecidos nos seeds

## Benefícios

1. **Organização**: Produtos organizados por categorias
2. **Filtragem**: Possibilidade de filtrar produtos por categoria
3. **Navegação**: Interface mais intuitiva para usuários
4. **Escalabilidade**: Fácil adição de novas categorias
5. **Integridade**: Validação automática de relacionamentos 