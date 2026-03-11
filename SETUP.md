# Local Development Setup Guide

Complete guide for setting up the Cartão de Todos platform for local development.

## Prerequisites

- **Node.js:** 20.x LTS or higher
- **npm:** 9.x or higher (comes with Node.js)
- **PostgreSQL:** 15.x ([Install](https://www.postgresql.org/download/))
- **Redis:** 7.x ([Install](https://redis.io/docs/getting-started/installation/))
- **Git:** 2.x or higher

### Verify Installations

```bash
node --version      # Should be v20.x or higher
npm --version       # Should be 9.x or higher
psql --version      # Should be postgres 15.x
redis-cli --version # Should be redis-cli 7.x
```

## Step 1: Clone and Initialize Repository

```bash
# Clone the repository
git clone https://github.com/your-org/cartao-todos-meta-platform.git
cd cartao-todos-meta-platform

# Verify directory structure
ls -la
# Should show: frontend/, backend/, docs/, aios-core/, .github/, README.md, SETUP.md
```

## Step 2: Database Setup

### Create PostgreSQL Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Inside PostgreSQL prompt:
CREATE DATABASE cartao_todos_db;
CREATE USER cartao_user WITH PASSWORD 'secure_password_here';
ALTER ROLE cartao_user SET client_encoding TO 'utf8';
ALTER ROLE cartao_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE cartao_user SET default_transaction_deferrable TO on;
ALTER ROLE cartao_user SET default_transaction_read_committed TO off;
ALTER ROLE cartao_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE cartao_todos_db TO cartao_user;
\q
```

### Initialize Database Schema

```bash
cd backend

# The schema will be created during first run
# (Database migrations will be implemented in Phase 2)

# For now, create basic schema manually:
psql -U cartao_user -d cartao_todos_db -f docs/schema.sql

# If schema file doesn't exist, you'll create it via migrations in Phase 1
```

## Step 3: Redis Setup

### Start Redis (local)

```bash
# On macOS with Homebrew:
brew services start redis

# Or run Redis directly:
redis-server

# Verify connection:
redis-cli ping
# Should return: PONG
```

## Step 4: Environment Configuration

### Frontend Configuration

```bash
cd frontend

# Copy example environment file
cp .env.example .env.local

# Edit .env.local with your settings:
# NEXT_PUBLIC_API_URL=http://localhost:3001/api
# PORT=3000
```

### Backend Configuration

```bash
cd backend

# Copy example environment file
cp .env.example .env

# Edit .env with your settings:
cat .env
# Fill in:
DATABASE_URL=postgresql://cartao_user:secure_password_here@localhost:5432/cartao_todos_db
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=generate-a-random-string-32-chars-minimum
ENCRYPTION_KEY=generate-a-32-char-encryption-key-here
META_APP_SECRET=get-from-meta-dev-account
```

### Generate Secrets

```bash
# Generate random JWT_SECRET
openssl rand -base64 32

# Generate encryption key (32 bytes = 64 hex chars)
openssl rand -hex 32

# Save these in your .env files
```

## Step 5: Install Dependencies

### Frontend Dependencies

```bash
cd frontend
npm install
```

### Backend Dependencies

```bash
cd backend
npm install
```

## Step 6: Start Development Servers

### Terminal 1: Frontend

```bash
cd frontend
npm run dev
# Output: ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

### Terminal 2: Backend

```bash
cd backend
npm run dev
# Output: Server running on port 3001
```

### Terminal 3: Redis (if not running as service)

```bash
redis-server
```

## Verification

### Test Frontend
```bash
curl http://localhost:3000
# Should return HTML homepage
```

### Test Backend
```bash
curl http://localhost:3001/health
# Should return JSON with status: 'healthy'
```

### Test Database Connection
```bash
psql -U cartao_user -d cartao_todos_db -c "SELECT 1;"
# Should return: 1
```

### Test Redis Connection
```bash
redis-cli ping
# Should return: PONG
```

## Running Tests

### Frontend Tests
```bash
cd frontend
npm test
```

### Backend Tests
```bash
cd backend
npm test
```

### All Tests
```bash
# From root directory
npm test --workspace=frontend
npm test --workspace=backend
```

## Code Quality

### Linting

```bash
# Frontend
cd frontend && npm run lint

# Backend
cd backend && npm run lint
```

### Type Checking

```bash
# Frontend
cd frontend && npm run typecheck

# Backend
cd backend && npm run typecheck
```

## Debugging

### Enable Debug Logging

```bash
# Backend
export LOG_LEVEL=debug
npm run dev

# Frontend
export DEBUG=*
npm run dev
```

### Database Debugging

```bash
# View recent log entries
psql -U cartao_user -d cartao_todos_db -c "SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT 10;"

# Check table structure
psql -U cartao_user -d cartao_todos_db -c "\d+ users"
```

### Redis Debugging

```bash
# Monitor Redis commands
redis-cli MONITOR

# View all keys
redis-cli KEYS '*'

# Check session data
redis-cli GET session:user-id-here
```

## Common Issues

### PostgreSQL Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```
**Solution:** Start PostgreSQL
```bash
brew services start postgresql
# or
pg_ctl -D /usr/local/var/postgres start
```

### Redis Connection Error
```
Error: ECONNREFUSED 127.0.0.1:6379
```
**Solution:** Start Redis
```bash
brew services start redis
# or
redis-server
```

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::3000
```
**Solution:** Kill process using the port
```bash
# For macOS/Linux
lsof -ti:3000 | xargs kill -9

# Or change port in .env.local
PORT=3001
```

### Missing Environment Variables
```
Error: DATABASE_URL is not defined
```
**Solution:** Check .env files are properly set
```bash
# Frontend
cat frontend/.env.local

# Backend
cat backend/.env
```

## Setting Up Meta WhatsApp Business API (Phase 1)

1. Create Meta Developer Account at https://developers.facebook.com/
2. Create WhatsApp Business App
3. Generate access token
4. Get WABA ID (WhatsApp Business Account ID)
5. Add credentials in application UI or backend .env

See full API setup in `/docs/architecture/fullstack-architecture.md` section 5.

## Next Steps

1. ✅ Local development environment running
2. Create initial database schema (Phase 1)
3. Implement authentication endpoints
4. Set up Meta API integration
5. Deploy to Vercel (frontend) and Railway (backend)

## Production Deployment

See `/docs/deployment/` for:
- Vercel frontend deployment
- Railway backend deployment
- Database migration strategy
- Environment configuration for production

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review `/docs/architecture/fullstack-architecture.md`
3. Check GitHub issues
4. Create a new issue with detailed information

---

**Last Updated:** 2026-03-11
**Status:** MVP Phase 1 Setup Guide
