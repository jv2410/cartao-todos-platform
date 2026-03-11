# Project Brief: Meta WhatsApp Business API Messaging Platform
**Cartão de Todos - Admin Messaging Interface**

---

## Executive Summary

This document outlines the discovery and requirements for developing a comprehensive admin platform for managing WhatsApp Business API messaging for Cartão de Todos, Brazil's largest healthcare discount card franchise with over 12,000 partner establishments.

The platform will enable administrators to manage, create, and send WhatsApp message templates through Meta's WhatsApp Business Platform API, with a focus on Brazilian market needs, Portuguese language support, and brand-aligned user experience.

**Key Project Goals:**
- Streamline WhatsApp Business API template management for franchise operations
- Enable non-technical staff to send approved message templates
- Maintain Meta compliance and template quality standards
- Provide secure, role-based access with Brazilian market localization
- Reflect Cartão de Todos' brand identity (welcoming, accessible, trust-focused)

---

## 1. Market Context & Competitive Landscape

### 1.1 WhatsApp Business API Platform Market (2026)

The WhatsApp Business API platform market has evolved significantly, with key trends including:

**Market Dominance:**
- WhatsApp is the primary communication channel in Brazil (>90% smartphone penetration)
- Brazilian businesses heavily rely on WhatsApp for customer engagement
- Meta's API platform is the only official channel for business-initiated messages

**Competitive Platform Landscape:**

| Provider | Strengths | Weaknesses | Price Range |
|----------|-----------|------------|-------------|
| **Twilio** | Developer-friendly, robust API, global reach | Complex setup, higher learning curve | $$$$ |
| **Infobip** | Enterprise features, omnichannel, analytics | Expensive, overkill for SMEs | $$$$ |
| **Wati** | Easy setup, AI automation, Brazilian support | Limited customization | $$$ |
| **Respond.io** | Unified inbox, CRM integration, team collaboration | Mid-tier pricing | $$$ |
| **Gupshup** | Scalable, chatbot builder, template management | UI complexity | $$$ |
| **YourGPT** | AI-powered, no-code builder, multilingual | Newer platform, limited integrations | $$ |

**Key Insight:** Most platforms are either too complex for non-technical users or too expensive for franchise operations. There's a market opportunity for a simplified, brand-specific interface focused on template management rather than full-featured messaging suites.

### 1.2 Message Template Management Patterns

Based on competitor analysis and Meta's best practices, successful template management platforms share these patterns:

**Template Lifecycle Management:**
1. **Creation** - Visual template builder with variable placeholders
2. **Submission** - Direct API integration for Meta approval queue
3. **Approval Tracking** - Real-time status updates (pending, approved, rejected, paused, disabled)
4. **Quality Monitoring** - Template quality ratings and usage analytics
5. **Template Library** - Searchable, categorized template repository
6. **Versioning** - Template history and revision management

**Common UI Patterns:**
- Card-based template library with status indicators
- Side-by-side preview (mobile mockup + code view)
- Category tabs (Marketing, Utility, Authentication)
- Quick actions (Send, Edit, Duplicate, Archive)
- Bulk operations (Delete multiple, Export templates)
- Filter/search with autocomplete

**Brazilian Market Considerations:**
- Interface must be 100% in Brazilian Portuguese (pt-BR)
- Text fields must accommodate 30% longer Portuguese translations
- Date/time formats: DD/MM/YYYY, 24-hour time
- Currency: R$ (Real brasileiro)
- Familiar design patterns from popular Brazilian apps (Nubank, iFood, MercadoLivre)

---

## 2. User Personas

### Persona 1: **Franchise Administrator (Primary User)**
**Name:** Carla Santos
**Age:** 38
**Role:** Franchise Operations Manager
**Technical Proficiency:** Medium (comfortable with basic software, not a developer)

**Goals:**
- Manage WhatsApp message templates for franchise communications
- Send promotional campaigns to customer segments
- Track message delivery and engagement
- Ensure compliance with Meta's template policies

**Pain Points:**
- Overwhelmed by technical API documentation
- Fears making mistakes that could disable templates or violate Meta policies
- Needs quick access to pre-approved templates for time-sensitive campaigns
- Struggles with platforms that require technical knowledge

**Behavioral Traits:**
- Prefers visual interfaces over code/text configuration
- Values clear status indicators and confirmation messages
- Needs guidance (tooltips, help text) throughout workflows
- Works primarily on desktop but checks mobile during off-hours

**Success Criteria:**
- Can create and send a template message in under 3 minutes
- Understands template status without reading documentation
- Feels confident the platform prevents compliance violations

