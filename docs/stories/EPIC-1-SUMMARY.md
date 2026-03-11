# Epic 1: Foundation & Authentication - Sprint Summary

**Epic Status:** Ready for Development
**Total Stories:** 6
**Total Estimated Effort:** 9.5 days (76 hours)
**Sprint Duration:** 2 weeks (MVP - Sprint 1)
**Priority:** MUST HAVE (MVP - Phase 1)
**Dependencies:** None (foundational epic)

---

## Overview

Epic 1 establishes the secure foundation for the entire Cartão de Todos platform by implementing authentication, session management, and Meta API credential configuration. This epic provides the security layer that protects sensitive credentials and ensures only authorized users can access the platform.

**Business Value:** Security foundation for all platform operations, LGPD compliance, and secure Meta API integration.

---

## Stories Created

### Story 1.6: Database Setup and Initialization
**File:** `/Users/macos/cartao-todos-meta-platform/docs/stories/1.6-database-setup-initialization.md`
**Estimated Effort:** 1 day (8 hours)
**Priority:** CRITICAL - Must be implemented FIRST
**Status:** Draft

**Summary:**
Set up PostgreSQL database with initial schema (users, sessions, api_credentials, audit_logs tables) and seed data (default admin user with password "100101"). Includes migration scripts, rollback support, and database connection configuration.

**Key Deliverables:**
- PostgreSQL schema with 4 core tables
- Migration runner with idempotent execution
- Seed script for default admin user
- Foreign key constraints and indexes
- Rollback support for disaster recovery

**Dependencies:**
- Depends on: None (first story to implement)
- Blocks: All other stories in Epic 1 (database tables required)

---

### Story 1.1: Admin Authentication System
**File:** `/Users/macos/cartao-todos-meta-platform/docs/stories/1.1-admin-authentication-system.md`
**Estimated Effort:** 2 days (16 hours)
**Priority:** HIGH
**Status:** Draft

**Summary:**
Implement secure admin login with JWT token-based authentication, bcrypt password hashing, and rate limiting to prevent brute force attacks. Includes login page, session management, and protected route middleware.

**Key Deliverables:**
- Login page with username/password form
- JWT token generation and validation (8-hour expiration, 30-day "remember me")
- Bcrypt password hashing (cost factor 10)
- Rate limiting (5 failed attempts = 15-minute lockout)
- httpOnly cookie storage for XSS protection
- Protected route middleware for Next.js

**Dependencies:**
- Depends on: Story 1.6 (Database Setup) - requires users and sessions tables
- Blocks: Story 1.2 (Password Change), Story 1.3 (Credentials Management)

---

### Story 1.2: Force Password Change on First Login
**File:** `/Users/macos/cartao-todos-meta-platform/docs/stories/1.2-force-password-change-first-login.md`
**Estimated Effort:** 1.5 days (12 hours)
**Priority:** HIGH
**Status:** Draft

**Summary:**
Force new admins to change the default password "100101" on first login. Includes password complexity validation, password strength indicator, and middleware to block dashboard access until password is changed.

**Key Deliverables:**
- Change password page with validation
- Password complexity requirements (8 chars, uppercase, lowercase, number, special char)
- Password requirements checklist component
- Password strength indicator (weak/medium/strong)
- Middleware to enforce password change flow
- Audit log entry for password changes

**Dependencies:**
- Depends on: Story 1.1 (Authentication) - requires login functionality and JWT tokens
- Blocks: Story 1.3 (Credentials Management) - must secure admin account before allowing credential configuration

---

### Story 1.3: Meta API Credentials Management
**File:** `/Users/macos/cartao-todos-meta-platform/docs/stories/1.3-meta-api-credentials-management.md`
**Estimated Effort:** 2 days (16 hours)
**Priority:** HIGH
**Status:** Draft

