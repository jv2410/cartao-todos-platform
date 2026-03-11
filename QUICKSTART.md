# 🚀 Quick Start - Cartão de Todos Meta Platform

**Plataforma de Mensagens WhatsApp Business API para Cartão de Todos**

## ✅ O que foi implementado

### Epic 1: Foundation & Authentication (COMPLETO)
- ✅ Database PostgreSQL (users, sessions, api_credentials, audit_logs)
- ✅ Autenticação JWT com cookies httpOnly
- ✅ Troca obrigatória de senha no primeiro login
- ✅ Gerenciamento de credenciais Meta API (criptografia AES-256)
- ✅ Validação de credenciais com Meta Graph API
- ✅ Gerenciamento de sessão com auto-logout
- ✅ Interface 100% em Português Brasileiro

---

## 📋 Pré-requisitos

### Instalar Dependências do Sistema

```bash
# PostgreSQL 15+
brew install postgresql@15

# Redis 7+
brew install redis

# Node.js 20+
brew install node@20
```

---

## 🔧 Configuração Rápida (5 minutos)

### 1. Instalar Dependências do Projeto

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Configurar Variáveis de Ambiente

#### Backend (.env)

```bash
cd backend
cp .env.example .env
```

Edite `backend/.env`:

```env
# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/cartao_todos_dev

# Redis
REDIS_URL=redis://localhost:6379

# JWT Secret (gerar com: openssl rand -hex 32)
JWT_SECRET=your_generated_secret_here

# Encryption Key (gerar com: openssl rand -hex 32)
ENCRYPTION_KEY=your_generated_encryption_key_here

# Server
PORT=3001
NODE_ENV=development

# CORS
FRONTEND_URL=http://localhost:3000
```

#### Frontend (.env.local)

```bash
cd ../frontend
cp .env.example .env.local
```

Edite `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 3. Iniciar PostgreSQL e Redis

```bash
# Iniciar PostgreSQL
brew services start postgresql@15

# Criar database
createdb cartao_todos_dev

# Iniciar Redis
brew services start redis
```

### 4. Executar Migrations e Seeds

```bash
cd backend
npm run db:setup
```

Isso irá:
- Criar todas as tabelas (users, sessions, api_credentials, audit_logs)
- Inserir usuário admin padrão (username: `admin`, password: `100101`)

### 5. Iniciar Servidores de Desenvolvimento

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

---

## 🎯 Acessar a Aplicação

1. **Abrir navegador:** http://localhost:3000

2. **Fazer login:**
   - Username: `admin`
   - Password: `100101`

3. **Trocar senha** (obrigatório no primeiro login)
   - Nova senha deve ter:
     - Mínimo 8 caracteres
     - 1 letra maiúscula
     - 1 letra minúscula
     - 1 número
     - 1 caractere especial

4. **Configurar credenciais Meta API** em `/settings`:
   - WABA ID (15-17 dígitos)
   - Phone Number ID (15-17 dígitos)
   - Access Token (mínimo 50 caracteres)
   - Business Manager ID (opcional)

5. **Testar conexão** com o botão "Testar Conexão"

---

## 📁 Estrutura do Projeto

```
cartao-todos-meta-platform/
├── backend/                      # Express.js API
│   ├── src/
│   │   ├── db/                   # Database migrations e seeds
│   │   ├── routes/               # API endpoints
│   │   ├── services/             # Business logic
│   │   ├── middleware/           # Auth, error handling
│   │   └── utils/                # Helpers (JWT, bcrypt, encryption)
│   └── package.json
│
├── frontend/                     # Next.js 14 App
│   ├── src/
│   │   ├── app/                  # Pages (login, dashboard, settings)
│   │   ├── components/           # UI components
│   │   ├── hooks/                # React hooks (useAuth)
│   │   └── lib/                  # API client, utilities
│   └── package.json
│
└── docs/                         # Documentação completa
    ├── stories/                  # User stories (1.1-1.6)
    ├── prd/                      # Product Requirements
    ├── architecture/             # Architecture & Design specs
    └── project-brief.md
```

---

## 🧪 Comandos Úteis

### Backend

```bash
# Development
npm run dev                 # Iniciar servidor dev (nodemon)

# Database
npm run migrate            # Executar migrations
npm run migrate:rollback   # Reverter migrations
npm run seed              # Inserir dados de seed
npm run db:setup          # migrate + seed

# Code Quality
npm run typecheck         # Verificar tipos TypeScript
npm run lint              # ESLint
npm run build             # Build para produção
```

### Frontend

```bash
# Development
npm run dev               # Iniciar Next.js dev server