---

### Persona 2: **Marketing Coordinator (Secondary User)**
**Name:** Bruno Oliveira
**Age:** 29
**Role:** Marketing and Communications Coordinator
**Technical Proficiency:** Medium-High (familiar with marketing automation tools)

**Goals:**
- Create compelling message campaigns aligned with brand voice
- A/B test different message templates for engagement
- Analyze campaign performance metrics
- Coordinate with design team on media-rich templates

**Pain Points:**
- Limited by character counts and Meta's template restrictions
- Difficulty previewing how messages appear on different devices
- Wants creative freedom but constrained by approval process
- Needs to justify ROI of WhatsApp campaigns to management

**Behavioral Traits:**
- Detail-oriented, focuses on copy quality and brand consistency
- Data-driven, wants analytics and reporting
- Collaborative, shares templates with team members
- Mobile-first mindset (tests everything on mobile)

**Success Criteria:**
- Can design visually appealing templates within Meta guidelines
- Understands why templates get rejected and how to fix them
- Can export campaign performance data for reports

---

### Persona 3: **Customer Support Agent (Tertiary User)**
**Name:** Patricia Lima
**Age:** 25
**Role:** Customer Support Specialist
**Technical Proficiency:** Low-Medium (uses support software daily, minimal tech experience)

**Goals:**
- Send quick, pre-approved responses to common customer inquiries
- Access template library during active customer conversations
- Personalize messages with customer-specific information (name, card number, etc.)

**Pain Points:**
- Needs speed - customers expect instant WhatsApp responses
- Limited authority to modify templates (must use pre-approved content)
- Overwhelmed by too many template options
- Worried about sending wrong template to customer

**Behavioral Traits:**
- Task-focused, follows established workflows
- Prefers simple, minimal interfaces
- Relies on search and favorites to find templates quickly
- Primarily works on desktop with WhatsApp Web open side-by-side

**Success Criteria:**
- Can find and send correct template in under 30 seconds
- Templates are organized by customer inquiry type
- Personalization fields are clearly marked and validated

---

### Persona 4: **System Administrator (Technical Owner)**
**Name:** Rafael Costa
**Age:** 35
**Role:** IT Coordinator / System Administrator
**Technical Proficiency:** High (full-stack developer, API integration experience)

**Goals:**
- Configure Meta API integration and maintain authentication
- Set up user roles and permissions (RBAC)
- Monitor system health and API quota limits
- Troubleshoot template approval failures and API errors

**Pain Points:**
- Manual authentication token refresh is error-prone
- No centralized logging for debugging production issues
- Needs to balance security requirements with user convenience
- Concerns about API rate limits during high-volume campaigns

**Behavioral Traits:**
- Security-first mindset
- Values clear error messages and debugging tools
- Prefers automated processes over manual intervention
- Documents everything for knowledge transfer

**Success Criteria:**
- Can set up the platform and integrate with Meta API in under 2 hours
- Has visibility into API health, usage quotas, and error logs
- Can grant/revoke user access without modifying code

---

## 3. Problem Statement & Key Pain Points

### 3.1 Core Problems This Platform Solves

**Problem 1: Technical Complexity of Meta's WhatsApp Business API**
- **Current State:** Direct API integration requires developer expertise, OAuth flows, webhook configuration, and API documentation comprehension
- **Impact:** Franchise staff cannot leverage WhatsApp Business capabilities without external developer support
- **Solution:** Abstract API complexity behind intuitive UI, handle authentication/authorization automatically, provide guided workflows

**Problem 2: Template Management Chaos**
- **Current State:** Templates scattered across documentation, no centralized repository, difficult to track approval status, no version control
- **Impact:** Duplicated effort, inconsistent messaging, compliance risks, wasted time searching for templates
- **Solution:** Centralized template library with search, categorization, status tracking, and version history

**Problem 3: Non-Technical User Barriers**
- **Current State:** Existing platforms (Twilio, Infobip) designed for developers, steep learning curves, overwhelming feature sets
- **Impact:** Marketing and support teams dependent on IT, slow campaign execution, missed business opportunities
- **Solution:** Role-based interfaces tailored to user expertise, progressive disclosure of advanced features, contextual help

**Problem 4: Compliance and Quality Management**
- **Current State:** Easy to violate Meta's template policies unknowingly, template quality ratings opaque, no guidance on improving rejected templates
- **Impact:** Templates disabled, accounts at risk, customer experience degraded by poor-quality messages
- **Solution:** Built-in validation against Meta policies, real-time quality feedback, actionable rejection reasons, best practice templates

