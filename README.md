
# Painel de Produtos - B4you

Este projeto consiste em uma aplicação completa (API + Frontend) para controle e visualização de produtos, com autenticação baseada em token JWT e painel administrativo. Inspirado na identidade visual e estrutura de produtos reais da empresa **B4you**.

---

## Requisitos

- Node.js (v18 ou superior)
- Docker
- Docker Compose

---

## 🔧 Tecnologias Utilizadas

### Backend
- Node.js
- TypeScript
- Express
- JWT (autenticação)
- Yup (validações)
- MySQL (via Docker)
- Docker Compose
- Sequelize

### Frontend
- React
- Next.js
- TypeScript
- Tailwind CSS
- Axios
- Yup

---

## ⚙️ Configuração do Projeto

### Clone o repositório

```bash
git clone <b4you-api>
```

---

## 🚀 Executando a Aplicação

### Usando Docker Compose

```bash
docker compose up
```

> Isso iniciará o banco de dados MySQL e a API na porta `3001`. O frontend estará disponível em `http://localhost:3000`.

---
## 🧪 Autenticação

- A autenticação é feita via JWT.
- Somente o usuário `admin@b4you.dev` consegue acessar o painel.
- O token expira em 1 hora automaticamente.
- As rotas protegidas exigem o token no header `Authorization: Bearer <token>`.

---

## 🛠️ Funcionalidades da API

- Login (`/auth/login`)
- Listagem de produtos (`/products`)
- Criação, edição e exclusão de produtos (CRUD)
- Middleware de autenticação protegendo rotas privadas
- Validações com Yup
- Criação de dados com seed inicial

---

## 🖥️ Funcionalidades do Frontend

- Tela de login com validação integrada ao backend
- Dashboard com listagem dos produtos existentes
- Ações de criar, editar e excluir produtos
- Logout automático após expiração do token
- Estilização com Tailwind CSS baseada nas cores da marca B4you
- Integração com API via Axios
- Validações com Yup
- Formulários com os seguintes campos obrigatórios:
  - Nome do produto
  - Resultado (ex: "R$ 10.000 em 30 dias")
  - Categoria
  - Dias
  - Imagem (URL)

---

## 📦 Scripts disponíveis

### Backend

```bash
npm install       # Instala dependências
npm run dev       # Inicia o servidor em modo desenvolvimento
npm run seed      # Popula o banco com dados simulados
npm run build     # Compila o TypeScript
npm run start     # Inicia a versão compilada
```

### Frontend

```bash
npm install       # Instala dependências
npm run dev       # Inicia o projeto Next.js em modo dev
npm run build     # Cria a versão de produção
npm run start     # Inicia a versão de produção
```

---


## 📌 Observações

- A estrutura do projeto backend segue organização modular com pastas como: `controllers`, `routes`, `middlewares`, `schemas`, `services`, entre outras.
- A UI foi inspirada diretamente no site oficial da B4you e adaptada para criar uma experiência realista de painel interno.

---

## 📫 Contato

Caso deseje mais informações sobre este projeto, entre em contato.
WhatsApp (41) 99615-1290