# Product Requirements Document (PRD)
# Meta WhatsApp Business API Messaging Platform
**Cartão de Todos - Admin Messaging Interface**

---

## Document Control

**Version:** 1.0
**Date:** 2026-03-10
**Product Manager:** Morgan (AIOS PM Agent)
**Status:** Final - Ready for Architecture & Design
**Based on Research by:** Atlas (Business Analyst Agent)

**Stakeholders:**
- Cartão de Todos Leadership Team
- Franchise Operations Managers
- Marketing and Communications Team
- Customer Support Specialists
- IT/System Administrators

---

## Executive Summary

This Product Requirements Document outlines the comprehensive specifications for building a WhatsApp Business API messaging platform for Cartão de Todos, Brazil's largest healthcare discount card franchise with over 12,000 partner establishments.

The platform will enable non-technical staff to manage and send WhatsApp message templates through Meta's official WhatsApp Business Platform API, streamlining franchise operations while maintaining strict compliance with Meta's policies and Brazilian data protection regulations (LGPD).

**Strategic Goals:**
- Eliminate technical barriers to WhatsApp Business API usage
- Reduce IT dependency by 80% through self-service template management
- Enable same-day campaign launches (vs. current 2-3 day delays)
- Maintain 95%+ compliance with Meta quality standards
- Provide brand-aligned, accessible experience in Brazilian Portuguese

**Investment:**
- MVP Budget: R$118,000 (6-8 weeks development)
- Monthly Infrastructure: R$1,000 - R$3,400
- Expected ROI: 20+ staff hours saved per week, 30% increase in campaign frequency

---

## Table of Contents