**Problem 5: Brazilian Market Localization Gap**
- **Current State:** Most platforms have poor or no Portuguese localization, UI patterns unfamiliar to Brazilian users, pricing in USD
- **Impact:** User adoption resistance, errors from language misunderstandings, perceived as "foreign" tool
- **Solution:** 100% Brazilian Portuguese interface, culturally adapted UX, local payment integration, Brazilian date/currency formats

### 3.2 Business Impact

**Without This Platform:**
- 4-6 hours per week spent coordinating with IT for template changes
- 2-3 day delay for campaign launches due to approval bottlenecks
- 15-20% of staff time wasted searching for correct templates
- Higher risk of Meta policy violations and account suspension
- Missed revenue opportunities from delayed or canceled campaigns

**With This Platform:**
- Self-service template management (80% reduction in IT dependency)
- Same-day campaign launches
- 5-minute average template search and send time
- Automated compliance validation (95% reduction in policy violations)
- 30% increase in WhatsApp campaign frequency and reach

---

## 4. Technical Requirements

### 4.1 Meta WhatsApp Business Platform API Integration

**Required API Components:**

1. **Authentication & Authorization**
   - **System User Access Tokens:** For direct business-owned data access (primary method)
   - **Token Refresh:** Automated token renewal before expiration
   - **Permissions:** `whatsapp_business_messaging` permission required
   - **2FA Enforcement:** Mandatory two-factor authentication for Meta Business Manager

2. **Core API Endpoints:**
   ```
   GET /v18.0/{whatsapp-business-account-id}/message_templates
   POST /v18.0/{whatsapp-business-account-id}/message_templates
   DELETE /v18.0/{whatsapp-business-account-id}/message_templates/{template-id}
   POST /v18.0/{phone-number-id}/messages
   GET /v18.0/{phone-number-id}
   ```

3. **Webhook Integration:**
   - **Message Status Updates:** Delivery confirmations, read receipts, failed messages
   - **Template Status Changes:** Approval notifications, quality rating updates, pause/disable alerts
   - **Account Notifications:** Quota warnings, policy violations

4. **Prerequisites:**
   - Active Meta Business Manager account (verified, 2-5 business days)
   - WhatsApp Business Account (WABA) with phone number
   - Dedicated phone number (not active in WhatsApp App)
   - Display name approved by Meta

5. **Rate Limits & Quotas:**
   - **Template Limits:** 250 templates (unverified accounts), 6,000 templates (verified accounts)
   - **Messaging Tier System:** Quality-based messaging limits (Tier 1: 1K/day, Tier 2: 10K/day, Tier 3: 100K/day, Tier 4: unlimited)
   - **API Rate Limits:** 80 requests per second (Cloud API)

### 4.2 Template Management Requirements

**Template Structure:**
```json
{
  "name": "promotional_discount_v2",
  "language": "pt_BR",
  "category": "MARKETING",
  "components": [
    {
      "type": "HEADER",
      "format": "IMAGE",
      "example": { "header_handle": ["https://example.com/image.jpg"] }
    },
    {
      "type": "BODY",
      "text": "Olá {{1}}, aproveite {{2}}% de desconto!",
      "example": { "body_text": [["João", "20"]] }
    },
    {
      "type": "FOOTER",
      "text": "Cartão de Todos - Responda PARAR para cancelar"
    },
    {
      "type": "BUTTONS",
      "buttons": [
        { "type": "URL", "text": "Ver ofertas", "url": "https://www.cartaodetodos.com.br/ofertas" }
      ]
    }
  ]
}
```

**Validation Rules:**
- **Category Compliance:** Marketing templates must include opt-out language
- **Character Limits:** Header (60 chars), Body (1024 chars), Footer (60 chars), Button text (25 chars)
- **Media Requirements:** Images <15MB, valid HTTPS URLs, accepted formats (JPEG, PNG)
- **Variable Placeholders:** Sequential numbering {{1}}, {{2}}, examples required for approval
- **Template Naming:** Lowercase, underscores only, no special characters, unique within WABA

**Quality Management:**
- **Quality Ratings:** High, Medium, Low, Flagged
- **Auto-Pause Triggers:** Low quality rating (3 hours), multiple user blocks (6 hours)
- **Disable Triggers:** Repeated policy violations, consistently poor quality
- **Recovery Actions:** Edit template, adjust audience, reduce frequency

### 4.3 Security & Access Control

**Authentication Layers:**

