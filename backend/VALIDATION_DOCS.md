# Documentação das Validações da API

## Visão Geral

Este documento descreve as validações implementadas em todas as rotas da API B4You. As validações são feitas em duas camadas:

1. **Middleware de Validação**: Usando Yup para validação de schemas
2. **Validação no Controller**: Validações adicionais de negócio

## Estrutura de Validação

### Middleware de Validação (`src/middlewares/validation.middleware.ts`)

O middleware `validateRequest` recebe um schema Yup e valida:
- `req.body` - Dados do corpo da requisição
- `req.params` - Parâmetros da URL
- `req.query` - Query parameters

### Schemas de Validação

#### Autenticação (`src/validations/auth.validation.ts`)

**Login Schema:**
- `email`: String obrigatório, formato de email válido
- `password`: String obrigatório, mínimo 6 caracteres

#### Produtos (`src/validations/product.validation.ts`)

**Create Product Schema:**
- `name`: String obrigatório, 2-100 caracteres
- `result`: String obrigatório, 2-500 caracteres
- `days`: Number obrigatório, positivo, inteiro, 1-365
- `categoryId`: Number obrigatório, positivo, inteiro
- `image`: String obrigatório, URL válida

**Update Product Schema:**
- `id`: String obrigatório, número válido (params)
- Todos os campos do body são opcionais, mas seguem as mesmas regras

**Get/Delete Product Schema:**
- `id`: String obrigatório, número válido (params)

#### Categorias (`src/validations/category.validation.ts`)

**Create Category Schema:**
- `name`: String obrigatório, 2-50 caracteres

**Update Category Schema:**
- `id`: String obrigatório, número válido (params)
- `name`: String opcional, 2-50 caracteres

**Get/Delete Category Schema:**
- `id`: String obrigatório, número válido (params)

## Validações Adicionais nos Controllers

### Produtos

1. **Verificação de duplicação**: Não permite criar produtos com nomes duplicados
2. **Validação de ID**: Converte e valida IDs numéricos
3. **Verificação de existência**: Verifica se o produto existe antes de atualizar/deletar
4. **Validação de categoria**: Verifica se a categoria existe (TODO)

### Categorias

1. **Verificação de duplicação**: Não permite criar categorias com nomes duplicados
2. **Validação de ID**: Converte e valida IDs numéricos
3. **Verificação de existência**: Verifica se a categoria existe antes de atualizar/deletar
4. **Proteção contra exclusão**: TODO - Verificar se há produtos associados

### Autenticação

1. **Validação de formato de email**: Regex para validar formato
2. **Validação de senha**: Mínimo 6 caracteres
3. **Verificação de credenciais**: Compara com variáveis de ambiente

## Respostas de Erro Padronizadas

Todas as respostas de erro seguem o formato:

```json
{
  "success": false,
  "message": "Descrição do erro",
  "errors": ["Lista de erros específicos"] // Apenas para erros de validação
}
```

### Códigos de Status HTTP

- `400`: Dados inválidos (validação falhou)
- `401`: Credenciais inválidas
- `404`: Recurso não encontrado
- `409`: Conflito (duplicação)
- `500`: Erro interno do servidor

## Exemplos de Uso

### Criar Produto (Válido)
```json
POST /products
{
  "name": "Produto Teste",
  "result": "Resultado esperado",
  "days": 30,
  "categoryId": 1,
  "image": "https://example.com/image.jpg"
}
```

### Criar Produto (Inválido)
```json
POST /products
{
  "name": "A",
  "result": "",
  "days": -1,
  "categoryId": "abc",
  "image": "invalid-url"
}
```

**Resposta:**
```json
{
  "success": false,
  "message": "Dados inválidos",
  "errors": [
    "Nome deve ter pelo menos 2 caracteres",
    "Resultado é obrigatório",
    "Dias deve ser um número positivo",
    "ID da categoria deve ser um número positivo",
    "Imagem deve ser uma URL válida"
  ]
}
```

## Configuração de Ambiente

Para desenvolvimento, os erros detalhados são retornados quando `NODE_ENV=development`.

Para produção, apenas mensagens genéricas são retornadas para evitar exposição de informações sensíveis. 