# Code Quality
npm run typecheck         # Verificar tipos TypeScript
npm run lint              # ESLint
npm run build             # Build para produção
npm start                 # Rodar build de produção
```

---

## 🔐 Segurança Implementada

- ✅ **JWT Tokens** em cookies httpOnly (proteção XSS)
- ✅ **Bcrypt** para hash de senhas (cost factor 10)
- ✅ **AES-256-GCM** para criptografia de tokens Meta API
- ✅ **Rate Limiting** (5 tentativas = bloqueio de 15 minutos)
- ✅ **Validação de entrada** com Joi (backend) e HTML5 (frontend)
- ✅ **Audit Logs** para compliance LGPD
- ✅ **Queries parametrizadas** (prevenção SQL injection)
- ✅ **CORS** configurado para frontend específico

---

## 📊 Endpoints da API

### Autenticação
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Dados do usuário atual
- `POST /api/auth/logout` - Logout
- `POST /api/auth/change-password` - Trocar senha
- `GET /api/auth/session-status` - Status da sessão
- `POST /api/auth/extend-session` - Estender sessão

### Settings (Credenciais)
- `GET /api/settings/credentials` - Obter credenciais (token mascarado)
- `PUT /api/settings/credentials` - Salvar credenciais
- `POST /api/settings/credentials/test` - Testar conexão Meta API
- `POST /api/settings/credentials/decrypt-token` - Descriptografar token

---

## 🐛 Troubleshooting

### Erro: "JWT_SECRET environment variable is required"
```bash
# Gerar secret e adicionar ao .env
openssl rand -hex 32
# Copiar resultado para JWT_SECRET em backend/.env
```

### Erro: "ENCRYPTION_KEY must be a 64-character hexadecimal string"
```bash
# Gerar encryption key e adicionar ao .env
openssl rand -hex 32
# Copiar resultado para ENCRYPTION_KEY em backend/.env
```

### Erro: "database does not exist"
```bash
createdb cartao_todos_dev
cd backend && npm run db:setup
```

### Erro: "Redis connection failed"
```bash
brew services start redis
# Verificar se está rodando:
redis-cli ping  # Deve retornar "PONG"
```

### Frontend não conecta ao backend
- Verificar se backend está rodando em http://localhost:3001
- Verificar NEXT_PUBLIC_API_URL em frontend/.env.local
- Verificar CORS em backend/src/index.ts

---

## 📖 Documentação Completa

- **SETUP.md** - Guia detalhado de setup local
- **IMPLEMENTATION_REPORT.md** - Relatório completo de implementação
- **docs/prd/prd.md** - Product Requirements Document (3,071 linhas)
- **docs/architecture/fullstack-architecture.md** - Arquitetura técnica
- **docs/architecture/front-end-spec.md** - Especificação de design
- **docs/stories/** - 6 user stories detalhadas

---

## 🎨 UI/UX Pro Max Skill

O projeto inclui a skill **UI/UX Pro Max** instalada em `.agents/skills/ui-ux-pro-max/`

Para usar:
```bash
# A skill já está instalada e pronta para uso com Claude Code
# Acesse via comandos de design no Claude Code
```

---

## ✅ Checklist de Configuração

- [ ] PostgreSQL instalado e rodando
- [ ] Redis instalado e rodando
- [ ] Node.js 20+ instalado
- [ ] Database `cartao_todos_dev` criada
- [ ] `backend/.env` configurado com JWT_SECRET e ENCRYPTION_KEY
- [ ] `frontend/.env.local` configurado
- [ ] `npm install` executado em backend e frontend
- [ ] `npm run db:setup` executado (migrations + seeds)
- [ ] Backend rodando em http://localhost:3001
- [ ] Frontend rodando em http://localhost:3000
- [ ] Login com admin/100101 funcionando
- [ ] Troca de senha funcionando
- [ ] Settings página acessível

---

## 🚀 Próximos Passos (Epic 2)

Após Epic 1 estar funcionando, os próximos passos são:

### Epic 2: Meta API Integration
- Story 2.1: Template Fetching and Synchronization
- Story 2.2: Template Library UI
- Story 2.3: Template Detail View
- Story 2.4: Template Quality Rating Display

### Epic 3: Message Dispatch
- Story 3.1: Message Composer Wizard
- Story 3.2: Single Message Sending
- Story 3.3: Message History
- Story 3.4: Delivery Status Tracking

---

## 📞 Suporte

Para dúvidas ou problemas, consulte:
1. SETUP.md (configuração detalhada)
2. IMPLEMENTATION_REPORT.md (detalhes técnicos)
3. docs/stories/ (acceptance criteria)

---

**Desenvolvido com Synkra AIOS**
🤖 Generated with [Claude Code](https://claude.com/claude-code)