1. **Admin Authentication (Platform Access)**
   - **Primary Method:** Password-based authentication
   - **Default Password:** `100101` (must be changed on first login)
   - **Password Requirements:** Minimum 8 characters, alphanumeric + special characters
   - **Session Management:** JWT tokens, 8-hour expiration, secure httpOnly cookies
   - **Account Lockout:** 5 failed attempts = 15-minute lockout

2. **Role-Based Access Control (RBAC)**
   ```
   Roles:
   - Super Admin: Full access (system config, user management, all templates)
   - Admin: Template CRUD, send messages, view analytics
   - Editor: Create/edit templates, cannot delete or send
   - Sender: Send pre-approved templates only, read-only template library
   - Viewer: Read-only access, analytics and reports
   ```

3. **Meta API Security:**
   - **Token Storage:** Encrypted at rest (AES-256), secure key management
   - **Webhook Verification:** Signature validation for all incoming webhooks
   - **HTTPS Only:** All API communication over TLS 1.3
   - **IP Whitelisting:** (Optional) Restrict Meta API access to specific IPs

**Security Best Practices:**
- **Audit Logging:** Track all template changes, message sends, config updates
- **Data Encryption:** Customer phone numbers and message content encrypted in database
- **Regular Backups:** Daily automated backups, 30-day retention
- **Vulnerability Scanning:** Monthly security audits, dependency updates
- **LGPD Compliance:** Brazilian data protection law adherence (opt-in consent, data deletion rights)

### 4.4 Technology Stack Recommendations

**Frontend:**
- **Framework:** React 18+ or Next.js 14+ (SSR for SEO, performance)
- **UI Library:** Shadcn UI, Tailwind CSS (design system flexibility)
- **State Management:** Zustand or React Query (API state caching)
- **Forms:** React Hook Form + Zod (validation)
- **Internationalization:** i18next (pt-BR locale, date/number formatting)

**Backend:**
- **Runtime:** Node.js 20+ (LTS) or Bun (performance)
- **Framework:** Express.js, Fastify, or NestJS (structure for larger teams)
- **Database:** PostgreSQL 16+ (relational data, JSON support) or MongoDB (flexible schema)
- **Cache:** Redis (session storage, API response caching)
- **Queue:** Bull or BullMQ (message sending queue, retry logic)

**Infrastructure:**
- **Hosting:** Vercel (frontend), Railway/Render (backend), or AWS/Azure
- **CDN:** Cloudflare (DDoS protection, SSL, global edge caching)
- **Monitoring:** Sentry (error tracking), Datadog or New Relic (APM)
- **Logging:** Winston or Pino (structured JSON logs)

**Development Tools:**
- **Version Control:** Git + GitHub
- **CI/CD:** GitHub Actions (automated testing, deployment)
- **Code Quality:** ESLint, Prettier, TypeScript strict mode
- **Testing:** Vitest (unit), Playwright (E2E), MSW (API mocking)

---

## 5. Admin Dashboard UI/UX Patterns

### 5.1 Core Dashboard Components

**1. Navigation Structure:**
```
├── Dashboard (Home)
│   ├── Quick Stats (templates count, messages sent today, pending approvals)
│   ├── Recent Activity Feed
│   └── Quick Actions (New Template, Send Message)
├── Templates
│   ├── All Templates (grid/list view toggle)
│   ├── By Category (Marketing, Utility, Authentication)
│   ├── By Status (Approved, Pending, Rejected, Paused)
│   └── Favorites / Recently Used
├── Send Message
│   ├── Select Template
│   ├── Choose Recipients (manual, CSV upload, segment)
│   ├── Preview & Personalize
│   └── Schedule or Send Now
├── Analytics
│   ├── Message Metrics (sent, delivered, read, failed)
│   ├── Template Performance (engagement rate, quality score)
│   └── Export Reports (CSV, PDF)
├── Settings
│   ├── Account Settings (Meta API config)
│   ├── User Management (RBAC)
│   ├── Notification Preferences
│   └── System Logs (audit trail)
└── Help
    ├── Documentation
    ├── Video Tutorials
    └── Support Contact
```