**Summary:**
Secure configuration UI for Meta API credentials (WABA ID, Phone Number ID, Access Token, Business Manager ID). Includes AES-256 encryption at rest, show/hide toggle for access token, and confirmation dialog to prevent accidental overwrites.

**Key Deliverables:**
- Settings page with Meta API configuration form
- AES-256-GCM encryption for access tokens
- Masked token display (show only last 4 chars)
- Show/Hide toggle for access token field
- Confirmation dialog before saving credentials
- Audit log entry for credential updates

**Dependencies:**
- Depends on: Story 1.1 (Authentication), Story 1.2 (Password Change) - requires secure admin account
- Blocks: Story 1.4 (Credential Validation) - cannot test connection without saved credentials

---

### Story 1.4: Credential Validation and API Connectivity Test
**File:** `/Users/macos/cartao-todos-meta-platform/docs/stories/1.4-credential-validation-api-connectivity.md`
**Estimated Effort:** 1.5 days (12 hours)
**Priority:** HIGH
**Status:** Draft

**Summary:**
"Test Connection" feature to validate Meta API credentials before saving. Makes GET request to Meta API, displays success/error banners with troubleshooting suggestions, and updates last_tested_at timestamp.

**Key Deliverables:**
- "Test Connection" button with loading state
- Meta API adapter for connectivity testing
- Success banner (green) with Meta account details
- Error banner (red) with troubleshooting suggestions
- last_tested_at timestamp tracking
- Error handling for 401, 404, 403, 429, network errors

**Dependencies:**
- Depends on: Story 1.3 (Credentials Management) - requires credential storage and decryption
- Blocks: Epic 2 (Meta API Integration) - cannot use Meta API without validated credentials

---

### Story 1.5: Session Management and Auto-Logout
**File:** `/Users/macos/cartao-todos-meta-platform/docs/stories/1.5-session-management-auto-logout.md`
**Estimated Effort:** 2 days (16 hours)
**Priority:** MEDIUM
**Status:** Draft

**Summary:**
Automatic session expiration with 8-hour timeout, activity-based session extension, and 5-minute warning dialog before logout. Includes multi-tab synchronization and automatic logout on session expiration.

**Key Deliverables:**
- Session monitoring (polls every 60 seconds)
- Activity tracker (extends session on user activity)
- Session warning dialog with countdown (5 minutes before expiration)
- Multi-tab synchronization via localStorage
- Logout API endpoint with session invalidation
- Extend session API endpoint (activity-based extension)

**Dependencies:**
- Depends on: Story 1.1 (Authentication) - requires JWT token creation and validation
- Blocks: None (enhances security for all features)

---

## Implementation Sequence

The stories should be implemented in the following order to respect dependencies:

1. **Story 1.6: Database Setup** (1 day) - MUST BE FIRST
   - Create PostgreSQL schema and migrations
   - Seed default admin user
   - Establish database connection

2. **Story 1.1: Admin Authentication** (2 days)
   - Implement login page and JWT authentication
   - Set up bcrypt password hashing
   - Create protected route middleware

3. **Story 1.2: Force Password Change** (1.5 days)
   - Build password change page
   - Implement password complexity validation
   - Add middleware to enforce password change flow

4. **Story 1.3: Meta API Credentials Management** (2 days)
   - Create Settings page with credential form
   - Implement AES-256 encryption
   - Add audit logging for credential access

5. **Story 1.4: Credential Validation** (1.5 days)
   - Build "Test Connection" feature
   - Create Meta API adapter
   - Implement error handling and troubleshooting suggestions

6. **Story 1.5: Session Management** (2 days) - CAN BE DONE IN PARALLEL WITH 1.3/1.4
   - Implement session monitoring and activity tracking
   - Create session warning dialog
   - Add multi-tab synchronization

---

## Dependency Graph

