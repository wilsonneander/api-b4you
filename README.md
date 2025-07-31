🧱 Etapas de Implementação 
-------------------------------------------------------------------------------------------------------------------

 Backend B4you API
Este projeto foi desenvolvido com foco em boas práticas de organização, segurança, manutenibilidade e escalabilidade. 
Abaixo está a descrição lógica e técnica das etapas seguidas na construção do backend com TypeScript.

✅ 1. Inicialização do Projeto
-Criação da pasta do projeto e inicialização com npm init.

-Instalação das dependências principais para o funcionamento da API (express, cors, dotenv, jsonwebtoken, yup).

-Instalação das dependências de desenvolvimento para suporte a TypeScript (ts-node-dev, tipos de bibliotecas, etc.).

-Inicialização do tsconfig.json com opções otimizadas para um projeto backend escalável.

📌 Motivação: Usar TypeScript desde o início garante maior segurança em tempo de desenvolvimento e organização clara dos tipos.
-------------------------------------------------------------------------------------------------------------------


⚙️ 2. Configuração e Estrutura Base
Criação de estrutura modular em src/, com pastas organizadas para controllers, middlewares, routes, schemas, entre outras.

Arquivos principais criados:

-server.ts: ponto de entrada do servidor.

-app.ts: configuração do Express, middlewares globais e importação de rotas.

-Configuração de scripts no package.json para rodar em modo dev, build e produção.

📌 Motivação: A separação clara de responsabilidades facilita a manutenção, testes e escalabilidade futura.
-------------------------------------------------------------------------------------------------------------------


🔐 3. Gerenciamento de Ambiente
-Variáveis sensíveis (como JWT_SECRET, TOKEN_EXPIRATION, DB_HOST, etc.) foram isoladas em um arquivo .env.

-Também foi criado um .env.example para facilitar a replicação em diferentes ambientes.

📌 Motivação: Isso garante segurança e facilita a configuração em produção ou máquinas de outros devs.
-------------------------------------------------------------------------------------------------------------------


🛣️ 4. Autenticação e Rotas Iniciais
Primeiro passo foi criar a rota de login (/auth/login) para simular autenticação e gerar um token JWT.

-Implementado middleware de autenticação para proteger rotas privadas (/products).

-Toda requisição a rotas protegidas requer token válido no header Authorization.

📌 Motivação: Toda a aplicação depende da autenticação. A estrutura começa garantindo segurança no acesso.
-------------------------------------------------------------------------------------------------------------------


✅ 5. Validações
-Implementados schemas com Yup para validar:

-req.body (ex: login, criação de produto)

-req.params e req.query (ex: edição e deleção)

-As validações são aplicadas via middleware antes de atingir os controllers.

📌 Motivação: Garantir que apenas dados válidos cheguem à lógica de negócio e ao banco de dados.
-------------------------------------------------------------------------------------------------------------------


🔄 6. CRUD de Produtos
Após autenticação, foi implementado o CRUD completo de produtos:

GET: listar todos e por ID

POST: criar novo produto

PUT: editar produto existente

DELETE: excluir produto

Todas as operações são protegidas por middleware JWT.

📌 Motivação: Simular um sistema real de administração de produtos conforme o objetivo do projeto.
-------------------------------------------------------------------------------------------------------------------

🧬 7. Integração com Banco de Dados
-Banco utilizado: MySQL como principal, com Supabase para visualização/admin alternativo.

-Inicialmente testado com SQLite para prototipagem rápida, e depois migrado para MySQL via Docker.

-Criação de arquivos seed com dados iniciais (usuários, produtos e categorias).

-Scripts para popular o banco com run-seeds.ts.

📌 Motivação: A separação entre lógica e dados garante testes realistas e consistência nos ambientes de desenvolvimento.
-------------------------------------------------------------------------------------------------------------------

🐳 8. Docker
-Configuração do ambiente para rodar com Docker e Docker Compose.

-Banco de dados (MySQL) é executado em container isolado.

-Backend pode se conectar ao banco via localhost ou db conforme configuração.

Comandos:
bash
Copiar
Editar
docker compose up        # Sobe os containers (ex: MySQL)
npm install              # Instala as dependências
npm run seed             # Popula o banco de dados
npm run dev              # Inicia o servidor Express com TypeScript
📌 Motivação: Facilita o setup em outras máquinas, padroniza ambientes e elimina problemas de instalação local.
-------------------------------------------------------------------------------------------------------------------


💡 Conclusão
Este backend entrega:

🔐 Autenticação JWT protegendo rotas privadas

🧪 Validações robustas com Yup

✅ CRUD real com banco de dados MySQL

🚀 Servidor Express com TypeScript

🐳 Docker para facilidade de setup

🌱 Seeds para testes com dados reais

📦 Organização modular e escalável