1. [Problem Statement](#1-problem-statement)
2. [Goals & Success Metrics](#2-goals--success-metrics)
3. [User Personas](#3-user-personas)
4. [Feature Requirements](#4-feature-requirements)
5. [Technical Constraints](#5-technical-constraints)
6. [Design Requirements](#6-design-requirements)
7. [Timeline & Milestones](#7-timeline--milestones)
8. [Risks & Mitigations](#8-risks--mitigations)
9. [Dependencies](#9-dependencies)
10. [Appendices](#10-appendices)

---

## 1. Problem Statement

### 1.1 Core Problems

**Problem 1: Technical Complexity Barrier**
Meta's WhatsApp Business API requires developer expertise, OAuth flows, webhook configuration, and comprehensive API documentation comprehension. Franchise staff cannot leverage WhatsApp Business capabilities without continuous external developer support, creating operational bottlenecks and delays.

**Problem 2: Template Management Chaos**
Templates are scattered across documentation with no centralized repository, making it difficult to track approval status, maintain version control, or ensure consistency. This results in duplicated effort, inconsistent brand messaging, compliance risks, and significant time wasted searching for appropriate templates.

**Problem 3: Non-Technical User Barriers**
Existing platforms (Twilio, Infobip, Wati) are designed for developers with steep learning curves and overwhelming feature sets. Marketing and support teams are dependent on IT for basic operations, causing slow campaign execution and missed business opportunities.

**Problem 4: Compliance and Quality Management**
It's easy to unknowingly violate Meta's template policies, template quality ratings are opaque, and there's no guidance on improving rejected templates. This puts accounts at risk of suspension and degrades customer experience through poor-quality messages.

**Problem 5: Brazilian Market Localization Gap**
Most platforms have poor or no Portuguese localization, unfamiliar UI patterns for Brazilian users, and USD pricing. This creates adoption resistance, errors from language misunderstandings, and the perception of using a "foreign" tool not designed for the Brazilian market.

### 1.2 Business Impact

**Current State (Without Platform):**
- 4-6 hours per week coordinating with IT for template changes
- 2-3 day delay for campaign launches due to approval bottlenecks
- 15-20% of staff time wasted searching for correct templates
- Higher risk of Meta policy violations and account suspension
- Missed revenue opportunities from delayed or canceled campaigns

**Desired State (With Platform):**
- Self-service template management (80% reduction in IT dependency)
- Same-day campaign launches
- 5-minute average template search and send time
- Automated compliance validation (95% reduction in policy violations)
- 30% increase in WhatsApp campaign frequency and reach

---

## 2. Goals & Success Metrics

### 2.1 Product Objectives

**Primary Objective:**
Enable Cartão de Todos franchise staff to independently manage and send WhatsApp Business messages through Meta's official API without technical expertise.

**Secondary Objectives:**
1. Maintain 100% compliance with Meta WhatsApp Business Platform policies
2. Provide exceptional user experience tailored to Brazilian market expectations
3. Reduce operational costs through automation and self-service
4. Enable data-driven decision making through analytics and reporting
5. Establish foundation for future advanced messaging features

### 2.2 Key Performance Indicators (KPIs)

#### User Adoption Metrics
- **Active Users Per Week:** Target 80% of franchise staff within 3 months
- **Time to First Template Sent:** < 10 minutes from initial login
- **User Login Frequency:** Daily usage for 60% of users
- **Feature Adoption Rate:** Percentage of users utilizing each major feature
- **User Satisfaction Score:** NPS > 50, CSAT > 4/5

#### Operational Efficiency Metrics
- **Template Management:**
  - Average time to create and submit template: < 5 minutes
  - Template approval rate: >90% first-time approval
  - Template library search time: < 30 seconds
- **Message Sending:**
  - Time from template selection to message sent: < 2 minutes
  - Messages sent per user per week: Establish baseline in month 1
  - Failed message rate: < 2%
  - Task completion rate: > 90% for primary flows

#### Business Impact Metrics
- **Cost Savings:**
  - Reduction in IT support tickets for WhatsApp: 80% reduction
  - Staff hours saved per week: 20+ hours franchise-wide
- **Campaign Performance:**
  - Campaign launch time: Same-day vs. current 2-3 days
  - Message delivery rate: >95%
  - Customer engagement rate: >40% read rate
- **Compliance:**
  - Template policy violation incidents: 0 per quarter
  - Template pause/disable events: < 5% of templates
  - Quality rating distribution: >80% High/Medium quality

#### Technical Performance Metrics
- **System Reliability:**
  - Platform uptime: 99.5%
  - API error rate: < 1%
  - Average page load time: < 2 seconds
  - API response time: p95 < 2s, p99 < 5s
- **Security:**
  - Failed authentication attempts: Monitor for brute force
  - Unauthorized access attempts: 0
  - Time to patch security vulnerabilities: < 48 hours
  - Security incidents: 0

---

## 3. User Personas

### Persona 1: Franchise Administrator (Primary User)
**Name:** Carla Santos
**Age:** 38
**Role:** Franchise Operations Manager
**Technical Proficiency:** Medium (comfortable with basic software, not a developer)

**Background:**
Carla manages day-to-day franchise operations and is responsible for coordinating customer communications across multiple channels. She has used WhatsApp Business App but has never worked with APIs or developer tools.

**Goals:**
- Manage WhatsApp message templates for franchise communications
- Send promotional campaigns to customer segments efficiently
- Track message delivery and engagement metrics
- Ensure compliance with Meta's template policies without legal expertise

**Pain Points:**
- Overwhelmed by technical API documentation and jargon
- Fears making mistakes that could disable templates or violate Meta policies
- Needs quick access to pre-approved templates for time-sensitive campaigns
- Struggles with platforms that require technical knowledge or developer support

**Behavioral Traits:**
- Prefers visual interfaces over code/text configuration
- Values clear status indicators and confirmation messages
- Needs guidance (tooltips, help text) throughout workflows
- Works primarily on desktop but checks mobile during off-hours
- Detail-oriented and risk-averse when it comes to compliance

**Success Criteria:**
- Can create and send a template message in under 3 minutes
- Understands template status without reading documentation
- Feels confident the platform prevents compliance violations
- Can troubleshoot basic issues without IT support

**Quote:** "I just want to send messages to our customers without worrying about breaking something or getting our account suspended."

---

### Persona 2: Marketing Coordinator (Secondary User)
**Name:** Bruno Oliveira
**Age:** 29
**Role:** Marketing and Communications Coordinator
**Technical Proficiency:** Medium-High (familiar with marketing automation tools)

**Background:**
Bruno creates marketing campaigns, manages social media, and analyzes customer engagement metrics. He's comfortable with marketing tools like RD Station and Google Analytics but has limited programming knowledge.

**Goals:**
- Create compelling message campaigns aligned with Cartão de Todos brand voice
- A/B test different message templates for engagement optimization
- Analyze campaign performance metrics to justify ROI to management
- Coordinate with design team on media-rich templates

**Pain Points:**
- Limited by character counts and Meta's template restrictions
- Difficulty previewing how messages appear on different devices
- Wants creative freedom but constrained by approval process
- Needs to justify ROI of WhatsApp campaigns with concrete data

**Behavioral Traits:**
- Detail-oriented, focuses on copy quality and brand consistency
- Data-driven, wants analytics and reporting capabilities
- Collaborative, shares templates with team members
- Mobile-first mindset (tests everything on mobile devices)
- Creative and experimental with messaging approaches

**Success Criteria:**
- Can design visually appealing templates within Meta guidelines
- Understands why templates get rejected and how to fix them
- Can export campaign performance data for management reports
- Can iterate on message templates based on performance data

**Quote:** "I need to prove that WhatsApp campaigns drive results, not just send messages and hope for the best."

---

### Persona 3: Customer Support Agent (Tertiary User)
**Name:** Patricia Lima
**Age:** 25
**Role:** Customer Support Specialist
**Technical Proficiency:** Low-Medium (uses support software daily, minimal tech experience)

**Background:**
Patricia handles customer inquiries via phone, email, and WhatsApp. She follows established scripts and procedures, needing quick access to information during active customer conversations.

**Goals:**
- Send quick, pre-approved responses to common customer inquiries
- Access template library during active customer conversations
- Personalize messages with customer-specific information (name, card number, etc.)
- Maintain fast response times expected by WhatsApp users

**Pain Points:**
- Needs speed - customers expect instant WhatsApp responses
- Limited authority to modify templates (must use pre-approved content)
- Overwhelmed by too many template options without clear organization
- Worried about sending wrong template to customer (compliance risk)

**Behavioral Traits:**
- Task-focused, follows established workflows and procedures
- Prefers simple, minimal interfaces without complexity
- Relies on search and favorites to find templates quickly
- Primarily works on desktop with WhatsApp Web open side-by-side
- Values reliability and consistency over advanced features

**Success Criteria:**
- Can find and send correct template in under 30 seconds
- Templates are organized by customer inquiry type
- Personalization fields are clearly marked and validated
- Can handle multiple customer conversations simultaneously

**Quote:** "When a customer messages me, I need to respond immediately with the right information - I can't spend time searching through hundreds of templates."

---

### Persona 4: System Administrator (Technical Owner)
**Name:** Rafael Costa
**Age:** 35
**Role:** IT Coordinator / System Administrator
**Technical Proficiency:** High (full-stack developer, API integration experience)

**Background:**
Rafael manages IT infrastructure for Cartão de Todos, including security, integrations, and technical configurations. He has experience with APIs, databases, and cloud platforms.

**Goals:**
- Configure Meta API integration and maintain authentication
- Set up user roles and permissions (RBAC) for future expansion
- Monitor system health and API quota limits to prevent service disruptions
- Troubleshoot template approval failures and API errors efficiently

**Pain Points:**
- Manual authentication token refresh is error-prone and time-consuming
- No centralized logging for debugging production issues
- Needs to balance security requirements with user convenience
- Concerns about API rate limits during high-volume campaigns

**Behavioral Traits:**
- Security-first mindset, prioritizes data protection and compliance
- Values clear error messages and debugging tools
- Prefers automated processes over manual intervention
- Documents everything for knowledge transfer and disaster recovery
- Proactive about monitoring and preventing issues

**Success Criteria:**
- Can set up the platform and integrate with Meta API in under 2 hours
- Has visibility into API health, usage quotas, and error logs
- Can grant/revoke user access without modifying code
- Receives alerts before quota limits or token expiration

**Quote:** "I need a platform that's secure by design and gives me visibility into what's happening under the hood without requiring constant babysitting."

---

## 4. Feature Requirements

### Epic 1: Foundation & Authentication
**Priority:** MUST HAVE (MVP - Phase 1)
**Business Value:** Security foundation for all platform operations
**Estimated Effort:** 1-2 sprints
**Dependencies:** None

**Description:**
Establish secure admin access and credential management system as the foundation for all platform operations. This epic provides the security layer that protects sensitive Meta API credentials and ensures only authorized users can access the platform.

#### Story 1.1: Admin Authentication System
**As an** admin,
**I want** to log in with a secure password,
**So that** only authorized personnel can access the messaging platform and protect our Meta API credentials.

**Acceptance Criteria:**
- [ ] Login page with username and password fields
- [ ] Default password is "100101" (must be changed on first login)
- [ ] Password requirements enforced: minimum 8 characters, alphanumeric + special characters
- [ ] Account lockout after 5 failed attempts for 15 minutes
- [ ] Session management with JWT tokens, 8-hour expiration
- [ ] Secure httpOnly cookies to prevent XSS attacks
- [ ] "Remember me" option for trusted devices (30-day session)
- [ ] Clear error messages for failed login attempts
- [ ] Password visibility toggle (eye icon)

**Technical Notes:**
- Use bcrypt for password hashing (cost factor 10)
- Store JWT secret in environment variables
- Implement refresh token mechanism for session extension

---

#### Story 1.2: Force Password Change on First Login
**As an** admin,
**I want** to be forced to change the default password on my first login,
**So that** the platform is secured with a unique password only I know.

**Acceptance Criteria:**
- [ ] Detect first login (never logged in before flag)
- [ ] Redirect to password change screen before accessing dashboard
- [ ] Cannot skip or bypass password change
- [ ] New password validation: different from default, meets complexity requirements
- [ ] Confirmation step: "Type new password again"
- [ ] Success message after password changed
- [ ] Automatic login after successful password change

---

#### Story 1.3: Meta API Credentials Management
**As an** admin,
**I want** to securely configure Meta API credentials in a protected settings section,
**So that** the platform can connect to WhatsApp Business API on my behalf.

**Acceptance Criteria:**
- [ ] Settings page accessible only after authentication
- [ ] Form fields for:
  - WhatsApp Business Account ID (WABA ID)
  - Phone Number ID
  - System User Access Token
  - Business Manager ID (optional)
- [ ] Access token field masked by default (show/hide toggle)
- [ ] "Test Connection" button to validate credentials
- [ ] Clear success/error feedback for connection test
- [ ] Credentials encrypted at rest using AES-256
- [ ] Audit log entry when credentials are updated
- [ ] Warning message before overwriting existing credentials

**Technical Notes:**
- Store encrypted credentials in secure database table
- Use environment variable for encryption key (never commit to git)
- Validate token format before saving

---

#### Story 1.4: Credential Validation and API Connectivity Test
**As an** admin,
**I want** to validate my Meta API credentials before saving them,
**So that** I know immediately if there's a configuration problem.

**Acceptance Criteria:**
- [ ] "Test Connection" button triggers API call to Meta
- [ ] Test makes GET request to `/v18.0/{phone-number-id}` endpoint
- [ ] Display loading state during validation
- [ ] Success state shows:
  - Green checkmark icon
  - "Connection successful"
  - Display name from Meta account
  - Phone number and verification status
- [ ] Error state shows:
  - Red X icon
  - Specific error message from Meta API
  - Troubleshooting suggestions
- [ ] Cannot save credentials without successful validation
- [ ] Validation result persists until credentials are changed

**Technical Notes:**
- Implement proper error handling for network failures
- Parse Meta API error responses for user-friendly messages

---

#### Story 1.5: Session Management and Auto-Logout
**As a** system,
**I need** to manage user sessions securely with automatic expiration,
**So that** inactive sessions don't pose a security risk.

**Acceptance Criteria:**
- [ ] Session expires after 8 hours of inactivity
- [ ] Display countdown warning 5 minutes before expiration
- [ ] "Extend Session" button in warning dialog
- [ ] Auto-logout redirects to login page
- [ ] "Your session has expired" message on login page
- [ ] Automatic session extension on user activity (API calls, clicks)
- [ ] Logout button in navigation clears session
- [ ] Protected routes redirect to login if no valid session

**Technical Notes:**
- Use sliding window for session expiration
- Clear all local storage and cookies on logout

---

### Epic 2: Meta API Integration
**Priority:** MUST HAVE (MVP - Phase 1)
**Business Value:** Core platform functionality - enables message dispatch
**Estimated Effort:** 2-3 sprints
**Dependencies:** Epic 1 (Authentication and credentials must be configured)

**Description:**
Integrate with Meta's WhatsApp Business API for template retrieval and message sending capabilities. This epic implements the core business logic that connects our platform to Meta's infrastructure.

#### Story 2.1: Meta API Authentication Layer
**As a** system,
**I need** to authenticate with Meta API using configured credentials automatically,
**So that** all API requests are properly authorized.

**Acceptance Criteria:**
- [ ] Retrieve stored access token from encrypted database
- [ ] Add authentication header to all Meta API requests
- [ ] Format: `Authorization: Bearer {access_token}`
- [ ] Handle token expiration errors (HTTP 401)
- [ ] Alert admin if token is expired or invalid
- [ ] Retry failed requests once after token refresh
- [ ] Log all API authentication attempts for audit

**Technical Notes:**
- Implement API client class with authentication middleware
- Cache decrypted token in memory for request duration

---

#### Story 2.2: Fetch Available Message Templates
**As a** user,
**I want** the system to automatically fetch all available templates from Meta API,
**So that** I can see which templates are approved and ready to use.

**Acceptance Criteria:**
- [ ] On dashboard load, fetch templates from Meta API
- [ ] API endpoint: `GET /v18.0/{whatsapp-business-account-id}/message_templates`
- [ ] Display loading state during fetch
- [ ] Parse and store template data:
  - Template name
  - Language code
  - Category (MARKETING, UTILITY, AUTHENTICATION)
  - Status (APPROVED, PENDING, REJECTED, PAUSED, DISABLED)
  - Components (HEADER, BODY, FOOTER, BUTTONS)
  - Quality score
- [ ] Handle pagination if >100 templates
- [ ] Display error message if fetch fails
- [ ] Cache templates for 5 minutes to reduce API calls
- [ ] Manual "Refresh Templates" button

**Technical Notes:**
- Implement pagination logic for large template libraries
- Store templates in database with last_synced timestamp

---

#### Story 2.3: Template Details Display
**As a** user,
**I want** to see detailed information about each template,
**So that** I can understand what parameters it requires and how it will appear.

**Acceptance Criteria:**
- [ ] Template card displays:
  - Template name
  - Status badge (color-coded)
  - Category label
  - Language code
  - Quality rating (stars)
  - Created date
  - Usage count (if available)
  - Preview text (first 100 characters)
- [ ] Click template card to view full details modal
- [ ] Modal shows:
  - Complete template structure
  - All components (header, body, footer, buttons)
  - Variable placeholders highlighted ({{1}}, {{2}}, etc.)
  - Required parameters list
  - Example values from Meta
  - Character counts for each section
- [ ] Mobile-responsive card layout

**Status Badge Colors:**
- APPROVED: Green (#00A988)
- PENDING: Yellow (#F59E0B)
- REJECTED: Red (#EF4444)
- PAUSED: Orange (#F97316)
- DISABLED: Gray (#6B7280)

---

#### Story 2.4: Send Message via Meta API
**As a** user,
**I want** to send a WhatsApp message using an approved template,
**So that** I can communicate with customers through the official Meta API.

**Acceptance Criteria:**
- [ ] API endpoint: `POST /v18.0/{phone-number-id}/messages`
- [ ] Request payload includes:
  - messaging_product: "whatsapp"
  - recipient_type: "individual"
  - to: recipient phone number (with country code)
  - type: "template"
  - template name and language
  - template parameters filled with user input
- [ ] Validate phone number format before sending
- [ ] Display loading state during send operation
- [ ] Handle successful response:
  - Extract message ID from Meta response
  - Show success notification
  - Log message send event
- [ ] Handle error responses:
  - Display user-friendly error message
  - Log error details for debugging
  - Provide retry option
- [ ] Rate limiting: prevent duplicate sends within 2 seconds

**Technical Notes:**
- Phone number validation: country code + 10-15 digits
- Implement idempotency key to prevent duplicate sends

---

#### Story 2.5: Message Delivery Status Tracking
**As a** user,
**I want** to see real-time delivery status of sent messages,
**So that** I know whether my message reached the recipient.

**Acceptance Criteria:**
- [ ] Display message status in sent messages list:
  - QUEUED: Message accepted by Meta
  - SENT: Delivered to WhatsApp server
  - DELIVERED: Received by recipient's device
  - READ: Opened by recipient
  - FAILED: Delivery error
- [ ] Status icons and colors:
  - QUEUED: Clock icon, gray
  - SENT: Single checkmark, gray
  - DELIVERED: Double checkmark, gray
  - READ: Double checkmark, blue
  - FAILED: X icon, red
- [ ] Timestamp for each status change
- [ ] Error details for failed messages
- [ ] Auto-refresh status every 10 seconds
- [ ] Manual refresh button

**Technical Notes:**
- Implement webhook endpoint for status updates (Story 2.7)
- Poll API for status if webhooks not configured

---

#### Story 2.6: API Rate Limiting Handler
**As a** system,
**I need** to handle Meta API rate limits gracefully,
**So that** the platform remains functional during high-volume usage.

**Acceptance Criteria:**
- [ ] Monitor rate limit headers from Meta API:
  - X-Business-Use-Case-Usage
  - X-App-Usage
- [ ] Display rate limit usage in admin dashboard
- [ ] When approaching limit (>80%):
  - Show warning notification
  - Throttle new requests
  - Queue messages for delayed sending
- [ ] When limit exceeded (HTTP 429):
  - Display user-friendly error message
  - Show estimated time until reset
  - Queue message for automatic retry
- [ ] Log all rate limit events

**Meta API Rate Limits:**
- 80 requests per second (Cloud API)
- Messaging tier limits (Tier 1: 1K/day, Tier 2: 10K/day, Tier 3: 100K/day, Tier 4: unlimited)

**Technical Notes:**
- Implement exponential backoff for retries
- Use Redis for distributed rate limiting if scaling horizontally

---

#### Story 2.7: API Interaction Audit Logging
**As a** system,
**I need** to log all Meta API interactions,
**So that** administrators can audit activity and debug issues.

**Acceptance Criteria:**
- [ ] Log entry for every API request:
  - Timestamp
  - API endpoint
  - HTTP method
  - Request parameters (sanitized, no sensitive data)
  - Response status code
  - Response time (ms)
  - User who initiated request
  - Success or error status
- [ ] Admin can view logs in settings section
- [ ] Filter logs by:
  - Date range
  - API endpoint
  - Status (success/error)
  - User
- [ ] Export logs as CSV
- [ ] Retention: 90 days
- [ ] Log rotation to prevent database bloat

**Technical Notes:**
- Use structured logging (JSON format)
- Consider external logging service (e.g., Winston, Pino)

---

### Epic 3: Template Management & Browsing
**Priority:** MUST HAVE (MVP - Phase 1)
**Business Value:** User efficiency - simplified message composition
**Estimated Effort:** 2 sprints
**Dependencies:** Epic 2 (Templates must be fetched from Meta API)

**Description:**
Provide intuitive interface for browsing, searching, and selecting message templates. This epic focuses on user experience for template discovery and organization.

#### Story 3.1: Template Library Grid View
**As a** user,
**I want** to browse all available templates in an organized grid view,
**So that** I can quickly scan options and find the template I need.

**Acceptance Criteria:**
- [ ] Display templates as cards in responsive grid:
  - 1 column on mobile (<768px)
  - 2 columns on tablet (768px-1023px)
  - 3 columns on desktop (1024px-1439px)
  - 4 columns on wide screens (≥1440px)
- [ ] Each card shows:
  - Template name
  - Status badge (top-right corner)
  - Category icon and label
  - Language code (pt_BR badge)
  - Preview text (first 80 characters)
  - Quality rating (stars)
  - Usage count
  - Action buttons (Send, Edit, Duplicate)
- [ ] Hover effects on cards (subtle shadow, scale)
- [ ] Cards are sorted by:
  - Default: Recently used
  - Options: Name (A-Z), Status, Category, Date created
- [ ] Empty state message if no templates
- [ ] Loading skeleton while fetching templates

---

#### Story 3.2: Template Search Functionality
**As a** user,
**I want** to search templates by name or content,
**So that** I can quickly find specific templates without scrolling.

**Acceptance Criteria:**
- [ ] Search input field at top of template library
- [ ] Placeholder text: "Buscar templates por nome ou conteúdo..."
- [ ] Real-time search with 300ms debounce
- [ ] Search matches against:
  - Template name
  - Body text content
  - Category
  - Variables/parameters
- [ ] Case-insensitive search
- [ ] Display number of results found
- [ ] Highlight search term in results
- [ ] Clear search button (X icon)
- [ ] Empty state if no search results: "Nenhum template encontrado para '{query}'"
- [ ] Search persists in URL query parameter for sharing

**Technical Notes:**
- Use fuzzy search for typo tolerance (e.g., Fuse.js)
- Index template content for faster search

---

#### Story 3.3: Template Filtering by Status and Category
**As a** user,
**I want** to filter templates by status and category,
**So that** I can focus on specific types of templates.

**Acceptance Criteria:**
- [ ] Filter dropdown/chips above template grid
- [ ] Status filter options:
  - All Statuses
  - ✅ Approved (show count)
  - ⏳ Pending (show count)
  - ❌ Rejected (show count)
  - ⏸️ Paused (show count)
  - 🚫 Disabled (show count)
- [ ] Category filter options:
  - All Categories
  - Marketing
  - Utility
  - Authentication
- [ ] Language filter (if multi-language):
  - pt_BR (default)
  - es, en (future)
- [ ] Multiple filters can be active simultaneously
- [ ] Display active filter badges with remove option
- [ ] Filter state persists in URL
- [ ] Update template count in real-time as filters change

---

#### Story 3.4: Template Detail Modal
**As a** user,
**I want** to view complete template details in a modal,
**So that** I can understand the full structure before using it.

**Acceptance Criteria:**
- [ ] Click template card opens modal overlay
- [ ] Modal contains:
  - **Header section:**
    - Template name
    - Status badge
    - Quality rating
    - Category and language
    - Created date
  - **Preview section:**
    - Mobile phone mockup showing WhatsApp message
    - Rendered with sample data
    - Header (image/text/video if applicable)
    - Body text with highlighted variables
    - Footer text
    - Button(s) if present
  - **Details section:**
    - Complete component breakdown
    - Variable list with examples
    - Character counts for each section
    - Template rules and restrictions
  - **Actions:**
    - "Use Template" button (primary, green)
    - "Duplicate" button (secondary)
    - "Close" button
- [ ] Modal is keyboard accessible (ESC to close)
- [ ] Mobile-responsive modal (full-screen on mobile)
- [ ] Background overlay darkens page

---

#### Story 3.5: Template Preview with Sample Data
**As a** user,
**I want** to see how a template looks with sample data,
**So that** I can visualize the final message before sending.

**Acceptance Criteria:**
- [ ] Preview displays in WhatsApp-style message bubble
- [ ] Use example data from Meta template definition
- [ ] Mobile phone frame (iPhone/Android mockup)
- [ ] Correctly render:
  - Header images/videos (thumbnail)
  - Body text with variable substitution
  - Footer text (grayed out)
  - Action buttons (with URL preview)
- [ ] Character limits respected (truncate if exceeded)
- [ ] Emoji rendering (Unicode support)
- [ ] Brazilian Portuguese date/time format in examples
- [ ] Real-time preview update if user edits parameters

**WhatsApp Message Styling:**
- Green bubble background (#DCF8C6)
- System font (similar to WhatsApp)
- Timestamp (grayed, small)
- Sender name (Cartão de Todos)

---

#### Story 3.6: Recently Used Templates Quick Access
**As a** user,
**I want** to see my recently used templates first,
**So that** I can quickly reuse common templates without searching.

**Acceptance Criteria:**
- [ ] "Recently Used" section at top of template library
- [ ] Show last 6 templates used by current user
- [ ] Horizontal scrollable carousel on desktop
- [ ] Smaller card format (compact view)
- [ ] Timestamp: "Used 2 hours ago", "Used yesterday", etc.
- [ ] Click card to immediately use template
- [ ] If no recent templates: Show "Favorites" or "Popular" instead
- [ ] Recently used list is user-specific (not global)

---

#### Story 3.7: Template Library Performance Optimization
**As a** system,
**I need** to optimize template library loading and rendering,
**So that** the interface remains fast even with hundreds of templates.

**Acceptance Criteria:**
- [ ] Implement virtual scrolling for >100 templates
- [ ] Lazy load template preview images
- [ ] Prefetch templates on page load (background)
- [ ] Cache template data in browser for 5 minutes
- [ ] Paginate API requests (50 templates per page)
- [ ] Show "Load More" button or infinite scroll
- [ ] Measure and display performance metrics in dev mode:
  - Time to first render
  - Total templates loaded
  - API response time
- [ ] Lighthouse performance score > 90

**Technical Notes:**
- Use React.memo or similar for component optimization
- Implement code splitting for template detail modal

---

### Epic 4: Message Dispatch Interface
**Priority:** MUST HAVE (MVP - Phase 1)
**Business Value:** Primary user workflow - message sending
**Estimated Effort:** 2-3 sprints
**Dependencies:** Epic 2 (API integration), Epic 3 (Template browsing)

**Description:**
Create streamlined, user-friendly interface for composing and sending WhatsApp messages. This epic delivers the core value proposition: enabling non-technical users to send messages.

#### Story 4.1: Recipient Phone Number Input
**As a** user,
**I want** to enter a recipient's phone number with validation,
**So that** I know the message will be delivered to the correct person.

**Acceptance Criteria:**
- [ ] Input field labeled "Número do WhatsApp do destinatário"
- [ ] Phone number format: +55 (XX) XXXXX-XXXX
- [ ] Auto-formatting as user types
- [ ] Country code dropdown (default: +55 Brazil)
- [ ] Real-time validation:
  - Must start with country code
  - Brazil: 10-11 digits after country code
  - Display green checkmark when valid
  - Display red X with error message when invalid
- [ ] Error messages:
  - "Número incompleto" (incomplete)
  - "Formato inválido" (invalid format)
  - "Código de país obrigatório" (missing country code)
- [ ] Paste detection: auto-format pasted numbers
- [ ] Remove all non-numeric characters except +
- [ ] Focus state with clear visual indicator

**Technical Notes:**
- Use libphonenumber-js for international validation
- Store phone number in E.164 format (e.g., +5511999999999)

---

#### Story 4.2: Template Selection Step
**As a** user,
**I want** to select a template from a focused view,
**So that** I can choose the right message format for my communication.

**Acceptance Criteria:**
- [ ] Step 1 in message sending wizard
- [ ] Display approved templates only
- [ ] Filter options:
  - All Categories
  - Marketing
  - Utility
  - Authentication
- [ ] Search bar: "Buscar template..."
- [ ] Template cards show:
  - Name
  - Category badge
  - Preview (first 60 chars)
  - "Usar este template" button
- [ ] Recently used templates highlighted at top
- [ ] Favorites marked with star icon
- [ ] Click template card OR "Usar este template" to proceed
- [ ] Disabled state for paused/disabled templates with tooltip
- [ ] "Back" button to return to dashboard

---

#### Story 4.3: Template Parameter Input Form
**As a** user,
**I want** to fill in template parameters with clear guidance,
**So that** I can personalize the message for the recipient.

**Acceptance Criteria:**
- [ ] Step 2 in message sending wizard
- [ ] Display selected template name and preview at top
- [ ] For each variable ({{1}}, {{2}}, etc.):
  - Input field with label
  - Label describes parameter (e.g., "Nome do cliente" for {{1}})
  - Placeholder with example value
  - Character count if applicable
  - Required field indicator (*)
- [ ] Real-time preview update as user types
- [ ] Validation:
  - Required fields cannot be empty
  - Character limits enforced
  - Special character warnings (if any)
- [ ] "Clear All" button to reset form
- [ ] "Back" button to change template
- [ ] "Next: Preview" button (disabled until all required fields valid)

**Example:**
```
Template: "Olá {{1}}, aproveite {{2}}% de desconto!"

Form:
[Nome do cliente*]
Placeholder: João Silva

[Percentual de desconto*]
Placeholder: 20
```

---

#### Story 4.4: Message Preview and Confirmation
**As a** user,
**I want** to preview the complete message before sending,
**So that** I can verify everything is correct and avoid mistakes.

**Acceptance Criteria:**
- [ ] Step 3 in message sending wizard
- [ ] Display complete message in WhatsApp-style preview:
  - Mobile phone mockup
  - Sender: "Cartão de Todos"
  - Message bubble with final text
  - All variables replaced with actual values
  - Header image (if applicable)
  - Footer text
  - Action buttons
- [ ] Show recipient details:
  - Phone number: +55 (11) 99999-9999
  - "Edit" link to change recipient
- [ ] Summary card:
  - Template name
  - Category
  - Total characters
  - Estimated delivery time
- [ ] "Edit Message" button to go back to Step 2
- [ ] "Send Message" button (primary, large, green)
- [ ] Loading state while sending
- [ ] Confirmation checkbox (optional):
  - "Confirmo que o destinatário autorizou receber esta mensagem"

---

#### Story 4.5: Send Message Action
**As a** user,
**I want** to send the message with one click,
**So that** the recipient receives my WhatsApp message immediately.

**Acceptance Criteria:**
- [ ] "Enviar Mensagem" button triggers send
- [ ] Display loading modal:
  - "Enviando mensagem..."
  - Animated spinner
  - "Aguarde, isso pode levar alguns segundos"
- [ ] Call Meta API (Story 2.4)
- [ ] Success state:
  - Green checkmark animation
  - "Mensagem enviada com sucesso! ✅"
  - Message ID from Meta
  - Delivery status: "Enviada"
  - Actions:
    - "Enviar outra mensagem" (primary)
    - "Ver histórico" (secondary)
    - "Voltar ao início"
- [ ] Error state:
  - Red X animation
  - "Falha ao enviar mensagem"
  - Error details from Meta API
  - Troubleshooting suggestions
  - Actions:
    - "Tentar novamente" (primary)
    - "Voltar e editar" (secondary)
    - "Cancelar"
- [ ] Log send event with metadata

---

#### Story 4.6: Message History and Logs
**As a** user,
**I want** to view a history of all messages I've sent,
**So that** I can track my communications and verify deliveries.

**Acceptance Criteria:**
- [ ] "Histórico" page accessible from navigation
- [ ] Display sent messages in reverse chronological order (newest first)
- [ ] Each entry shows:
  - Recipient phone number (partially masked: +55 (11) 9****-9999)
  - Template name
  - Message preview (first 100 chars)
  - Sent timestamp (DD/MM/YYYY HH:MM)
  - Current status (icon + label)
  - Delivery timestamp (if delivered)
  - Read timestamp (if read)
- [ ] Filter options:
  - Date range picker
  - Status filter (All, Delivered, Failed, Read)
  - Template filter
- [ ] Search by recipient phone number
- [ ] Click entry to view full details modal
- [ ] Pagination: 50 messages per page
- [ ] Export to CSV button
- [ ] Auto-refresh status every 30 seconds

---

#### Story 4.7: Bulk Message Sending (Phase 2)
**As a** user,
**I want** to send the same message to multiple recipients,
**So that** I can efficiently communicate with customer segments.

**Acceptance Criteria:**
- [ ] "Envio em lote" option in message dispatch
- [ ] Recipient input methods:
  - Manual entry: Add multiple phone numbers
  - CSV upload: Upload file with phone numbers
  - Contact list: Select from saved lists (future)
- [ ] CSV format:
  - Required column: phone_number
  - Optional columns: name, custom_param_1, custom_param_2, etc.
- [ ] Validation:
  - Check all phone numbers format
  - Show validation errors in table
  - Allow fixing errors inline
  - Show valid/invalid count
- [ ] Preview:
  - Show first 5 recipients as examples
  - Display total recipient count
  - Estimated send time
  - Estimated cost (if applicable)
- [ ] Send options:
  - Send immediately
  - Schedule for later (Story 5.3)
  - Rate limiting: max X per minute
- [ ] Progress tracking:
  - Progress bar: X of Y sent
  - Real-time status updates
  - Pause/cancel option
- [ ] Summary report:
  - Total sent
  - Successful deliveries
  - Failed sends (with reasons)
  - Export detailed report

**Technical Notes:**
- Use background queue (Bull/BullMQ) for bulk sends
- Implement rate limiting to avoid Meta API limits

---

### Epic 5: Settings & Configuration
**Priority:** MUST HAVE (MVP - Phase 1)
**Business Value:** Platform customization and management
**Estimated Effort:** 1 sprint
**Dependencies:** Epic 1 (Authentication)

**Description:**
Provide admin configuration section for platform settings, preferences, and system management.

#### Story 5.1: Settings Dashboard
**As an** admin,
**I want** to access a centralized settings dashboard,
**So that** I can manage all platform configurations in one place.

**Acceptance Criteria:**
- [ ] "Configurações" link in main navigation (gear icon)
- [ ] Password-protected (re-authenticate if session >1 hour old)
- [ ] Settings organized in tabs/sections:
  - Account & API
  - User Management (future)
  - Notifications
  - System Health
  - Security & Logs
  - Advanced Settings
- [ ] Save button at bottom (disabled until changes made)
- [ ] "Unsaved changes" warning if navigating away
- [ ] Success toast notification on save
- [ ] Audit log entry for all settings changes

---

#### Story 5.2: API Configuration Management
**As an** admin,
**I want** to view and update Meta API credentials,
**So that** I can maintain connectivity and update tokens when needed.

**Acceptance Criteria:**
- [ ] "Account & API" section shows:
  - WhatsApp Business Account ID (read-only)
  - Phone Number ID (read-only)
  - Display Name (from Meta)
  - Account Status (verified/unverified)
  - Current messaging tier (Tier 1/2/3/4)
  - Account quality rating (if available)
- [ ] "Update Credentials" button opens modal
- [ ] Update modal (similar to Story 1.3):
  - WABA ID input
  - Phone Number ID input
  - Access Token input (masked)
  - Test Connection button
- [ ] Display token expiration date (if available)
- [ ] Warning if token expires in <7 days
- [ ] "Revoke and generate new token" link to Meta docs
- [ ] Last synced timestamp for templates

---

#### Story 5.3: Template Refresh Configuration
**As an** admin,
**I want** to configure how often templates are synced from Meta,
**So that** I can balance freshness with API quota usage.

**Acceptance Criteria:**
- [ ] "Template Sync Settings" section
- [ ] Auto-refresh interval dropdown:
  - Every 5 minutes
  - Every 15 minutes (default)
  - Every 30 minutes
  - Every hour
  - Manual only
- [ ] "Sync now" button (manual trigger)
- [ ] Display last sync timestamp
- [ ] Display next scheduled sync time
- [ ] Show template count: "142 templates synced"
- [ ] Option: "Sync on every page load" (checkbox, default off)
- [ ] Warning if manual-only selected: "You'll need to manually refresh"

---

#### Story 5.4: Rate Limiting Configuration
**As an** admin,
**I want** to set message rate limits,
**So that** I don't exceed Meta API quotas or overwhelm recipients.

**Acceptance Criteria:**
- [ ] "Rate Limiting" section
- [ ] Settings:
  - Max messages per minute: slider 1-100 (default: 20)
  - Max messages per hour: slider 10-1000 (default: 200)
  - Max messages per day: input field (default: 1000)
  - Enable rate limiting: toggle (default: on)
- [ ] Display current usage:
  - Messages sent today: X / Y
  - Messages this hour: X / Y
  - Progress bar visual
- [ ] Warning threshold:
  - Alert when reaching 80% of limit
  - Notification color: orange
- [ ] Option: "Pause sending if limit reached" (checkbox)
- [ ] Option: "Queue messages for later" (checkbox, default on)

---

#### Story 5.5: System Health Dashboard
**As an** admin,
**I want** to monitor system health and API status,
**So that** I can proactively identify and resolve issues.

**Acceptance Criteria:**
- [ ] "System Health" section with status indicators
- [ ] Metrics displayed:
  - **Platform Status:** Online/Offline (green/red)
  - **Meta API Status:** Connected/Disconnected
  - **Database Status:** Healthy/Degraded
  - **Uptime:** X days, Y hours
  - **API Response Time:** Avg last hour (ms)
  - **Error Rate:** Last 24 hours (%)
  - **Active Sessions:** Current logged-in users
- [ ] API quota usage:
  - Requests today: X / Y
  - Current tier messaging limit: X / Y
  - Progress bars with color coding
- [ ] Recent errors (last 10):
  - Timestamp
  - Error message
  - Affected operation
  - User (if applicable)
- [ ] "View full logs" button (Story 5.6)
- [ ] Auto-refresh every 30 seconds

---

#### Story 5.6: Audit Logs and Security Events
**As an** admin,
**I want** to view audit logs and security events,
**So that** I can track activity and investigate issues.

**Acceptance Criteria:**
- [ ] "Security & Logs" section
- [ ] Event categories:
  - Authentication (logins, logouts, failed attempts)
  - API Activity (requests, responses, errors)
  - Settings Changes (who changed what)
  - Message Activity (sends, deliveries, failures)
  - Security Events (suspicious activity)
- [ ] Log entry fields:
  - Timestamp (DD/MM/YYYY HH:MM:SS)
  - Event type
  - User (username or "System")
  - Action description
  - IP address
  - Status (success/failure)
  - Details (expandable)
- [ ] Filters:
  - Date range
  - Event type
  - User
  - Status
- [ ] Search logs: free text search
- [ ] Pagination: 100 entries per page
- [ ] Export logs: CSV or JSON download
- [ ] Retention notice: "Logs retained for 90 days"

---

#### Story 5.7: Export Message Logs for Compliance
**As an** admin,
**I want** to export message logs for compliance audits,
**So that** I can provide documentation to regulators or management.

**Acceptance Criteria:**
- [ ] "Export Compliance Report" button
- [ ] Export options modal:
  - Date range selector
  - Format: CSV or PDF
  - Include fields (checkboxes):
    - Message ID
    - Recipient phone number (full or masked)
    - Template name
    - Sent timestamp
    - Delivery status
    - User who sent
    - Message content (optional, for transparency)
- [ ] Privacy options:
  - Mask phone numbers (last 4 digits visible)
  - Anonymize user names
- [ ] Generate report (background job if large)
- [ ] Download link or email when ready
- [ ] Report filename: `cartao-todos-mensagens-{start-date}-{end-date}.csv`
- [ ] Include report metadata:
  - Generated date
  - Date range
  - Total messages
  - Generated by (admin name)

---

### Epic 6: Dashboard & Analytics
**Priority:** SHOULD HAVE (Phase 2)
**Business Value:** Data-driven decision making and operational insights
**Estimated Effort:** 2 sprints
**Dependencies:** Epic 2 (API integration), Epic 4 (Message history data)

**Description:**
Provide insights into message performance, template usage, and platform activity. This epic enables users to measure success and optimize messaging strategies.

#### Story 6.1: Main Dashboard with Key Metrics
**As a** user,
**I want** to see a dashboard with key metrics when I log in,
**So that** I can quickly understand messaging activity and system status.

**Acceptance Criteria:**
- [ ] Dashboard is the default landing page after login
- [ ] Metric cards displayed:
  - **Messages Sent Today:** Count with trend indicator (↑↓ vs. yesterday)
  - **Delivery Rate:** Percentage with progress circle
  - **Read Rate:** Percentage with progress circle
  - **Templates Available:** Count with status breakdown
  - **Active Users:** Count (if multi-user enabled)
- [ ] Quick action buttons:
  - "Enviar Mensagem" (primary, large)
  - "Ver Templates"
  - "Histórico"
- [ ] Recent activity feed:
  - Last 10 messages sent
  - Status updates
  - Template approvals/rejections
- [ ] System alerts (if any):
  - Token expiration warnings
  - Rate limit warnings
  - Failed messages
- [ ] Date range selector: Today, This Week, This Month
- [ ] Auto-refresh every 2 minutes

---

#### Story 6.2: Message Delivery Statistics
**As a** user,
**I want** to see detailed message delivery statistics,
**So that** I can understand the effectiveness of my communications.

**Acceptance Criteria:**
- [ ] "Analytics" page in main navigation
- [ ] Charts and visualizations:
  - **Messages Over Time:** Line chart (daily/weekly/monthly)
  - **Delivery Funnel:** Sent → Delivered → Read (with percentages)
  - **Status Breakdown:** Pie chart (Delivered, Failed, Pending, Read)
  - **Average Delivery Time:** Metric with histogram
- [ ] Metrics table:
  - Total messages sent
  - Successfully delivered
  - Failed deliveries
  - Read rate
  - Average delivery time
- [ ] Date range selector with presets:
  - Last 7 days
  - Last 30 days
  - Last 90 days
  - Custom range
- [ ] Comparison mode: Compare to previous period
- [ ] Export chart data as CSV

---

#### Story 6.3: Template Usage Analytics
**As a** user,
**I want** to see which templates are most used and most effective,
**So that** I can optimize my template library and messaging strategy.

**Acceptance Criteria:**
- [ ] "Template Performance" section in Analytics
- [ ] Table displaying all templates with metrics:
  - Template name
  - Times used (count)
  - Delivery rate (%)
  - Read rate (%)
  - Average response time (if replies enabled)
  - Quality score
  - Last used (timestamp)
- [ ] Sort by any column
- [ ] Highlight top 5 performers (green background)
- [ ] Flag underperforming templates (red background if delivery <80%)
- [ ] Click template to see detailed breakdown:
  - Usage over time chart
  - Success vs. failure reasons
  - User who sent (if multi-user)
- [ ] Insights section:
  - "Most popular template: {name}"
  - "Highest read rate: {name} ({percentage}%)"
  - "Least used: {name} (consider archiving)"

---

#### Story 6.4: Platform Usage Metrics
**As an** admin,
**I want** to see platform usage statistics,
**So that** I can understand adoption and identify training needs.

**Acceptance Criteria:**
- [ ] "Platform Usage" section (admin only)
- [ ] User activity metrics (if multi-user):
  - Total users
  - Active users (logged in last 7 days)
  - Messages sent per user
  - Top users (most active)
- [ ] Feature usage:
  - Search usage count
  - Filter usage count
  - Template preview opens
  - Settings page visits
- [ ] Session statistics:
  - Average session duration
  - Pages per session
  - Bounce rate
- [ ] Time-of-day heatmap: When are users most active?
- [ ] Device breakdown: Desktop vs. Mobile vs. Tablet
- [ ] Browser breakdown: Chrome, Safari, Firefox, Edge

---

#### Story 6.5: Export Analytics Reports
**As a** user,
**I want** to export analytics data for external reporting,
**So that** I can share insights with stakeholders.

**Acceptance Criteria:**
- [ ] "Export Report" button on Analytics page
- [ ] Report format options:
  - CSV (raw data)
  - PDF (formatted report with charts)
  - Excel (with charts and tables)
- [ ] Report includes:
  - Date range
  - Summary metrics
  - Charts (as images in PDF)
  - Detailed data tables
  - Insights and recommendations
- [ ] Customization options:
  - Select which sections to include
  - Add custom notes/commentary
  - Choose branding (Cartão de Todos logo)
- [ ] File naming: `analytics-report-{date-range}.pdf`
- [ ] Generate button with loading state
- [ ] Download or email option

---

### Epic 7: Brazilian UX & Localization
**Priority:** MUST HAVE (MVP - Phase 1)
**Business Value:** User adoption and brand alignment
**Estimated Effort:** 1 sprint (integrated throughout development)
**Dependencies:** All UI epics

**Description:**
Ensure the platform is fully localized for Brazilian Portuguese with culturally appropriate UX patterns and Cartão de Todos brand identity.

#### Story 7.1: Brazilian Portuguese Interface
**As a** Brazilian user,
**I want** the entire interface in Brazilian Portuguese,
**So that** I can use the platform confidently in my native language.

**Acceptance Criteria:**
- [ ] 100% of UI text in Brazilian Portuguese (pt-BR)
- [ ] No English text visible to users (except technical IDs)
- [ ] Brazilian Portuguese conventions:
  - Formal "você" (not "tu")
  - Appropriate business language tone
  - Welcoming, accessible, trust-focused
- [ ] Date format: DD/MM/AAAA (25/12/2026)
- [ ] Time format: 24-hour (14:30)
- [ ] Currency format: R$ 1.234,56 (period for thousands, comma for decimals)
- [ ] Phone format: +55 (11) 99999-9999
- [ ] Proper Portuguese diacritics: á, ã, é, ê, í, ó, õ, ú, ç
- [ ] Portuguese-specific typography:
  - Line height 1.6-1.8 (Portuguese text is longer)
  - Accommodate 30% longer text than English
- [ ] Translation file structure for future expansion (i18next)

**Key Translations:**
- Dashboard → Painel
- Templates → Modelos
- Send Message → Enviar Mensagem
- Settings → Configurações
- History → Histórico
- Analytics → Análises
- Search → Buscar
- Filter → Filtrar

---

#### Story 7.2: Cartão de Todos Brand Identity
**As a** user,
**I want** the platform to reflect Cartão de Todos brand identity,
**So that** I feel confident using an official franchise tool.

**Acceptance Criteria:**
- [ ] Brand colors implemented throughout:
  - Primary: #00A988 (Green) - CTAs, links, active states
  - Secondary: Supporting colors (to be defined with Uma)
  - Success: Green (#10B981)
  - Warning: Orange (#F59E0B)
  - Error: Red (#EF4444)
  - Neutral: Grays for text and backgrounds
- [ ] Cartão de Todos logo:
  - Displayed in navigation header (top-left)
  - High-resolution versions for retina displays
  - White logo version for dark backgrounds
- [ ] Typography:
  - Primary font: Inter, Open Sans, or Nunito (excellent Portuguese support)
  - Headings: Bold, clear hierarchy
  - Body: 16px minimum (mobile readability)
- [ ] Brand personality in UI:
  - Welcoming: Friendly microcopy, encouraging messages
  - Trust-focused: Clear confirmations, transparent processes
  - Family-centric: Inclusive language, accessible design
  - Professional: Clean, organized layouts
- [ ] Footer with Cartão de Todos information:
  - Company name and year
  - Link to privacy policy
  - Support contact

---

#### Story 7.3: Brazilian UX Patterns and Conventions
**As a** Brazilian user,
**I want** the platform to follow familiar UX patterns,
**So that** I can navigate intuitively based on my experience with other Brazilian apps.

**Acceptance Criteria:**
- [ ] Navigation patterns similar to:
  - Nubank (card-based UI, clear hierarchy)
  - iFood (simple, task-focused)
  - MercadoLivre (search-first, filters)
- [ ] Form design:
  - Labels above inputs (not placeholders only)
  - Required fields marked with red asterisk (*)
  - Inline validation with immediate feedback
  - Error messages: Friendly, specific, actionable
- [ ] Button conventions:
  - Primary action: Green, right-aligned or full-width
  - Secondary action: Outlined, left of primary
  - Destructive action: Red, with confirmation
  - Large tap targets: Minimum 44x44px (mobile)
- [ ] Loading states:
  - Skeleton screens (not just spinners)
  - Progress indicators for multi-step processes
  - Optimistic UI updates where appropriate
- [ ] Confirmation dialogs:
  - Clear yes/no or confirm/cancel
  - Dangerous actions require typing confirmation
- [ ] Toast notifications:
  - Top-right corner (desktop)
  - Top center (mobile)
  - Auto-dismiss after 5 seconds
  - Dismissible with X button

---

#### Story 7.4: Accessibility Compliance
**As a** user with accessibility needs,
**I want** the platform to be accessible,
**So that** I can use it regardless of my abilities.

**Acceptance Criteria:**
- [ ] WCAG 2.1 Level AA compliance
- [ ] Keyboard navigation:
  - All interactive elements accessible via Tab
  - Logical tab order
  - Visible focus indicators
  - Escape key closes modals
  - Enter key submits forms
- [ ] Screen reader support:
  - Semantic HTML (header, nav, main, footer)
  - ARIA labels for icons and complex components
  - Alt text for all images
  - Form labels properly associated
- [ ] Color contrast:
  - Text contrast ratio ≥ 4.5:1 (normal text)
  - Text contrast ratio ≥ 3:1 (large text)
  - Interactive elements contrast ≥ 3:1
  - Color not the only indicator (use icons + text)
- [ ] Responsive text:
  - Respects user's font size settings
  - No horizontal scrolling at 200% zoom
  - Text remains readable when enlarged
- [ ] Error identification:
  - Errors clearly identified with icons + text
  - Error messages associated with form fields
  - Suggestions provided to fix errors
- [ ] Automated testing:
  - Lighthouse accessibility score > 95
  - axe DevTools scan with 0 violations

---

#### Story 7.5: Responsive Mobile Experience
**As a** mobile user,
**I want** the platform to work seamlessly on my smartphone,
**So that** I can send messages on the go.

**Acceptance Criteria:**
- [ ] Mobile-first design approach
- [ ] Responsive breakpoints:
  - Mobile: 320px - 767px
  - Tablet: 768px - 1023px
  - Desktop: 1024px+
- [ ] Mobile navigation:
  - Hamburger menu (≤767px)
  - Bottom navigation bar (alternative)
  - Collapsible sidebar (≥768px)
- [ ] Touch-optimized:
  - Minimum tap target: 44x44px
  - Swipe gestures (where appropriate)
  - No hover-dependent interactions
- [ ] Mobile-optimized forms:
  - Appropriate input types (tel, email, number)
  - Minimize keyboard switches
  - Single-column layout
  - Large, easy-to-tap buttons
- [ ] Performance:
  - Page load < 3 seconds on 3G
  - Lazy load images
  - Minimize JavaScript bundle size
- [ ] Mobile testing:
  - Test on real devices (iOS and Android)
  - Test on Chrome Mobile, Safari Mobile
  - Portrait and landscape orientation
- [ ] PWA features (future):
  - Installable on home screen
  - Offline capability
  - Push notifications

---

### Epic 8: Security & Compliance
**Priority:** MUST HAVE (MVP - Phase 1)
**Business Value:** Risk mitigation and regulatory compliance
**Estimated Effort:** 1-2 sprints (integrated throughout development)
**Dependencies:** All epics

**Description:**
Implement comprehensive security measures and ensure compliance with Meta policies and Brazilian data protection regulations (LGPD).

#### Story 8.1: Encrypted Credential Storage
**As a** system,
**I need** to store Meta API credentials encrypted at rest,
**So that** sensitive data is protected from unauthorized access.

**Acceptance Criteria:**
- [ ] Encryption algorithm: AES-256
- [ ] Encryption key:
  - Stored in environment variable (not in code)
  - Never committed to version control
  - Rotated quarterly (documented process)
- [ ] Encrypted fields:
  - Meta API access token
  - Webhook verification token
  - Admin password (hashed with bcrypt)
- [ ] Decryption:
  - Only in memory, never logged
  - Only when needed for API calls
  - Cleared after use
- [ ] Key management:
  - Separate keys for dev/staging/production
  - Backup key stored securely (password manager)
  - Key rotation procedure documented
- [ ] Audit:
  - Log when credentials are accessed
  - Log who decrypted credentials
  - Alert on multiple decryption failures

---

#### Story 8.2: HTTPS and Transport Security
**As a** system,
**I need** all communication to be encrypted in transit,
**So that** data cannot be intercepted.

**Acceptance Criteria:**
- [ ] HTTPS enforced for all connections
- [ ] TLS 1.3 (or minimum TLS 1.2)
- [ ] Valid SSL certificate (Let's Encrypt or commercial)
- [ ] HTTP redirects to HTTPS automatically
- [ ] HSTS header enabled (max-age=31536000)
- [ ] No mixed content warnings
- [ ] API calls to Meta over HTTPS only
- [ ] Webhook endpoint over HTTPS
- [ ] Certificate auto-renewal configured
- [ ] Monitor certificate expiration (alert 30 days before)

---

#### Story 8.3: LGPD Compliance
**As a** platform,
**I need** to comply with Brazilian data protection law (LGPD),
**So that** we respect user privacy and avoid legal penalties.

**Acceptance Criteria:**
- [ ] Privacy Policy page:
  - In Brazilian Portuguese
  - Explains data collection and usage
  - User rights (access, deletion, portability)
  - Contact information for data requests
  - Last updated date
- [ ] Data minimization:
  - Only collect necessary data (phone numbers, message content)
  - Don't collect personal data unless required
- [ ] Consent management:
  - Users must opt-in to receive marketing messages
  - Record consent timestamp and method
  - Provide opt-out mechanism (PARAR keyword)
- [ ] Data retention:
  - Message logs: 90 days default
  - Audit logs: 90 days
  - User data: Deleted on account closure
  - Automated deletion job runs daily
- [ ] User rights implementation:
  - Data access request: Export user's data
  - Data deletion request: Purge all user data
  - Data portability: Export in machine-readable format (JSON/CSV)
- [ ] Security measures documented:
  - Encryption at rest and in transit
  - Access controls (RBAC)
  - Audit logging
- [ ] Cookie consent banner (if using analytics):
  - Explain cookie usage
  - Opt-in required for non-essential cookies

**LGPD Reference:**
- Lei nº 13.709/2018 (Brazilian General Data Protection Law)
- Art. 7: Legal bases for processing (consent, legitimate interest)
- Art. 18: Data subject rights

---

#### Story 8.4: Meta Policy Compliance
**As a** platform,
**I need** to help users comply with Meta's WhatsApp Business policies,
**So that** accounts remain in good standing and messages are delivered.

**Acceptance Criteria:**
- [ ] Template validation:
  - Marketing templates must include opt-out language
  - Check for prohibited content patterns
  - Warn if character limits exceeded
  - Validate variable placeholder format
- [ ] Opt-out enforcement:
  - Display opt-out requirement for marketing messages
  - Suggest footer text: "Responda PARAR para cancelar"
  - Validate footer includes opt-out mechanism
- [ ] Quality monitoring:
  - Display template quality ratings from Meta
  - Alert if template quality drops to "Low"
  - Provide guidance on improving quality
- [ ] Policy education:
  - In-app tooltips explaining Meta policies
  - Link to Meta's official policy documentation
  - Warning messages for risky actions
  - "Best Practices" guide page
- [ ] Compliance checklist:
  - Before sending, confirm:
    - [ ] Recipient has opted-in
    - [ ] Content complies with Meta policies
    - [ ] Template is approved
    - [ ] Within messaging tier limits
- [ ] Prohibited content detection:
  - Warn if message contains:
    - Misleading claims
    - Sensitive content (adult, gambling, etc.)
    - Spam indicators
  - Block send if critical violation detected

**Meta Policy References:**
- WhatsApp Business Policy (updated 2026)
- Commerce Policy
- Messaging Policy

---

#### Story 8.5: Security Best Practices
**As a** system,
**I need** to implement security best practices,
**So that** the platform is protected from common attacks.

**Acceptance Criteria:**
- [ ] OWASP Top 10 mitigation:
  - **Injection:** Parameterized queries, input validation
  - **Broken Authentication:** Secure session management, MFA option
  - **Sensitive Data Exposure:** Encryption, no sensitive data in logs
  - **XXE:** Disable XML external entities
  - **Broken Access Control:** RBAC, route protection
  - **Security Misconfiguration:** Secure defaults, error handling
  - **XSS:** Input sanitization, Content Security Policy
  - **Insecure Deserialization:** Validate all inputs
  - **Using Components with Known Vulnerabilities:** Dependency scanning
  - **Insufficient Logging:** Comprehensive audit logs
- [ ] Security headers:
  - Content-Security-Policy
  - X-Frame-Options: DENY
  - X-Content-Type-Options: nosniff
  - Referrer-Policy: no-referrer
  - Permissions-Policy
- [ ] Input validation:
  - Whitelist approach (allow known good)
  - Sanitize all user inputs
  - Validate on client and server
- [ ] Rate limiting:
  - Login attempts: 5 per 15 minutes per IP
  - API endpoints: 100 requests per minute per user
  - Failed requests: Progressive backoff
- [ ] Error handling:
  - Never expose stack traces to users
  - Log detailed errors server-side
  - Generic error messages to users
- [ ] Dependency management:
  - Automated vulnerability scanning (Dependabot, Snyk)
  - Update dependencies monthly
  - Pin dependency versions

---

## 5. Technical Constraints

### 5.1 Meta WhatsApp Business API Constraints

**Authentication & Authorization:**
- System User Access Tokens required for API access
- Tokens must be refreshed before expiration (typically 60 days)
- Two-factor authentication (2FA) mandatory on Meta Business Manager
- Permissions required: `whatsapp_business_messaging`

**Rate Limits:**
- Cloud API: 80 requests per second
- Message templates limit: 250 (unverified), 6,000 (verified accounts)
- Messaging tier system based on quality:
  - Tier 1: 1,000 messages per 24 hours
  - Tier 2: 10,000 messages per 24 hours
  - Tier 3: 100,000 messages per 24 hours
  - Tier 4: Unlimited
- Quality-based tier progression (automatic, based on message quality)

**Template Requirements:**
- Templates must be pre-approved by Meta (1-24 hour review time)
- Character limits:
  - Header: 60 characters
  - Body: 1,024 characters
  - Footer: 60 characters
  - Button text: 25 characters
- Variable placeholders: Sequential numbering {{1}}, {{2}}, etc.
- Template naming: Lowercase, underscores only, no special characters
- Example values required for all variables during submission

**Media Constraints:**
- Images: <15MB, JPEG or PNG, served via HTTPS
- Videos: <15MB, MP4 or 3GP
- Documents: <100MB, PDF or other common formats
- Valid HTTPS URLs required for all media

**Quality Management:**
- Quality ratings: High, Medium, Low, Flagged
- Auto-pause triggers:
  - Low quality rating (3 hours)
  - Multiple user blocks/reports (6 hours)
- Account suspension risk if quality remains low

**Prerequisites:**
- Active Meta Business Manager account (verified)
- WhatsApp Business Account (WABA)
- Dedicated phone number (cannot be used in WhatsApp App simultaneously)
- Display name approved by Meta (matches legal business name)
- Business verification (recommended for higher limits)

### 5.2 Technology Stack Constraints

**Frontend Requirements:**
- Modern browsers support: Chrome 90+, Safari 14+, Firefox 88+, Edge 90+
- JavaScript enabled (no graceful degradation required for MVP)
- Minimum viewport: 320px width (iPhone SE)
- Maximum bundle size: 500KB (initial load, gzipped)

**Backend Requirements:**
- Node.js 20+ LTS (for long-term stability)
- Database: PostgreSQL 16+ (JSON support required) OR MongoDB 6+
- Redis 6+ (for session management and caching)
- Queue system: Bull/BullMQ (for background jobs)

**Infrastructure Requirements:**
- HTTPS/TLS 1.3 support
- CDN for static assets (Cloudflare, CloudFront)
- Webhook endpoint accessible from Meta's IP ranges
- Minimum uptime SLA: 99.5%
- Backup strategy: Daily automated backups, 30-day retention

**Security Requirements:**
- AES-256 encryption for sensitive data at rest
- bcrypt (cost factor 10) for password hashing
- JWT for session tokens (HS256 or RS256)
- Environment-based secrets management (never in code)
- OWASP Top 10 compliance

**Performance Requirements:**
- Page load time: <2 seconds (p95) on 4G connection
- API response time: <2 seconds (p95)
- Time to Interactive (TTI): <3 seconds
- Lighthouse Performance score: >85

### 5.3 Brazilian Regulatory Constraints

**LGPD (Lei Geral de Proteção de Dados) Compliance:**
- Must obtain explicit consent for marketing messages
- Data retention limits: 90 days default for message logs
- User rights: Access, deletion, portability
- Data minimization: Only collect necessary data
- Privacy policy in Brazilian Portuguese
- Breach notification to ANPD within reasonable time

**WhatsApp-Specific Regulations:**
- Opt-in required: Users must explicitly consent to receive messages
- Opt-out mechanism: "Responda PARAR para cancelar" or similar
- Time restrictions: Respect quiet hours (optional, best practice: no messages 10 PM - 8 AM)
- Identification: Sender must be clearly identified (Cartão de Todos)

**Accessibility Requirements:**
- Follow Brazilian accessibility standards (similar to WCAG 2.1)
- Public sector procurement requires accessibility compliance
- Best practice: WCAG 2.1 Level AA minimum

### 5.4 Business Constraints

**Budget:**
- MVP Development: R$118,000 (fixed budget)
- Timeline: 6-8 weeks (must be respected)
- Infrastructure: R$1,000-R$3,400/month (ongoing)

**User Base:**
- Initial users: 10-20 franchise staff
- Expected growth: 50-100 users within 6 months
- Technical proficiency: Low to medium (non-developers)

**Message Volume (Initial Estimates):**
- Daily messages: 100-500
- Monthly messages: 3,000-15,000
- Peak periods: Promotional campaigns (2-3x normal volume)

**Integration Limitations:**
- MVP: Meta API only (no other integrations)
- Phase 2: Consider CRM integration (RD Station, Salesforce)
- No immediate plans for chatbot or conversational AI

### 5.5 Design System Constraints

**Cartão de Todos Brand Guidelines:**
- Primary color: #00A988 (Green) - must be used for all CTAs
- Logo usage: Follow brand guidelines (spacing, minimum size)
- Tone of voice: Welcoming, trust-focused, professional
- Target audience: Family-centric, healthcare-focused

**Typography:**
- Must support Portuguese diacritics: á, ã, ç, é, ê, í, ó, õ, ú
- Minimum body font size: 16px (mobile readability)
- Line height: 1.6-1.8 (Portuguese text 30% longer than English)

**Accessibility:**
- Color contrast: WCAG AA minimum (4.5:1 for text)
- Focus indicators: Visible on all interactive elements
- Keyboard navigation: Full support required

---

## 6. Design Requirements

### 6.1 Design System Foundation

**For Uma (UX/UI Designer):**

**Brand Identity Integration:**
- **Primary Color:** #00A988 (Cartão de Todos Green)
  - Use for: Primary buttons, links, active states, progress indicators
  - Ensure WCAG AA contrast ratio (test against backgrounds)
- **Supporting Colors:** (Uma to define)
  - Secondary color (neutral/complementary)
  - Success: #10B981 (Green)
  - Warning: #F59E0B (Orange)
  - Error: #EF4444 (Red)
  - Info: #3B82F6 (Blue)
  - Neutral palette: Gray scale (7-9 shades)
- **Typography:**
  - **Primary Font:** Inter, Open Sans, or Nunito (excellent Portuguese diacritic support)
  - **Heading Scale:**
    - H1: 32px (mobile) / 48px (desktop), Bold
    - H2: 24px (mobile) / 36px (desktop), Bold
    - H3: 20px (mobile) / 28px (desktop), Semibold
    - H4: 18px (mobile) / 24px (desktop), Semibold
  - **Body Text:** 16px minimum (18px preferred for readability)
  - **Small Text:** 14px minimum (not smaller)
  - **Line Height:** 1.6-1.8 (accommodate longer Portuguese text)

**Component Library Requirements:**
- **Buttons:**
  - Primary: Solid fill, green (#00A988), white text
  - Secondary: Outlined, gray border, gray text
  - Destructive: Red background or outlined red
  - Sizes: Small (36px), Medium (44px), Large (52px)
  - States: Default, Hover, Active, Disabled, Loading
- **Form Inputs:**
  - Height: 44px minimum (mobile tap target)
  - Border: 1px solid, rounded corners (4-8px)
  - States: Default, Focus, Error, Disabled, Success
  - Label: Above input (not placeholder only)
  - Error message: Below input, red text with icon
- **Cards:**
  - Rounded corners: 8-12px
  - Shadow: Subtle (0px 2px 8px rgba(0,0,0,0.1))
  - Padding: 16-24px
  - Hover state: Subtle lift or shadow increase
- **Status Badges:**
  - Approved: Green background, dark green text
  - Pending: Yellow background, dark yellow text
  - Rejected: Red background, dark red text
  - Paused: Orange background, dark orange text
  - Disabled: Gray background, dark gray text
- **Icons:**
  - Icon library: Heroicons, Lucide, or Feather Icons
  - Size: 20px (inline), 24px (standalone)
  - Style: Outline or solid (consistent throughout)
  - Color: Match text color or use brand colors for emphasis

### 6.2 Layout and Navigation

**Navigation Structure:**
- **Desktop (≥1024px):**
  - Left sidebar navigation (fixed, collapsible)
  - Width: 240px (expanded), 64px (collapsed)
  - Logo at top
  - Menu items with icons + labels
  - User profile at bottom with logout
- **Mobile (≤767px):**
  - Top navigation bar (fixed)
  - Hamburger menu (left icon)
  - Logo in center
  - Action button on right (e.g., Send Message)
  - Drawer menu slides from left
- **Tablet (768px-1023px):**
  - Same as desktop or mobile (Uma to decide based on testing)

**Page Layout:**
- **Container:** Max-width 1440px, centered
- **Content spacing:** 16px (mobile), 24px (desktop)
- **Grid system:** 12-column (Bootstrap/Tailwind standard)
- **Whitespace:** Generous spacing for readability (avoid cramped layouts)

### 6.3 Key Screen Designs

**Priority Screens for Uma:**

1. **Login Page**
   - Centered card (max-width 400px)
   - Cartão de Todos logo
   - Username and password fields
   - "Lembrar-me" checkbox
   - "Entrar" button (primary, full-width)
   - Background: Brand green gradient or subtle pattern

2. **Dashboard**
   - Metric cards (4 across on desktop, 2 on tablet, 1 on mobile)
   - Quick action buttons (Send Message, View Templates)
   - Recent activity feed (table or timeline)
   - Chart: Messages over time (line or bar chart)
   - System status indicator (top-right corner)

3. **Template Library**
   - Search bar (top, prominent)
   - Filter chips (Status, Category)
   - Template cards grid (responsive)
   - Card design: Image/icon, name, category badge, preview text, actions
   - Empty state: Illustration + message + "Refresh Templates" button

4. **Template Detail Modal**
   - Split view (desktop): Preview on left, details on right
   - Stacked view (mobile): Preview on top, details below
   - Preview: WhatsApp mobile mockup with rendered message
   - Details: Component breakdown, variables, character counts
   - Actions: "Use Template" (primary), "Close" (secondary)

5. **Send Message Wizard (3 Steps)**
   - **Step 1: Select Template**
     - Template selection interface (similar to library)
     - "Next" button (disabled until selection)
   - **Step 2: Fill Parameters**
     - Form with dynamic fields based on template
     - Real-time preview on right (desktop) or bottom (mobile)
     - Recipient phone number input
     - "Back" and "Next: Preview" buttons
   - **Step 3: Preview and Send**
     - Large WhatsApp message preview
     - Summary card (template, recipient, details)
     - "Edit Message" and "Send Message" buttons
     - Success/error state after send

6. **Message History**
   - Table view (desktop) / Card view (mobile)
   - Columns: Recipient, Template, Status, Sent Date, Actions
   - Status icons with color coding
   - Filter bar: Date range, status, template
   - Search by recipient
   - Pagination controls

7. **Settings Page**
   - Tab navigation (Account, API, System, Security)
   - Form sections with clear headings
   - Input fields with help text
   - "Test Connection" button with loading/success/error states
   - "Save Changes" button (sticky at bottom on mobile)

### 6.4 Brazilian UX Patterns

**Cultural Design Considerations:**

1. **Familiarity:** Borrow patterns from popular Brazilian apps:
   - **Nubank:** Clean, card-based UI with clear hierarchy
   - **iFood:** Simple, task-focused, minimal steps
   - **MercadoLivre:** Search-first approach, prominent filters
   - **PicPay:** Simplified forms, large buttons, clear CTAs

2. **Trust Indicators:**
   - Security badges/icons near sensitive inputs
   - Clear explanations of why data is collected
   - LGPD compliance notice in footer
   - "Secure connection" indicator (lock icon)

3. **Helpful Guidance:**
   - Contextual tooltips (? icon) for technical terms
   - Inline help text below inputs
   - Progressive disclosure (advanced options hidden by default)
   - Onboarding tour for first-time users

4. **Error Prevention:**
   - Confirmation dialogs for destructive actions
   - Inline validation (real-time feedback)
   - Clear error messages with recovery steps
   - Undo option where appropriate

### 6.5 Responsive Design

**Breakpoints:**
- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px - 1439px
- Wide: 1440px+

**Mobile-Specific Requirements:**
- Touch-optimized: Minimum 44x44px tap targets
- No hover-dependent interactions
- Single-column layouts for forms
- Bottom navigation or drawer menu
- Collapsible sections for long content
- Swipe gestures (where appropriate, e.g., dismiss notifications)

**Tablet Considerations:**
- Hybrid approach (desktop-like but touch-optimized)
- Multi-column layouts where space allows
- Larger tap targets than desktop (48x48px)

### 6.6 Accessibility Design Requirements

**Color and Contrast:**
- Text contrast ratio: ≥4.5:1 (body text), ≥3:1 (large text)
- Interactive element contrast: ≥3:1 against background
- Never use color alone to convey information (use icons + text)
- Test all designs with contrast checker tools

**Visual Indicators:**
- Focus state: Visible outline (2px solid, high contrast color)
- Active state: Clear visual change (background color, border)
- Disabled state: Reduced opacity (50-60%) + cursor change

**Typography:**
- Respect user's font size preferences (use rem units, not px)
- Minimum font size: 16px (1rem)
- Clear visual hierarchy (size, weight, color)
- Adequate line spacing (1.6-1.8) for readability

**Iconography:**
- Always pair icons with text labels (especially for critical actions)
- Use universally recognized icons (e.g., trash for delete)
- Provide alt text for decorative images
- Icon-only buttons must have ARIA labels

### 6.7 Design Deliverables for Uma

**Required Deliverables:**
1. **Design System Documentation:**
   - Color palette (hex codes, usage guidelines)
   - Typography scale (sizes, weights, line heights)
   - Component library (buttons, inputs, cards, badges, etc.)
   - Spacing system (8pt grid or similar)
   - Icon library (selected icons with guidelines)

2. **High-Fidelity Mockups:**
   - All priority screens (Section 6.3) in desktop and mobile
   - Key user flows (login, send message, template selection)
   - Component states (hover, active, disabled, error)
   - Empty states and loading states
   - Error states and success states

3. **Interactive Prototype:**
   - Figma prototype demonstrating key user flows
   - Send message flow (3 steps, end-to-end)
   - Template browsing and search
   - Mobile and desktop versions

4. **Design Assets:**
   - Cartão de Todos logo (SVG, PNG in multiple sizes)
   - Icons (SVG format)
   - Sample images for mockups
   - Export design tokens (colors, typography) for developers

5. **Accessibility Annotations:**
   - Focus order for keyboard navigation
   - ARIA labels for screen readers
   - Color contrast ratios (verified)
   - Alt text for images

**Design Timeline:**
- Week 1-2: Design system and component library
- Week 3-4: High-fidelity mockups (desktop + mobile)
- Week 5: Interactive prototype and design handoff
- Week 6+: Design support during development (iteration)

---

## 7. Timeline & Milestones

### 7.1 Project Phases Overview

**Phase 1: MVP Development (6-8 weeks)**
- Core functionality: Authentication, template browsing, single message sending
- Brazilian Portuguese interface
- Meta API integration
- Basic security and compliance

**Phase 2: Enhanced Features (4-6 weeks post-MVP)**
- User management and RBAC
- Bulk message sending (CSV import)
- Media templates (images, videos)
- Basic analytics and reporting

**Phase 3: Advanced Features (6-8 weeks post-Phase 2)**
- Advanced analytics and A/B testing
- Template quality dashboard
- Webhook event viewer
- Audience segmentation

### 7.2 MVP Detailed Timeline (8 weeks)

#### Week 0: Pre-Development Setup
**Stakeholder Alignment:**
- [ ] PRD review and approval by Cartão de Todos leadership
- [ ] Budget confirmation: R$118,000
- [ ] Team assembly: Frontend, Backend, UX, QA
- [ ] Tool setup: GitHub, project management (Jira/Linear), Slack/communication

**Technical Setup:**
- [ ] Create Meta Business Manager account
- [ ] Apply for Meta Business Verification (2-5 days)
- [ ] Set up WhatsApp Business Account (WABA)
- [ ] Register phone number for API access
- [ ] Generate System User access token
- [ ] Test API connectivity (Postman/curl)

**Design Kickoff:**
- [ ] Uma begins design system and component library
- [ ] Brand guidelines review with Cartão de Todos
- [ ] Initial mockups for login and dashboard

---

#### Sprint 1 (Week 1-2): Foundation & Architecture
**Goal:** Establish technical foundation and development environment

**Backend (Aria + Dex):**
- [ ] Repository setup (Git, branching strategy)
- [ ] Database schema design (PostgreSQL/MongoDB)
- [ ] Initial database migration
- [ ] API scaffolding (Express/Fastify/NestJS)
- [ ] Authentication middleware (JWT)
- [ ] Meta API client wrapper (authentication layer)
- [ ] Environment configuration (.env, secrets management)
- [ ] Error handling framework
- [ ] Logging setup (Winston/Pino)

**Frontend (Dex):**
- [ ] Project scaffolding (React/Next.js)
- [ ] Routing setup (React Router/Next.js routes)
- [ ] State management (Zustand/React Query)
- [ ] UI library integration (Shadcn UI/Tailwind CSS)
- [ ] Layout components (navigation, footer)
- [ ] Authentication context (login/logout logic)

**Design (Uma):**
- [ ] Finalize design system and component library
- [ ] High-fidelity mockups: Login, Dashboard, Template Library
- [ ] Component designs: Buttons, inputs, cards, badges
- [ ] Color palette and typography finalized

**QA (Quinn):**
- [ ] Test plan document created
- [ ] Testing environment setup
- [ ] Automated testing framework setup (Vitest, Playwright)

**Sprint 1 Deliverable:**
- Working development environment
- Database schema implemented
- Basic authentication flow (login/logout)
- Design system and initial mockups

---

#### Sprint 2 (Week 3-4): Authentication & API Integration
**Goal:** Complete authentication system and Meta API integration

**Backend:**
- [ ] Admin login API endpoint (POST /api/auth/login)
- [ ] Password hashing and validation (bcrypt)
- [ ] Session management (JWT tokens)
- [ ] Account lockout mechanism (5 failed attempts)
- [ ] Force password change on first login
- [ ] Meta API integration:
  - [ ] Fetch templates (GET /v18.0/{waba-id}/message_templates)
  - [ ] Template data parsing and storage
  - [ ] Send message endpoint (POST /v18.0/{phone-id}/messages)
- [ ] Credential encryption (AES-256)
- [ ] Settings API (save/retrieve credentials)

**Frontend:**
- [ ] Login page (Epic 1, Story 1.1)
- [ ] Password change flow (Epic 1, Story 1.2)
- [ ] Dashboard page skeleton (Epic 6, Story 6.1)
- [ ] Settings page - API configuration (Epic 5, Story 5.2)
- [ ] "Test Connection" functionality (Epic 1, Story 1.4)
- [ ] Loading states and error handling

**Design (Uma):**
- [ ] High-fidelity mockups: Send Message Wizard (3 steps)
- [ ] High-fidelity mockups: Settings, Message History
- [ ] Mobile responsive designs
- [ ] Interactive Figma prototype (send message flow)

**QA:**
- [ ] Manual testing: Login, logout, password change
- [ ] Unit tests: Authentication logic
- [ ] Integration tests: Meta API connection
- [ ] Security testing: Token validation, encryption

**Sprint 2 Deliverable:**
- Fully functional authentication system
- Meta API credentials configuration
- Template fetching from Meta API
- Dashboard with basic metrics

---

#### Sprint 3 (Week 5-6): Template Management & Browsing
**Goal:** Implement template library and browsing functionality

**Backend:**
- [ ] Template sync job (fetch from Meta API, store in database)
- [ ] Template API endpoints:
  - [ ] GET /api/templates (list with pagination)
  - [ ] GET /api/templates/:id (single template details)
  - [ ] POST /api/templates/sync (manual refresh)
- [ ] Search and filter logic (by name, category, status)
- [ ] Template caching (Redis, 5-minute TTL)
- [ ] Pagination and sorting

**Frontend:**
- [ ] Template library page (Epic 3, Story 3.1)
- [ ] Template cards grid (responsive)
- [ ] Search functionality (Epic 3, Story 3.2)
- [ ] Filter dropdowns (Epic 3, Story 3.3)
- [ ] Template detail modal (Epic 3, Story 3.4)
- [ ] WhatsApp message preview component (Epic 3, Story 3.5)
- [ ] Recently used templates (Epic 3, Story 3.6)
- [ ] Loading skeletons and empty states

**Design (Uma):**
- [ ] Design handoff documentation
- [ ] Component library in Figma (organized for developers)
- [ ] Design tokens export (colors, spacing, typography)
- [ ] Accessibility annotations

**QA:**
- [ ] Manual testing: Template browsing, search, filter
- [ ] Usability testing with 2-3 franchise staff (if available)
- [ ] Performance testing: Loading 100+ templates
- [ ] Cross-browser testing (Chrome, Safari, Firefox, Edge)
- [ ] Unit tests: Search and filter logic

**Sprint 3 Deliverable:**
- Complete template library with search and filters
- Template detail modal with preview
- Responsive design (mobile + desktop)

---

#### Sprint 4 (Week 7-8): Message Sending & Polish
**Goal:** Complete message sending flow and prepare for launch

**Backend:**
- [ ] Send message API endpoint (POST /api/messages/send)
- [ ] Phone number validation (libphonenumber-js)
- [ ] Message logging (sent messages history)
- [ ] Delivery status tracking (initial implementation)
- [ ] Rate limiting (story 2.6)
- [ ] Audit logging (story 2.7)
- [ ] Error handling and user-friendly error messages

**Frontend:**
- [ ] Send message wizard - Step 1: Select template (Epic 4, Story 4.2)
- [ ] Send message wizard - Step 2: Fill parameters (Epic 4, Story 4.3)
- [ ] Send message wizard - Step 3: Preview and send (Epic 4, Story 4.4)
- [ ] Recipient phone number input (Epic 4, Story 4.1)
- [ ] Send action with loading states (Epic 4, Story 4.5)
- [ ] Success and error states
- [ ] Message history page (Epic 4, Story 4.6)
- [ ] Brazilian Portuguese localization review (Epic 7, Story 7.1)
- [ ] Accessibility audit and fixes (Epic 7, Story 7.4)

**QA:**
- [ ] End-to-end testing: Complete send message flow
- [ ] Edge case testing: Invalid phone numbers, API errors, network failures
- [ ] Load testing: Send 100 messages concurrently
- [ ] Security testing: Input validation, SQL injection, XSS
- [ ] Accessibility testing: Lighthouse audit, keyboard navigation, screen reader
- [ ] User acceptance testing (UAT) with Cartão de Todos staff

**Design (Uma):**
- [ ] Design support during development (iteration)
- [ ] Review implemented designs for accuracy
- [ ] Final polish and refinements

**Sprint 4 Deliverable:**
- Complete end-to-end message sending flow
- Message history with status tracking
- Production-ready MVP
- User documentation (if time permits)

---

#### Week 8+: Launch Preparation & Deployment
**Final Steps:**
- [ ] Security audit (Aria + Rafael)
- [ ] Performance optimization (bundle size, lazy loading)
- [ ] Production environment setup (hosting, database, Redis)
- [ ] SSL certificate installation
- [ ] Domain configuration (e.g., mensagens.cartaodetodos.com.br)
- [ ] Backup and monitoring setup (Sentry, uptime monitoring)
- [ ] Deployment to production
- [ ] Smoke testing in production
- [ ] Training session with Cartão de Todos staff
- [ ] Launch announcement

**Launch Criteria (Definition of Done):**
- [ ] All MVP user stories completed and tested
- [ ] Lighthouse scores: Performance >85, Accessibility >95
- [ ] Security audit passed (no critical vulnerabilities)
- [ ] Meta API integration verified in production
- [ ] At least 2 franchise staff trained and able to send messages independently
- [ ] Documentation complete (user guide, admin guide)
- [ ] Monitoring and alerting configured
- [ ] Rollback plan documented

---

### 7.3 Phase 2 Timeline (4-6 weeks post-MVP)

**Estimated Start:** Week 10-12 (2-4 weeks after MVP launch)

**Epic Breakdown:**
1. **User Management & RBAC** (1-2 weeks)
   - Multi-user support
   - Roles: Super Admin, Admin, Editor, Sender, Viewer
   - User invitation and management

2. **Bulk Message Sending** (1-2 weeks)
   - CSV upload and parsing
   - Validation and error handling
   - Background queue processing
   - Progress tracking

3. **Media Templates** (1 week)
   - Image header support
   - Video header support
   - Media upload and storage (CDN)

4. **Basic Analytics** (1-2 weeks)
   - Message delivery statistics
   - Template usage analytics
   - Export reports (CSV, PDF)

---

### 7.4 Phase 3 Timeline (6-8 weeks post-Phase 2)

**Advanced Features:**
- Advanced analytics and A/B testing
- Template quality score dashboard
- Webhook event viewer (real-time status updates)
- Audience segmentation (saved contact lists)
- Scheduled messaging
- Multi-language template support

---

### 7.5 Key Milestones Summary

| Milestone | Target Date | Deliverable |
|-----------|-------------|-------------|
| **Pre-Development Complete** | End of Week 0 | Meta API access, team onboarded, design system finalized |
| **Sprint 1 Complete** | End of Week 2 | Authentication system, database schema, basic UI |
| **Sprint 2 Complete** | End of Week 4 | Meta API integration, template fetching, dashboard |
| **Sprint 3 Complete** | End of Week 6 | Template library, search, filters, preview |
| **Sprint 4 Complete** | End of Week 8 | Message sending, history, MVP complete |
| **MVP Launch** | Week 8-9 | Production deployment, user training |
| **Phase 2 Start** | Week 10-12 | RBAC, bulk sending, media templates |
| **Phase 2 Complete** | Week 14-18 | Enhanced features live |
| **Phase 3 Start** | Week 20-24 | Advanced analytics, webhooks |

---

## 8. Risks & Mitigations

### 8.1 Technical Risks

| Risk | Probability | Impact | Mitigation Strategy |
|------|-------------|--------|---------------------|
| **Meta API Rate Limiting During High-Volume Campaigns** | Medium | High | Implement request queueing with Bull/BullMQ, cache API responses (5-minute TTL), monitor quota usage dashboard, alert admins at 80% usage, throttle requests automatically |
| **Authentication Token Expiration Causing Service Disruption** | High | High | Automated token refresh 48 hours before expiration, admin alerts for refresh failures, display token expiration date in settings, provide clear instructions for manual token generation |
| **Template Approval Delays Blocking User Workflows** | Medium | Medium | Set user expectations (approval takes 1-24 hours), implement webhook notifications for approval status changes, provide guidance on improving approval rates, suggest using pre-approved templates |
| **Webhook Delivery Failures from Meta** | Low | Medium | Retry logic with exponential backoff (1s, 2s, 4s, 8s, 16s max), webhook event logging for debugging, fallback to polling API for delivery status if webhook fails, alert admin after 3 retry failures |
| **Database Performance Degradation at Scale** | Low | High | Database indexing on common queries (template name, status, user ID), implement pagination (50 items per page), Redis caching layer for frequently accessed data, optimize queries (use EXPLAIN ANALYZE) |
| **Third-Party Dependency Vulnerabilities** | Medium | Medium | Automated dependency scanning (Dependabot, Snyk), monthly security patch updates, pin dependency versions to avoid breaking changes, test updates in staging before production |

---

### 8.2 Business Risks

| Risk | Probability | Impact | Mitigation Strategy |
|------|-------------|--------|---------------------|
| **Low User Adoption Due to Complexity** | Medium | High | Comprehensive training program (in-person + video tutorials), in-app onboarding flow with tooltips, user testing with actual franchise staff during development, progressive disclosure of advanced features, dedicated support channel (WhatsApp, email) |
| **Meta Policy Violations Leading to Account Warnings** | Medium | Critical | Built-in template validation against Meta policies, compliance checklists before sending messages, educational tooltips explaining Meta policies, "Best Practices" guide page, warning messages for risky actions, regular policy update reviews |
| **WhatsApp Business Account Suspension** | Low | Critical | Strict adherence to Meta guidelines (opt-in, quality, content), quality monitoring dashboard with alerts, gradual sending ramp-up (don't send max volume immediately), user education on policy compliance, escalation plan if account flagged |
| **Data Privacy Breach or LGPD Non-Compliance** | Low | Critical | Encryption at rest (AES-256) and in transit (TLS 1.3), LGPD compliance audit before launch, security penetration testing by third-party, regular security training for team, incident response plan documented |
| **Competitor Emerges with Similar Solution** | Low | Medium | Focus on Cartão de Todos-specific customization (brand, workflows), franchise-centric features (not generic), tight integration with franchise operations, competitive pricing for Phase 2/3 features, continuous user feedback and iteration |
| **Budget Overrun or Timeline Delays** | Medium | High | Fixed-price contract with clear scope (MVP definition), bi-weekly sprint reviews with stakeholders, prioritize ruthlessly (MoSCoW), cut non-essential features if needed, maintain 10-15% contingency buffer |

---

### 8.3 User Experience Risks

| Risk | Probability | Impact | Mitigation Strategy |
|------|-------------|--------|---------------------|
| **Users Confused by Complex UI or Workflows** | High | Medium | User testing with actual franchise staff (3-5 users) during design phase, progressive disclosure of advanced features (hide behind "Advanced" toggle), contextual help system (tooltips, inline guidance), video walkthroughs embedded in UI, simplify to 3-5 clicks for core workflows |
| **Portuguese Translation Errors or Unnatural Language** | Medium | Medium | Native Brazilian Portuguese speaker for copywriting and review, user testing for language comprehension, avoid direct English-to-Portuguese translation (localize culturally), glossary of technical terms with Brazilian equivalents |
| **Mobile Performance Issues on Older Devices** | Medium | Medium | Mobile-first development approach, performance budgets (500KB initial bundle), lazy load non-critical resources, test on real devices (not just emulators): iPhone 8, Android mid-range, progressive enhancement (core features work without JavaScript) |
| **Inadequate Help Documentation Leading to Support Burden** | High | Low | Contextual help system (? icons with tooltips), video walkthroughs (2-3 minutes each) for key workflows, FAQ section addressing common questions, support chat integration (e.g., Intercom, Drift), knowledge base with searchable articles |
| **Users Making Mistakes (Wrong Recipient, Wrong Template)** | Medium | Medium | Confirmation step before sending messages, preview step with recipient phone number visible, "Are you sure?" dialog for bulk sends, undo option for recent sends (if Meta API supports), error prevention through validation and clear labeling |

---

### 8.4 Dependency Risks

| Risk | Probability | Impact | Mitigation Strategy |
|------|-------------|--------|---------------------|
| **Meta API Breaking Changes Without Notice** | Low | High | Subscribe to Meta developer changelog (email notifications), staging environment for testing API updates before production, version pinning (use /v18.0 explicitly, not /latest), monitor Meta developer forums and GitHub issues, maintain fallback for deprecated endpoints |
| **Third-Party Service Outages (Hosting, Database, CDN)** | Low | Medium | Multi-region hosting if budget allows, status page subscriptions for all dependencies (PagerDuty, StatusPage.io), fallback mechanisms (cached data, graceful degradation), SLA agreements with hosting provider (99.9% uptime), documented incident response plan |
| **Open Source Library Vulnerabilities (npm, PyPI)** | Medium | Medium | Automated dependency scanning (Dependabot, Snyk), regular security patch updates (monthly or on critical alerts), dependency audit before production deploy (`npm audit`, `yarn audit`), pin dependency versions (avoid `^` or `~` ranges for critical dependencies), security policy documented |
| **Team Member Unavailability (Illness, Departure)** | Low | Medium | Cross-training (2 developers know each codebase area), comprehensive code documentation and comments, architecture decision records (ADRs), knowledge transfer sessions (pair programming), backup resources identified (contractor list) |

---

### 8.5 Risk Monitoring and Review

**Risk Review Schedule:**
- **Sprint Retrospectives:** Review risks encountered during sprint
- **Monthly Risk Assessment:** Update risk register with new risks or changed probabilities
- **Pre-Launch Security Audit:** Comprehensive security and compliance review

**Risk Escalation Path:**
1. **Team Lead (Dex/Aria):** Handle low-impact risks
2. **Product Manager (Morgan):** Medium-impact business or scope risks
3. **Master Orchestrator (Orion):** High-impact or critical risks affecting timeline/budget
4. **Stakeholders (Cartão de Todos Leadership):** Critical risks requiring business decisions

**Risk Register:**
- Maintain living document in project repository (`docs/risk-register.md`)
- Track: Risk ID, Description, Probability, Impact, Owner, Status, Mitigation Actions
- Update weekly during active development

---

## 9. Dependencies

### 9.1 External Dependencies

**Meta WhatsApp Business API:**
- **Dependency:** Meta Business Manager account (verified)
- **Owner:** Cartão de Todos IT Admin (Rafael)
- **Timeline:** Account creation and verification must be complete before Sprint 2 (Week 3)
- **Risk:** Business verification can take 2-5 days (or longer if issues)
- **Mitigation:** Start account setup during Week 0

**WABA and Phone Number:**
- **Dependency:** Active WhatsApp Business Account with registered phone number
- **Owner:** Cartão de Todos IT Admin (Rafael)
- **Timeline:** Must be complete before Sprint 2 (Week 3)
- **Risk:** Phone number cannot be used in WhatsApp App simultaneously
- **Mitigation:** Dedicate a new number specifically for API use

**System User Access Token:**
- **Dependency:** Generated access token with `whatsapp_business_messaging` permission
- **Owner:** Cartão de Todos IT Admin (Rafael)
- **Timeline:** Must be available by Sprint 2, Week 3
- **Risk:** Token expiration (typically 60 days)
- **Mitigation:** Document token refresh process, implement expiration alerts

---

### 9.2 Internal Team Dependencies

**Design System and Mockups (Uma → Dex):**
- **Dependency:** Design system, component library, high-fidelity mockups
- **Required by:** Sprint 1, Week 2 (for frontend development to start)
- **Deliverables:**
  - Color palette and typography
  - Component designs (buttons, inputs, cards)
  - Login, Dashboard, Template Library mockups
  - Send Message Wizard mockups
- **Risk:** Design delays block frontend development
- **Mitigation:** Uma starts immediately in Week 0, iterative design handoff

**Database Schema (Aria → Dex):**
- **Dependency:** Database schema design and initial migration
- **Required by:** Sprint 1, Week 2
- **Deliverables:**
  - Users table (authentication)
  - Templates table (synced from Meta API)
  - Messages table (sent message logs)
  - Settings table (encrypted credentials)
  - Audit logs table
- **Risk:** Schema changes mid-development cause rework
- **Mitigation:** Thorough schema review before Sprint 2, use migrations for changes

**Meta API Client Wrapper (Aria/Dex → All):**
- **Dependency:** Reusable API client for Meta WhatsApp API
- **Required by:** Sprint 2, Week 3
- **Deliverables:**
  - Authentication handling
  - Error handling and retry logic
  - Rate limiting
  - Response parsing
- **Risk:** API client bugs affect all features
- **Mitigation:** Comprehensive unit tests, code review by both backend developers

---

### 9.3 Architecture and Infrastructure Dependencies

**Backend API (Dex → Frontend):**
- **Dependency:** RESTful API endpoints for all frontend operations
- **Required by:** Sprint 2-4 (incremental)
- **Key Endpoints:**
  - POST /api/auth/login
  - GET /api/templates
  - POST /api/messages/send
  - GET /api/messages (history)
  - POST /api/settings (credentials)
- **Risk:** API contract changes break frontend
- **Mitigation:** API documentation (OpenAPI/Swagger), contract testing

**Hosting Environment (DevOps → All):**
- **Dependency:** Production hosting environment (Vercel, AWS, Railway)
- **Required by:** Week 7 (for staging deployment), Week 8 (for production)
- **Deliverables:**
  - Frontend hosting (Vercel/Netlify)
  - Backend hosting (Railway/Render/AWS)
  - Database (managed PostgreSQL/MongoDB)
  - Redis instance (caching, sessions)
  - SSL certificate
  - Domain configuration
- **Risk:** Deployment delays prevent launch
- **Mitigation:** Set up staging environment by Week 5, production by Week 7

**Monitoring and Logging (DevOps → All):**
- **Dependency:** Monitoring, error tracking, logging infrastructure
- **Required by:** Week 7 (production deployment)
- **Deliverables:**
  - Sentry (error tracking)
  - Uptime monitoring (UptimeRobot, Pingdom)
  - Log aggregation (Datadog, New Relic, or built-in)
- **Risk:** Can't debug production issues without monitoring
- **Mitigation:** Set up monitoring in staging first, test alerts

---

### 9.4 Business and Stakeholder Dependencies

**Stakeholder Approval (Cartão de Todos → Morgan):**
- **Dependency:** PRD approval and budget confirmation
- **Required by:** Week 0 (before development starts)
- **Deliverables:**
  - Signed approval of this PRD
  - Budget authorization (R$118,000)
  - Designated stakeholder for decisions
- **Risk:** Scope creep or changing requirements mid-development
- **Mitigation:** Clear change control process, document all changes

**User Testing Participants (Cartão de Todos → Uma/Quinn):**
- **Dependency:** 3-5 franchise staff for user testing
- **Required by:** Sprint 3, Week 5-6 (usability testing)
- **Deliverables:**
  - 2-3 users for design review (Week 5)
  - 3-5 users for UAT (Week 8)
- **Risk:** No users available delays validation
- **Mitigation:** Identify participants early, schedule in advance

**Training Coordination (Cartão de Todos → Morgan):**
- **Dependency:** Coordination for post-launch training sessions
- **Required by:** Week 8-9 (launch week)
- **Deliverables:**
  - Schedule training session (2 hours)
  - Identify initial users (10-20 people)
  - Prepare training materials (slides, video)
- **Risk:** Poor training leads to low adoption
- **Mitigation:** Start planning in Week 6, dry-run training in Week 7

---

### 9.5 Dependency Management Strategy

**Tracking:**
- Maintain dependency tracker in project management tool (Jira/Linear)
- Mark dependencies on task cards
- Weekly dependency review in stand-ups

**Communication:**
- Slack channel for dependency coordination (#cartao-dependencies)
- Tag dependent team members when deliverable is ready
- Escalate blocked dependencies immediately to Orion

**Fallback Plans:**
- If design delays: Frontend starts with wireframes/placeholder UI
- If API delays: Frontend uses mock API responses
- If Meta API access delays: Use Meta's test environment initially

---

## 10. Appendices

### Appendix A: Glossary

**Technical Terms:**
- **WABA:** WhatsApp Business Account - The business entity in Meta's system that manages message templates and sends messages
- **BSP:** Business Solution Provider - Meta-approved partners offering WhatsApp API hosting and services
- **HSM:** Highly Structured Messages - Legacy term for message templates (now just called "templates")
- **Template:** Pre-approved message format required for business-initiated messages outside 24-hour window
- **Conversation:** 24-hour messaging window initiated by user or business (charged by Meta per conversation)
- **System User:** Meta's authentication method for programmatic API access (long-lived access tokens)
- **Cloud API:** Meta's hosted WhatsApp Business API (vs. on-premise API)
- **Messaging Tier:** Quality-based system that determines daily message limits (Tier 1-4)

**Compliance Terms:**
- **LGPD:** Lei Geral de Proteção de Dados - Brazil's data protection law (similar to GDPR)
- **ANPD:** Autoridade Nacional de Proteção de Dados - Brazil's data protection authority
- **Opt-In:** Explicit user consent to receive messages
- **Opt-Out:** User request to stop receiving messages (e.g., "PARAR" keyword)
- **Quality Rating:** Meta's assessment of message quality based on user feedback (High, Medium, Low)

**Project Terms:**
- **MVP:** Minimum Viable Product - Phase 1 of the project with core features only
- **PRD:** Product Requirements Document - This document
- **MoSCoW:** Prioritization framework (Must Have, Should Have, Could Have, Won't Have)
- **UAT:** User Acceptance Testing - Testing by actual users before launch
- **RBAC:** Role-Based Access Control - Permission system based on user roles

### Appendix B: Meta Template Categories Explained

| Category | Purpose | Use Cases | Opt-Out Required | Validity Window |
|----------|---------|-----------|------------------|-----------------|
| **Marketing** | Promotions, offers, announcements | New partner announcements, discount offers, event invitations, seasonal campaigns | Yes (mandatory) | 12 hours - 30 days |
| **Utility** | Account updates, order tracking, reminders | Card expiration reminders, appointment confirmations, order status, account notifications | No | 30 seconds - 12 hours |
| **Authentication** | OTP codes, login verification | Two-factor authentication, password reset, login verification | No | 30 seconds - 10 minutes |

**Key Rules:**
- **Marketing templates** must include opt-out language (e.g., "Responda PARAR para cancelar")
- **Utility templates** should provide transactional value (not promotional)
- **Authentication templates** are for security purposes only (no marketing content)

### Appendix C: Sample Templates for Cartão de Todos

**1. Marketing - New Partner Announcement**
```
Category: MARKETING
Language: pt_BR
Name: new_partner_announcement_v1

Olá {{1}}! 🎉

Nova parceria na sua região: {{2}} agora aceita o Cartão de Todos!

Aproveite {{3}}% de desconto em sua primeira compra.

Visite: https://www.cartaodetodos.com.br/parceiros/{{4}}

Cartão de Todos - Cuidando de você e sua família
Responda PARAR para não receber mais ofertas
```

**Variables:**
- {{1}}: Customer first name (e.g., "João")
- {{2}}: Partner name (e.g., "Farmácia São Paulo")
- {{3}}: Discount percentage (e.g., "20")
- {{4}}: Partner slug (e.g., "farmacia-sao-paulo")

---

**2. Utility - Card Expiration Reminder**
```
Category: UTILITY
Language: pt_BR
Name: card_expiration_reminder_v1

Olá {{1}},

Seu Cartão de Todos vence em {{2}} dias ({{3}}).

Renove agora para continuar aproveitando seus benefícios em mais de 12.000 estabelecimentos.

Renovar: https://www.cartaodetodos.com.br/renovar

Dúvidas? Responda esta mensagem.
```

**Variables:**
- {{1}}: Customer first name (e.g., "Maria")
- {{2}}: Days until expiration (e.g., "15")
- {{3}}: Expiration date (e.g., "31/12/2026")

---

**3. Authentication - Login Verification**
```
Category: AUTHENTICATION
Language: pt_BR
Name: login_verification_v1

Seu código de verificação do Cartão de Todos é:

{{1}}

Válido por 10 minutos. Não compartilhe este código.
```

**Variables:**
- {{1}}: OTP code (e.g., "123456")

---

**4. Marketing - Seasonal Campaign (Example)**
```
Category: MARKETING
Language: pt_BR
Name: seasonal_campaign_mothers_day_v1

Header: [IMAGE - Mother's Day banner]

Olá {{1}}! 💐

Dia das Mães está chegando! Cuide de quem você ama.

Ganhe até {{2}}% de desconto em consultas e exames para sua mãe.

[Button: Ver ofertas] https://www.cartaodetodos.com.br/maes

Válido até {{3}}.
Cartão de Todos
Responda PARAR para cancelar
```

**Variables:**
- {{1}}: Customer first name
- {{2}}: Discount percentage
- {{3}}: Campaign end date

### Appendix D: Meta API Error Codes and Handling

**Common Error Codes:**

| Error Code | Meaning | User Message (Portuguese) | Action |
|------------|---------|---------------------------|--------|
| 190 | Access token invalid or expired | "Credenciais expiradas. Por favor, atualize suas credenciais nas Configurações." | Prompt admin to refresh token |
| 100 | Invalid parameter | "Número de telefone inválido. Verifique o formato." | Highlight phone number field, show validation error |
| 131009 | Parameter required missing | "Parâmetros do template estão faltando. Preencha todos os campos obrigatórios." | Highlight missing fields in form |
| 131021 | Recipient not reachable | "Destinatário não pode ser alcançado. Verifique o número." | Allow retry, suggest checking number |
| 131026 | Message undeliverable | "Mensagem não pôde ser entregue. Tente novamente mais tarde." | Retry button, log for admin review |
| 131047 | Re-engagement message | "Contato não pode receber mensagens (mais de 24h sem contato). Use template aprovado." | Explain 24-hour window rule |
| 133016 | Template not found | "Template não encontrado. Sincronize seus templates novamente." | Trigger template sync |
| 429 | Rate limit exceeded | "Limite de envios atingido. Aguarde {{time}} para tentar novamente." | Show countdown timer, queue message |

**Error Handling Strategy:**
1. **Parse Meta API error response** (extract error code and message)
2. **Log full error details** server-side (for debugging)
3. **Show user-friendly message** in Portuguese (from table above)
4. **Provide actionable next steps** (retry, edit, contact support)
5. **Escalate critical errors** (alert admin via email/Slack)

### Appendix E: Brazilian Portuguese Localization Guidelines

**Date and Time Formatting:**
- Date: DD/MM/AAAA (25/12/2026)
- Time: 24-hour format (14:30)
- DateTime: 25/12/2026 às 14:30
- Relative time: "há 2 horas", "ontem", "há 3 dias"

**Number and Currency Formatting:**
- Thousands separator: . (period)
- Decimal separator: , (comma)
- Currency: R$ 1.234,56
- Percentage: 95,5%

**Phone Number Formatting:**
- International: +55 (11) 99999-9999
- National: (11) 99999-9999
- Digits only for API: 5511999999999

**Common UI Translations:**
| English | Brazilian Portuguese |
|---------|----------------------|
| Dashboard | Painel / Início |
| Templates | Modelos |
| Send Message | Enviar Mensagem |
| Settings | Configurações |
| History | Histórico |
| Analytics | Análises / Relatórios |
| Search | Buscar / Pesquisar |
| Filter | Filtrar |
| Sort | Ordenar |
| Edit | Editar |
| Delete | Excluir |
| Save | Salvar |
| Cancel | Cancelar |
| Confirm | Confirmar |
| Back | Voltar |
| Next | Próximo / Avançar |
| Previous | Anterior |
| Loading | Carregando |
| Success | Sucesso |
| Error | Erro |
| Warning | Aviso |
| Help | Ajuda |

**Tone and Voice:**
- Use "você" (formal) not "tu" (informal)
- Welcoming: "Bem-vindo ao Cartão de Todos"
- Encouraging: "Parabéns! Mensagem enviada com sucesso!"
- Helpful: "Precisa de ajuda? Clique aqui para ver o tutorial"
- Professional: "Suas credenciais foram atualizadas com segurança"

### Appendix F: Development Environment Setup

**Required Software:**
- Node.js 20+ LTS
- npm 9+ or yarn 1.22+
- Git 2.30+
- PostgreSQL 16+ OR MongoDB 6+
- Redis 6+
- Visual Studio Code (recommended IDE)

**Recommended VS Code Extensions:**
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- GitLens
- Thunder Client (API testing)

**Environment Variables (.env.example):**
```bash
# Application
NODE_ENV=development
PORT=3000
APP_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/cartao_todos
REDIS_URL=redis://localhost:6379

# Security
JWT_SECRET=your-secret-key-here
ENCRYPTION_KEY=your-encryption-key-here

# Meta API
META_API_VERSION=v18.0
META_WABA_ID=your-waba-id
META_PHONE_NUMBER_ID=your-phone-number-id
META_ACCESS_TOKEN=your-access-token

# Monitoring (optional)
SENTRY_DSN=your-sentry-dsn
```

**Getting Started:**
```bash
# Clone repository
git clone https://github.com/cartao-de-todos/whatsapp-platform.git
cd whatsapp-platform

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your credentials

# Run database migrations
npm run migrate

# Start development server
npm run dev

# Open browser
open http://localhost:3000
```

### Appendix G: Success Metrics Tracking Sheet

**Monthly Tracking (to be monitored by Morgan):**

| Metric Category | Metric | Target | Actual | Status |
|-----------------|--------|--------|--------|--------|
| **Adoption** | Active users per week | 80% | TBD | 🟡 |
| **Adoption** | User login frequency (daily) | 60% | TBD | 🟡 |
| **Efficiency** | Avg time to create template | <5 min | TBD | 🟡 |
| **Efficiency** | Template approval rate | >90% | TBD | 🟡 |
| **Efficiency** | Avg message send time | <2 min | TBD | 🟡 |
| **Business** | Messages sent per week | Baseline | TBD | 🟡 |
| **Business** | Message delivery rate | >95% | TBD | 🟡 |
| **Business** | IT support tickets reduction | 80% | TBD | 🟡 |
| **Compliance** | Template policy violations | 0 | TBD | 🟡 |
| **Technical** | Platform uptime | 99.5% | TBD | 🟡 |
| **Technical** | API response time (p95) | <2s | TBD | 🟡 |
| **User Satisfaction** | NPS Score | >50 | TBD | 🟡 |
| **User Satisfaction** | CSAT Score | >4/5 | TBD | 🟡 |

**Legend:**
- 🟢 Green: Target met or exceeded
- 🟡 Yellow: Baseline / TBD (to be measured)
- 🟠 Orange: Below target, needs attention
- 🔴 Red: Critical, immediate action required

---

## Document Approval

**Prepared by:** Morgan (Product Manager - AIOS)
**Date:** 2026-03-10
**Version:** 1.0

**Review and Approval:**

- [ ] **Aria (System Architect):** Technical feasibility reviewed
- [ ] **Uma (UX/UI Designer):** Design requirements clear and actionable
- [ ] **Dex (Developer):** Implementation feasibility confirmed
- [ ] **Quinn (QA):** Testability and acceptance criteria reviewed
- [ ] **Pax (Product Owner):** Backlog creation ready
- [ ] **River (Scrum Master):** Sprint planning feasible
- [ ] **Orion (Master Orchestrator):** Overall project alignment confirmed
- [ ] **Cartão de Todos Leadership:** Business goals and budget approved

**Next Steps:**
1. Aria creates technical architecture document
2. Uma begins design system and mockups
3. Pax creates backlog from user stories
4. River schedules Sprint 0 planning session
5. Team begins pre-development setup (Week 0)

---

**End of Product Requirements Document**