```
Story 1.6 (Database Setup)
    |
    v
Story 1.1 (Authentication)
    |
    +---> Story 1.2 (Password Change)
    |           |
    |           v
    |     Story 1.3 (Credentials Management)
    |           |
    |           v
    |     Story 1.4 (Credential Validation)
    |
    +---> Story 1.5 (Session Management) [Can be parallel with 1.3/1.4]
```

---

## Key Technical Components

### Database Tables
- **users** - Admin accounts (username, password_hash, force_password_change)
- **sessions** - Active sessions (user_id, token, expires_at)
- **api_credentials** - Meta API credentials (waba_id, phone_number_id, encrypted_access_token)
- **audit_logs** - Audit trail for compliance (user_id, action, changes_json, ip_address)

### Backend Services
- **authService** - Login, password change, JWT generation
- **sessionService** - Session creation, validation, extension, destruction
- **credentialService** - Credential CRUD, encryption/decryption
- **encryptionService** - AES-256-GCM encryption utilities
- **metaApiService** - Meta API adapter for connectivity testing
- **rateLimitService** - Redis-based rate limiting (failed login attempts)
- **auditService** - Audit log creation for all security events

### Frontend Components
- **Login Page** - Username/password form with validation
- **Change Password Page** - Password change form with complexity validation
- **Settings Page** - Meta API credential configuration
- **Session Warning Dialog** - Countdown timer with extend/logout buttons
- **Protected Route Middleware** - Redirects to login if session expired

### Security Features
- **Password Hashing:** bcrypt with cost factor 10
- **Encryption:** AES-256-GCM for access tokens
- **JWT Tokens:** HS256 algorithm, httpOnly cookies
- **Rate Limiting:** 5 failed attempts = 15-minute lockout
- **Session Expiration:** 8 hours (28800 seconds), 30 days with "remember me"
- **Audit Logging:** All security events logged (login, logout, credential access, password changes)

---

## Testing Strategy

### Unit Tests
- Authentication service (login, password validation, JWT generation)
- Encryption service (encrypt/decrypt, AES-256-GCM)
- Password validation (complexity requirements)
- Rate limiting (failed attempt tracking)
- Session management (creation, extension, destruction)

### Integration Tests
- Login API endpoint (success, invalid credentials, rate limiting)
- Password change API endpoint (validation, bcrypt hashing)
- Credential save API endpoint (encryption, audit logging)
- Credential test API endpoint (Meta API connectivity)
- Session API endpoints (extend, logout, status)

### End-to-End Tests
- Complete login flow (login → dashboard)
- First login flow (login → change password → dashboard)
- Credential configuration flow (settings → test → save)
- Session expiration flow (warning → extend/logout)

### Security Tests
- bcrypt password hashing (never plain text)
- AES-256 encryption (credentials at rest)
- JWT token validation (expired, invalid)
- Rate limiting (brute force prevention)
- httpOnly cookie (XSS prevention)
- Audit logging (all security events captured)

---

## Definition of Done (Epic-Level)

- [ ] All 6 stories completed and merged to main branch
- [ ] All unit tests passing (minimum 80% coverage)
- [ ] All integration tests passing
- [ ] All end-to-end tests passing
- [ ] Security review completed for all stories
- [ ] Database migrations run successfully on Railway (staging + production)
- [ ] Default admin user can log in with password "100101"
- [ ] Password change enforced on first login
- [ ] Meta API credentials can be configured and tested
- [ ] Session management working (8-hour expiration, activity extension, warning dialog)
- [ ] Audit logs capturing all security events
- [ ] LGPD compliance verified (audit trail, encryption at rest)
- [ ] Code linted and type-checked (no errors)
- [ ] Documentation updated (API endpoints, database schema, setup guides)
- [ ] Demo completed for stakeholders (login → change password → configure credentials → test)

---

