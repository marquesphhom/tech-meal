# Tech Meal - Restaurant Management System

Tech Meal é uma solução completa para gestão e divulgação de restaurantes, abrangendo desde a área pública (site institucional) até um painel administrativo robusto para gestão de cardápio, reservas e fichas técnicas.

## 🚀 Tecnologias Utilizadas

- **Frontend:** React.js, Tailwind CSS, Lucide React, Axios, React Router.
- **Backend:** Node.js, Express, TypeScript, JWT (JSON Web Token).
- **Banco de Dados:** PostgreSQL (Configurado via Docker, dados atuais mockados para demonstração).
- **Containerização:** Docker & Docker Compose.

## 📁 Estrutura do Projeto

```
tech-meal/
├── frontend/          # Aplicação React (Vite)
├── backend/           # API Express (TypeScript)
├── docker-compose.yml # Orquestração de containers
└── README.md          # Documentação
```

## 🛠️ Como Executar

### Pré-requisitos
- Docker e Docker Compose instalados.

### Passos para Inicialização

1. Clone o repositório ou navegue até a pasta raiz `tech-meal`.
2. Execute o comando:
   ```bash
   docker-compose up --build
   ```
3. Acesse as aplicações:
   - **Frontend:** [http://localhost:3000](http://localhost:3000)
   - **Backend API:** [http://localhost:5000](http://localhost:5000)

## 🔐 Acesso Administrativo

Para acessar a área restrita, utilize as seguintes credenciais (Mock):
- **URL:** [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- **Usuário:** `admin`
- **Senha:** `admin123`

## 🌟 Funcionalidades

### Área Pública
- **Landing Page:** Apresentação moderna e responsiva.
- **Cardápio Online:** Listagem dinâmica de produtos por categoria.
- **Reservas:** Formulário completo com validação e escolha de mesa.
- **Buffet:** Informações sobre serviços de eventos.

### Área Administrativa (ERP)
- **Dashboard:** Visão geral das operações.
- **Gestão de Cardápio:** CRUD completo de produtos.
- **Ficha Técnica:** Controle de insumos, quantidades e custos por produto.
- **Gestão de Reservas:** Visualização, confirmação e cancelamento de agendamentos.
- **Gestão de Mesas:** Controle de capacidade e disponibilidade.

## 📝 Notas de Desenvolvimento
- O backend utiliza uma arquitetura em camadas (Routes, Controllers, Services, Middlewares).
- A autenticação JWT está implementada de forma mockada para facilitar o teste inicial sem dependência externa de banco de dados configurado manualmente.
- O projeto está pronto para integração total com o serviço PostgreSQL definido no `docker-compose.yml`.
