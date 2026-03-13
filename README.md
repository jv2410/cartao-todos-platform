# Cartão de Todos - Plataforma WhatsApp Business

Plataforma profissional para disparos em massa via WhatsApp Business com design nível Apple.

## 🚀 Deploy Vercel

**IMPORTANTE**: Este projeto usa uma estrutura monorepo. O frontend está na pasta `frontend/`.

O arquivo `vercel.json` já está configurado corretamente para build automático.

## Project Overview

**Cartão de Todos** is a specialized tool designed for small business owners to send templated WhatsApp Business messages without technical expertise. The platform handles Meta API integration, credential management, template versioning, and comprehensive audit logging for LGPD compliance.

### Key Features

- **Template Management:** Create, manage, and track WhatsApp Business templates
- **Credential Management:** Secure storage of Meta API credentials with encryption
- **Message Sending:** Send templated messages to individual phone numbers
- **Delivery Tracking:** Real-time message status tracking (sent, delivered, read)
- **Analytics Dashboard:** View message statistics and delivery rates
- **User Authentication:** Secure JWT-based authentication with password policies
- **Audit Logging:** LGPD-compliant audit trails for all operations

## Tech Stack

### Frontend
- **Next.js 14** - React framework with server-side rendering
- **React 18** - Component library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn UI** - Accessible React components

### Backend
- **Node.js 20 LTS** - JavaScript runtime
- **Express.js 4** - HTTP server framework
- **TypeScript** - Type safety
- **PostgreSQL 15** - Relational database
- **Redis 7** - Cache and session store

### Infrastructure
- **Vercel** - Frontend hosting
- **Railway** - Backend, database, and cache hosting
- **GitHub Actions** - CI/CD pipeline

## Project Structure

```
cartao-todos-meta-platform/
├── frontend/                    # Next.js frontend application
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── .env.example
├── backend/                     # Express.js backend API
│   ├── src/
│   ├── dist/
│   ├── package.json
│   └── .env.example
├── docs/                        # Documentation
│   ├── architecture/            # System architecture docs
│   ├── stories/                 # Development stories
│   ├── prd/                     # Product requirement documents
│   └── guides/                  # User and developer guides
├── aios-core/                   # Synkra AIOS framework
├── .github/
│   └── workflows/              # CI/CD workflows
├── .gitignore
└── README.md
```

## Quick Start

### Prerequisites
- Node.js 20.x or higher
- npm or yarn
- PostgreSQL 15 (local or Railway)
- Redis 7 (local or Railway)

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/cartao-todos-meta-platform.git
   cd cartao-todos-meta-platform
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   cp .env.example .env.local
   npm install
   npm run dev
   ```
   Frontend runs at `http://localhost:3000`

3. **Backend Setup**
   ```bash
   cd backend
   cp .env.example .env
   npm install
   npm run dev
   ```
   Backend API runs at `http://localhost:3001`

4. **Database Setup**
   See [SETUP.md](./SETUP.md) for detailed database initialization instructions.

### Running Tests

```bash
# Frontend tests
cd frontend && npm test

# Backend tests
cd backend && npm test

# Lint both
cd frontend && npm run lint
cd backend && npm run lint
```

### Building for Production

```bash
# Frontend
cd frontend && npm run build && npm start

# Backend
cd backend && npm run build && npm start
```

## API Documentation

The backend API provides endpoints for:

- **Authentication:** Login, logout, password management
- **Credentials:** Store and manage Meta API credentials
- **Templates:** Create, update, delete message templates
- **Messages:** Send messages, track delivery status
- **Analytics:** View message statistics
- **Audit Logs:** Access compliance audit trails

See `/docs/architecture/fullstack-architecture.md` for complete API endpoint specifications.

## Environment Variables

### Frontend (.env.local)
- `NEXT_PUBLIC_API_URL` - Backend API base URL
- `PORT` - Development server port

### Backend (.env)
- `DATABASE_URL` - PostgreSQL connection string
- `REDIS_HOST`, `REDIS_PORT` - Redis connection
- `JWT_SECRET` - JWT signing key
- `META_APP_SECRET` - Meta app secret for webhook verification
- `ENCRYPTION_KEY` - AES-256 encryption key for credentials

See `.env.example` files in each directory for complete list.

## CI/CD Pipeline

GitHub Actions automatically:
1. Runs linting and type checking
2. Executes test suites
3. Builds both frontend and backend
4. Performs security scanning

See `.github/workflows/ci.yml` for workflow details.

## Documentation

- **[Architecture](./docs/architecture/fullstack-architecture.md)** - Complete system design and technical specifications
- **[Setup Guide](./SETUP.md)** - Local development and deployment setup
- **[API Reference](./docs/api/)** - Detailed API endpoint documentation (Phase 1)
- **[Security](./docs/security.md)** - Security architecture and compliance (Phase 1)

## Contributing

This project uses story-driven development. All changes should reference a story ID from the backlog.

1. Create a feature branch: `git checkout -b feat/story-name`
2. Make changes and write tests
3. Ensure linting passes: `npm run lint`
4. Ensure type checking passes: `npm run typecheck`
5. Commit with conventional message: `feat: description [Story X.X]`
6. Create a pull request with story ID

## Deployment

### Frontend (Vercel)
```bash
# Automatic deployment on push to main
# Manual: vercel deploy
```

### Backend (Railway)
```bash
# Automatic deployment on push to main
# Database migrations handled automatically
```

See deployment documentation for production deployment procedures.

## Security & Compliance

- **LGPD Compliant:** Comprehensive audit logging and data retention policies
- **Encryption:** AES-256 encryption for credentials at rest
- **Authentication:** JWT tokens with secure cookies
- **Rate Limiting:** API rate limiting to prevent abuse
- **Input Validation:** Schema validation on all endpoints

## License

Copyright © 2026. All rights reserved.

## Support

For issues, questions, or contributions, please create an issue on GitHub.

---

**Status:** MVP Phase 1 - Implementation Ready
**Last Updated:** 2026-03-11