**2. Template Library Card Pattern:**
```
┌─────────────────────────────────────────┐
│ [STATUS BADGE]              [⋯ MENU]   │
│ ┌─────────┐                             │
│ │ [ICON]  │  Template Name              │
│ │         │  Category: Marketing        │
│ └─────────┘  Language: pt-BR            │
│                                          │
│ "Olá {{1}}, aproveite {{2}}% de..."    │
│                                          │
│ ├ Quality: ★★★★☆ High                  │
│ ├ Created: 15/02/2026                   │
│ └ Used: 1,234 times                     │
│                                          │
│ [📤 Send] [✏️ Edit] [📋 Duplicate]      │
└─────────────────────────────────────────┘

Status Badge Colors:
- ✅ Approved (Green #00A988)
- ⏳ Pending (Yellow #F59E0B)
- ❌ Rejected (Red #EF4444)
- ⏸️ Paused (Orange #F97316)
- 🚫 Disabled (Gray #6B7280)
```

**3. Mobile Preview Component:**
```
WhatsApp Message Preview
┌─────────────────┐
│ ◀ WhatsApp      │
├─────────────────┤
│ Cartão de Todos │
│ ┌─────────────┐ │
│ │   [IMAGE]   │ │
│ └─────────────┘ │
│ Olá João,       │
│ aproveite 20%   │
│ de desconto!    │
│                 │
│ Cartão de Todos │
│ Responda PARAR  │
│                 │
│ [Ver ofertas]   │
└─────────────────┘
```

### 5.2 Brazilian UX Considerations

**Language & Localization:**
- **Interface Language:** 100% Brazilian Portuguese (pt-BR)
- **Tone of Voice:** Formal "você" (professional context), warm and welcoming
- **Date Format:** DD/MM/AAAA (25/12/2026)
- **Time Format:** 24-hour (14:30)
- **Currency:** R$ 1.234,56 (period for thousands, comma for decimals)
- **Phone Format:** +55 (11) 99999-9999