## Risks and Mitigation

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|-----------|
| **Meta API credentials compromised** | Low | Critical | AES-256 encryption, audit logging, show/hide toggle |
| **Brute force attack on login** | Medium | High | Rate limiting (5 attempts = 15-minute lockout), bcrypt hashing |
| **Session hijacking** | Low | High | httpOnly cookies, JWT expiration, session monitoring |
| **LGPD non-compliance** | Low | Critical | Audit logs, encryption at rest, password change enforcement |
| **Database schema changes mid-sprint** | Medium | Medium | Idempotent migrations, rollback support |
| **Meta API connectivity issues during testing** | Medium | Medium | Error handling, troubleshooting suggestions, retry logic |

---

## Success Metrics

### Functional Metrics
- [ ] Default admin can log in successfully with "100101"
- [ ] Password change enforced and completed on first login
- [ ] Meta API credentials can be saved and tested (connection successful)
- [ ] Session expires after 8 hours of inactivity
- [ ] Session warning appears 5 minutes before expiration
- [ ] Rate limiting triggers after 5 failed login attempts

### Technical Metrics
- [ ] All unit tests passing (80%+ coverage)
- [ ] All integration tests passing
- [ ] API response time < 500ms for login/logout endpoints
- [ ] Database migration completes in < 5 seconds
- [ ] No console errors or warnings in browser

### Security Metrics
- [ ] 100% of passwords are bcrypt hashed (never plain text)
- [ ] 100% of access tokens are AES-256 encrypted at rest
- [ ] 100% of security events are audit logged
- [ ] 0 XSS vulnerabilities (httpOnly cookies)
- [ ] 0 brute force attacks successful (rate limiting)

---

## Next Steps After Epic 1

Once Epic 1 is complete, the team can proceed to:

1. **Epic 2: Meta API Integration** (2-3 weeks)
   - Template fetching and synchronization
   - Template library UI
   - Template quality rating display

2. **Epic 3: Message Sending** (1-2 weeks)
   - Message composer UI
   - Parameter validation
   - Message sending API integration

3. **Epic 4: Message History & Analytics** (1-2 weeks)
   - Message history display
   - Delivery status tracking (webhooks)
   - Basic analytics dashboard

---

## Notes for Development Team

### Best Practices
- **Story 1.6 MUST be implemented first** - All other stories depend on database tables
- **Use feature branches** - One branch per story (e.g., `feature/1.1-admin-auth`)
- **Write tests as you go** - TDD approach recommended (write tests before implementation)
- **Security-first mindset** - Never log sensitive data (passwords, tokens), always encrypt at rest
- **Code reviews required** - All stories must be reviewed by at least one other developer
- **Portuguese language** - All user-facing messages and error texts must be in Portuguese

### Development Environment Setup
1. Install PostgreSQL 15.x locally or use Railway dev instance
2. Install Redis 7.x locally or use Railway dev instance
3. Generate encryption key: `openssl rand -hex 32` (store in .env, never commit)
4. Run migrations: `npm run migrate` (creates all tables)
5. Run seed: `npm run seed` (creates default admin user)
6. Start backend: `npm run dev` (Express server on port 3001)
7. Start frontend: `npm run dev` (Next.js on port 3000)

### Testing Strategy
- **Unit tests:** Run with `npm test` (Jest)
- **Integration tests:** Run with `npm run test:integration` (requires database connection)
- **E2E tests:** Run with `npm run test:e2e` (Playwright, requires frontend + backend running)

### Deployment Checklist
- [ ] All environment variables set in Railway (DATABASE_URL, REDIS_URL, JWT_SECRET, ENCRYPTION_KEY)
- [ ] Database migrations run on Railway production instance
- [ ] Seed script run on Railway production instance (creates default admin)
- [ ] Frontend deployed to Vercel (automatic on main branch push)
- [ ] Backend deployed to Railway (automatic on main branch push)
- [ ] Health check endpoints responding (GET /health)
- [ ] Sentry error tracking configured

---

**Document Created:** 2026-03-11
**Author:** River (Scrum Master Agent)
**Status:** Ready for Sprint Planning
**Next Review:** After Sprint 1 completion (2 weeks)