🖥️ Frontend – B4you Web Interface
✨ Visão Geral
O frontend do sistema B4you foi desenvolvido com React + Next.js + TypeScript, utilizando Tailwind CSS para estilização.
O foco principal foi entregar uma interface moderna, funcional e alinhada com a identidade visual da empresa, simulando um painel real de administração de produtos. 
-------------------------------------------------------------------------------------------------------------------


🎨 Identidade Visual e UX
As cores, fontes e layout foram inspirados diretamente no site da empresa B4you, reforçando a identidade visual.

A interface simula um sistema real interno da empresa, incluindo login, painel de produtos e CRUD completo.

Os produtos exibidos foram baseados em itens reais da empresa, reforçando a consistência do sistema.

📌 Motivação: Criar uma experiência próxima à realidade da empresa, com um visual coerente e estrutura funcional.
-------------------------------------------------------------------------------------------------------------------


📂 Estrutura do Projeto
bash
Copiar
Editar
frontend/
│
├── api/                 # Integração com backend (hooks de login e produtos)
├── app/                 # Arquivos principais do Next.js (layout, global CSS, pages)
├── components/          # Componentes de UI (login, form, dashboard, modais)
│   └── ui/              # Componentes reutilizáveis (modal, carrossel, etc.)
├── hooks/               # Hooks personalizados (toast, mobile)
├── lib/                 # Configuração do Axios, funções auxiliares
├── public/              # Imagens e assets estáticos
└── styles/              # Estilos globais se necessário
-------------------------------------------------------------------------------------------------------------------

⚙️ Tecnologias Utilizadas
Next.js: framework React para renderização híbrida (SSR + CSR)

React + TypeScript: para melhor estruturação e manutenção

Tailwind CSS: para estilização rápida e responsiva

Axios: requisições HTTP para o backend

Yup: validação de formulários

JWT Token (1h de expiração): controle de sessão no client

Hooks personalizados: abstrações de comportamento (toasts, mobile)
-------------------------------------------------------------------------------------------------------------------


🔐 Autenticação e Validação
A página inicial apresenta um formulário de login.

Validação feita com Yup garantindo que apenas o usuário com o e-mail admin@B4you.dev possam acessar.

Após autenticação:

O token JWT retornado do backend é armazenado e usado em todas as requisições protegidas.

O token expira automaticamente após 1 hora, forçando o logout do usuário.

Um botão de logout permite encerrar a sessão manualmente.

📌 Motivação: Garantir segurança e controle total de sessão, simulando um painel administrativo privado.
-------------------------------------------------------------------------------------------------------------------


📦 Dashboard de Produtos
Após login bem-sucedido:

O usuário é redirecionado para o dashboard de produtos, onde pode:

Visualizar produtos cadastrados (dados vindos dos seeds do backend)

Criar novos produtos via formulário validado

Editar produtos existentes

Excluir produtos (com confirmação via modal)

Campos do Produto:
Nome

Descrição (resultado)

Dias (validado entre 1 e 365)

Categoria (vinculada ao ID da categoria no backend)

URL da imagem

📌 Motivação: Reproduzir um CRUD completo com integração real com o backend via token JWT.
-------------------------------------------------------------------------------------------------------------------


🔄 Integração com o Backend
As chamadas à API são feitas usando Axios, com headers automáticos contendo o token JWT.

O hook use-login.ts cuida da autenticação.

O hook use-products.ts cuida da manipulação de produtos (GET, POST, PUT, DELETE).

Toasts personalizados são utilizados para feedback de sucesso ou erro.
-------------------------------------------------------------------------------------------------------------------


🔁 Fluxo do Usuário
plaintext
Copiar
Editar
1. Acessa /login
2. Preenche e-mail e senha (validados com Yup)
3. Se credenciais corretas, recebe token e é redirecionado para /dashboard
4. No dashboard:
   - Visualiza produtos existentes
   - Pode criar, editar ou excluir produtos
   - Se inativo por 1h, token expira e é redirecionado para login 
5. Pode clicar em logout manual a qualquer momento


🔚 Considerações Finais
O frontend da B4you foi projetado para simular um ambiente real de administração de produtos:

Totalmente responsivo e alinhado com a identidade visual da empresa

Validação robusta e controle de acesso seguro

Integração real com o backend via JWT e API REST

Código organizado, modular e pronto para evoluções futuras



🚀 Como rodar o Back-end
# 1. Instalar dependências
npm install

# 2. Subir banco com Docker
docker compose up

# 3. Rodar seeds (criação inicial do banco)
npm run seed

# 4. Rodar o servidor em desenvolvimento
npm run dev
Servidor disponível em: http://localhost:3001



▶️ Como Executar o Frontend
# 1. Instalar dependências
npm install      
Servidor disponível em: http://localhost:3000

# 2. Iniciar frontend em modo desenvolvimento
npm run dev     
💡 Certifique-se de que o backend esteja rodando em http://localhost:3001 (ou outro valor definido no .env.local)