**Cultural Design Patterns:**
- **Color Psychology:** Green conveys trust and growth in Brazilian culture (aligns with Cartão de Todos brand)
- **Familiarity:** Borrow patterns from popular Brazilian apps (Nubank's card-based UI, iFood's clear CTAs, PicPay's simplified forms)
- **Accessibility:** High contrast ratios (many users on older devices), large tap targets (mobile-first users)
- **Loading States:** Use skeleton screens instead of spinners (perceived performance)
- **Error Messages:** Friendly, human language - avoid technical jargon

**Typography:**
- **Primary Font:** Inter, Open Sans, or Nunito (excellent Portuguese diacritic support: ã, ç, õ)
- **Font Sizes:** Minimum 16px for body text (mobile readability)
- **Line Height:** 1.6-1.8 (Portuguese text 30% longer than English, needs breathing room)

**Form Design:**
- **Field Labels:** Above input (not placeholder-only, accessibility)
- **Required Fields:** Red asterisk (*) + "Obrigatório" label
- **Validation:** Real-time feedback, not just on submit
- **Help Text:** Inline tooltips with (?) icon hover/tap

### 5.3 Responsive Design Breakpoints

```css
/* Mobile First Approach */
--mobile: 320px - 767px    /* Primary viewport for most users */
--tablet: 768px - 1023px   /* iPad, tablets */
--desktop: 1024px - 1439px /* Laptop, desktop */
--wide: 1440px+            /* Large monitors */

Key Adaptations:
- Navigation: Hamburger menu (mobile) → sidebar (desktop)
- Template Cards: 1 column (mobile) → 2 columns (tablet) → 3-4 columns (desktop)
- Data Tables: Horizontally scrollable (mobile) → full table (desktop)
- Forms: Single column always (easier to fill on all devices)
```

---

## 6. Feature Prioritization (MVP vs. Future)

### Phase 1: MVP (Minimum Viable Product) - 6-8 weeks
**Core Capabilities:**
- ✅ User authentication (admin password protection)
- ✅ Meta API integration (System User token)
- ✅ Template library (view all templates, search, filter by status)
- ✅ Template creation (basic text templates with variables)
- ✅ Template submission to Meta for approval
- ✅ Send message to single recipient (select approved template + phone number)
- ✅ Basic dashboard (template count, recent activity)
- ✅ Brazilian Portuguese interface

**Excluded from MVP:**
- ❌ User management / RBAC (single admin user only)
- ❌ Bulk sending / CSV upload
- ❌ Analytics and reporting
- ❌ Media templates (images, videos)
- ❌ Scheduled messaging
- ❌ Template versioning

### Phase 2: Enhanced Features - 4-6 weeks
- Role-based access control (RBAC)
- Bulk message sending (CSV import, up to 1,000 recipients)
- Media template support (image, video, document headers)
- Basic analytics (messages sent, delivered, read rates)
- Template favorites and tags
- Message scheduling (send at specific date/time)

### Phase 3: Advanced Features - 6-8 weeks
- Advanced analytics and reporting (campaign performance, ROI tracking)
- Template A/B testing
- Audience segmentation (create reusable recipient lists)
- Webhook event viewer (real-time message status)
- Template quality score dashboard
- CSV export for compliance audits
- Multi-language template support (add Spanish, English)

### Phase 4: Enterprise Features - Future Roadmap
- Multi-WABA support (manage multiple WhatsApp Business Accounts)
- Chatbot integration (automated responses)
- CRM integration (Salesforce, HubSpot, RD Station)
- WhatsApp commerce features (catalog, cart, payment)
- Advanced AI features (template suggestions, content optimization)
- White-label customization (franchise-specific branding)

---

## 7. Success Metrics & KPIs

### 7.1 User Adoption Metrics
- **Primary Metric:** Active users per week (target: 80% of franchise staff within 3 months)
- Time to first template sent (target: < 10 minutes)
- User login frequency (target: daily usage for 60% of users)
- Feature adoption rate (% users who have used each major feature)

### 7.2 Operational Efficiency Metrics
- **Template Management:**
  - Average time to create and submit template (target: < 5 minutes)
  - Template approval rate (target: >90% first-time approval)
  - Template library search time (target: < 30 seconds to find template)

- **Message Sending:**
  - Time from template selection to message sent (target: < 2 minutes)
  - Messages sent per user per week (baseline: establish in month 1)
  - Failed message rate (target: < 2%)

### 7.3 Business Impact Metrics
- **Cost Savings:**
  - Reduction in IT support tickets for WhatsApp (target: 80% reduction)
  - Staff hours saved per week (target: 20+ hours franchise-wide)

- **Campaign Performance:**
  - Campaign launch time (target: same-day vs. current 2-3 days)
  - Message delivery rate (target: >95%)
  - Customer engagement rate (target: >40% read rate)

- **Compliance:**
  - Template policy violation incidents (target: 0 per quarter)
  - Template pause/disable events (target: < 5% of templates)
  - Quality rating distribution (target: >80% High/Medium quality)

### 7.4 Technical Performance Metrics
- **System Reliability:**
  - Platform uptime (target: 99.5%)
  - API error rate (target: < 1%)
  - Average page load time (target: < 2 seconds)

- **Security:**
  - Failed authentication attempts (monitor for brute force)
  - Unauthorized access attempts (target: 0)
  - Time to patch security vulnerabilities (target: < 48 hours)

---

## 8. Risks & Mitigation Strategies

### 8.1 Technical Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| **Meta API Rate Limiting** | Medium | High | Implement request queueing, cache API responses, monitor quota usage dashboards |
| **Authentication Token Expiration** | High | High | Automated token refresh 48hrs before expiration, admin alerts for failures |
| **Template Approval Delays** | Medium | Medium | Set user expectations (approval takes 1-24hrs), implement status notifications |
| **Webhook Delivery Failures** | Low | Medium | Retry logic with exponential backoff, webhook event logging for debugging |
| **Database Performance at Scale** | Low | High | Database indexing on common queries, implement pagination, Redis caching layer |

### 8.2 Business Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| **Low User Adoption** | Medium | High | Comprehensive training program, video tutorials, in-app onboarding flow |
| **Meta Policy Violations** | Medium | Critical | Built-in template validation, compliance checklists, educational tooltips |
| **Account Suspension** | Low | Critical | Strict adherence to Meta guidelines, quality monitoring, gradual sending ramp-up |
| **Data Privacy Breach** | Low | Critical | Encryption at rest/transit, LGPD compliance audit, security penetration testing |
| **Competitor Emerges** | Low | Medium | Focus on Cartão de Todos-specific customization, franchise-centric features |

### 8.3 User Experience Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| **Confusion from Complex UI** | High | Medium | User testing with actual franchise staff, progressive disclosure of advanced features |
| **Portuguese Translation Errors** | Medium | Medium | Native Brazilian Portuguese speaker for copywriting, user testing for comprehension |
| **Mobile Performance Issues** | Medium | Medium | Mobile-first development approach, performance budgets, regular device testing |
| **Inadequate Help Documentation** | High | Low | Contextual help system, video walkthroughs, FAQ section, support chat integration |

### 8.4 Dependency Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| **Meta API Breaking Changes** | Low | High | Subscribe to Meta developer changelog, staging environment for testing updates |
| **Third-Party Service Outages** | Low | Medium | Fallback mechanisms, status page subscriptions, multi-region hosting |
| **Open Source Library Vulnerabilities** | Medium | Medium | Automated dependency scanning (Dependabot), regular security patches |

---

## 9. Compliance & Regulatory Considerations

### 9.1 Meta WhatsApp Business Platform Policies

**Template Content Restrictions:**
- ❌ Prohibited: Misleading information, inappropriate content, discriminatory language
- ❌ Restricted: Medical advice, financial promises, gambling content
- ✅ Required: Opt-out instructions for marketing messages
- ✅ Best Practice: Clear, honest value proposition aligned with business

**Messaging Compliance:**
- **Opt-In Requirement:** Users must explicitly consent to receive messages
- **24-Hour Window:** Free-form messaging only within 24hrs of user-initiated contact
- **Template-Only Beyond 24hrs:** Business-initiated messages require approved templates
- **Quality Monitoring:** Meta tracks block rates, delivery rates, user reports

**Account Quality:**
- **Phone Number Quality Rating:** Based on message quality, user feedback
- **Display Name Accuracy:** Must match legal business name
- **Business Verification:** Recommended for higher messaging limits

### 9.2 Brazilian Data Protection (LGPD)

**Lei Geral de Proteção de Dados (LGPD) - Brazil's GDPR:**

**User Rights:**
- **Right to Access:** Users can request their stored data
- **Right to Deletion:** Users can request data erasure (except legal retention requirements)
- **Right to Portability:** Users can export their data
- **Right to Object:** Users can opt-out of data processing

**Platform Obligations:**
- **Consent Management:** Clear opt-in for marketing communications
- **Data Minimization:** Only collect necessary data (phone number, message history)
- **Purpose Limitation:** Data used only for stated purpose (WhatsApp messaging)
- **Encryption:** Personal data encrypted at rest and in transit
- **Breach Notification:** Report data breaches to ANPD (National Data Protection Authority) within reasonable time

**Implementation:**
- Privacy Policy page in Portuguese
- Cookie consent banner (if using analytics)
- Data retention policy (automatic deletion after 90 days of inactivity)
- Audit logs for data access and modifications

### 9.3 Security Standards

**Industry Best Practices:**
- **OWASP Top 10:** Address common web vulnerabilities (injection, XSS, CSRF)
- **ISO 27001:** Information security management (optional certification, but follow principles)
- **PCI DSS:** Not applicable (no payment card processing), but secure data handling principles apply

---

## 10. Budget & Resource Estimates

### 10.1 Development Costs (Estimates)

**MVP Phase (6-8 weeks):**
- Frontend Developer (React): 6 weeks × R$8,000/week = R$48,000
- Backend Developer (Node.js): 6 weeks × R$8,000/week = R$48,000
- UI/UX Designer: 2 weeks × R$6,000/week = R$12,000
- QA/Testing: 2 weeks × R$5,000/week = R$10,000
- **Total MVP:** R$118,000

**Phase 2-3 (10-14 weeks):**
- Estimated: R$150,000 - R$200,000

**Ongoing Maintenance (Annual):**
- R$5,000 - R$10,000/month (bug fixes, updates, support)

### 10.2 Infrastructure Costs (Monthly)

- **Hosting:** R$500 - R$1,500 (Vercel Pro + AWS/Railway backend)
- **Database:** R$300 - R$800 (managed PostgreSQL)
- **CDN/SSL:** R$0 - R$500 (Cloudflare Free/Pro)
- **Monitoring:** R$200 - R$600 (Sentry, logging)
- **Meta API:** R$0 (Cloud API is free, pay per message sent)
- **Message Costs:** Variable (R$0.02 - R$0.10 per message, depends on volume)
- **Total Monthly:** R$1,000 - R$3,400

### 10.3 Third-Party Service Costs

- **WhatsApp Business API:** Free (Cloud API), message-based pricing
- **Message Pricing (Approximate):**
  - Marketing conversations: R$0.05 - R$0.10 per conversation
  - Utility conversations: R$0.02 - R$0.05 per conversation
  - Authentication: R$0.01 - R$0.03 per conversation
  - (Pricing subject to Meta's current rates, varies by country)

---

## 11. Recommended Next Steps

### Immediate Actions (Week 1-2)

1. **Stakeholder Alignment:**
   - Review this brief with Cartão de Todos leadership
   - Confirm business priorities and success metrics
   - Get approval on MVP feature scope and budget

2. **Technical Setup:**
   - Create Meta Business Manager account
   - Apply for Meta Business Verification (2-5 days processing)
   - Set up WhatsApp Business Account (WABA)
   - Register phone number for API access

3. **Project Planning:**
   - Finalize technology stack decisions
   - Create detailed user stories and acceptance criteria
   - Set up project management tools (Jira, Linear, or GitHub Projects)
   - Establish sprint schedule (recommend 2-week sprints)

### Phase 1: MVP Development (Week 3-10)

**Sprint 1-2: Foundation (Weeks 3-6)**
- Project scaffolding and development environment setup
- Database schema design and initial migration
- Meta API authentication implementation
- Basic admin authentication system

**Sprint 3-4: Core Features (Weeks 7-10)**
- Template library UI (list, search, filter)
- Template creation form with validation
- Meta API integration for template submission
- Single-message sending flow

**Sprint 5: Polish & Launch (Weeks 11-12)**
- Brazilian Portuguese localization review
- User acceptance testing with franchise staff
- Performance optimization and security audit
- Production deployment and monitoring setup

### Phase 2: User Onboarding & Feedback (Week 13-16)

- Conduct training sessions with franchise administrators
- Create video tutorial library
- Gather user feedback through surveys and interviews
- Prioritize Phase 2 features based on actual usage patterns

---

## 12. Research Sources & References

### Market Research Sources:
- G2 WhatsApp API Alternatives (2026)
- Respond.io WhatsApp API Provider Comparison
- YourGPT WhatsApp Business API Solutions Guide
- Infobip Best Practices Documentation

### Meta Official Documentation:
- WhatsApp Business Platform Developer Hub
- Meta Business Messaging Templates Documentation
- WhatsApp Cloud API Postman Collection
- Meta Business Management API Getting Started

### Security & Compliance:
- LGPD Official Text (Lei nº 13.709/2018)
- OWASP Top 10 Web Security Risks
- WhatsApp Business Security Best Practices
- Meta Two-Factor Authentication Requirements

### UX Research:
- Figma Brazilian Portuguese Localization Announcement
- UX Latin America Growth Study
- Brazilian Software Localization Guidelines
- Admin Dashboard Design Patterns (2026 Trends)

---

## 13. Appendices

### Appendix A: Glossary

- **WABA:** WhatsApp Business Account - The business entity in Meta's system
- **BSP:** Business Solution Provider - Meta-approved partners offering WhatsApp API
- **HSM:** Highly Structured Messages - Legacy term for message templates
- **Template:** Pre-approved message format required for business-initiated messages
- **Conversation:** 24-hour messaging window (charged by Meta)
- **System User:** Meta's authentication method for programmatic API access
- **LGPD:** Lei Geral de Proteção de Dados - Brazil's data protection law

### Appendix B: Meta Template Categories Explained

| Category | Purpose | Opt-Out Required | Validity Period |
|----------|---------|------------------|-----------------|
| **Marketing** | Promotions, offers, announcements | Yes (mandatory) | 12hrs - 30 days |
| **Utility** | Account updates, order tracking, reminders | No | 30sec - 12 hours |
| **Authentication** | OTP codes, login verification | No | 30sec - 10 minutes |

### Appendix C: Sample Templates for Cartão de Todos

**1. Marketing - New Partner Announcement:**
```
Olá {{1}}! 🎉

Nova parceria na sua região: {{2}} agora aceita o Cartão de Todos!

Aproveite {{3}}% de desconto em sua primeira compra.

Visite: https://www.cartaodetodos.com.br/parceiros/{{4}}

Cartão de Todos - Cuidando de você e sua família
Responda PARAR para não receber mais ofertas
```

**2. Utility - Card Expiration Reminder:**
```
Olá {{1}},

Seu Cartão de Todos vence em {{2}} dias ({{3}}).

Renove agora para continuar aproveitando seus benefícios em mais de 12.000 estabelecimentos.

Renovar: https://www.cartaodetodos.com.br/renovar

Dúvidas? Responda esta mensagem.
```

**3. Authentication - Login Verification:**
```
Seu código de verificação do Cartão de Todos é:

{{1}}

Válido por 10 minutos. Não compartilhe este código.
```

---

## Document Control

**Version:** 1.0
**Date:** 2026-03-10
**Author:** Atlas (Business Analyst Agent) - Synkra AIOS
**Reviewed By:** Pending - Orion (Master Orchestrator)
**Next Review:** After stakeholder feedback
**Status:** Draft - Awaiting Approval

**Change Log:**
- 2026-03-10: Initial project brief created based on market research and competitive analysis

---

**For questions or feedback on this project brief, contact the project stakeholders or refer to the PRD document that will be created by Morgan (PM) based on these findings.**
