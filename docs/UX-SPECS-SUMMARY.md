# UX Specifications - Summary & Handoff

**Status:** Complete ✅
**Date:** 2026-03-11
**Designer:** Uma (UX/UI Expert)

## Document Location
`/Users/macos/cartao-todos-meta-platform/docs/ux-specs-mock-pages.md` (1560 lines)

## Pages Designed (4 Total)

### 1. Dashboard (Enhanced) `/dashboard`
- **Current State:** 40% placeholder - needs enrichment
- **New Features:**
  - Stats cards (Messages Sent, Delivery Rate, Monthly Quota, Account Balance)
  - Trend indicators (up/down percentages)
  - Quick action buttons (Send Message, Create Template, View Report)
  - Recent activity feed (5 recent messages with status)
  - Retry failed messages capability

- **Key Components:**
  - StatCard (icon, label, value, trend, colors)
  - RecentActivityCard (message list with status indicators)
  - TrendBadge (showing direction and percentage)

- **Mock Data:**
  - `mockDashboardData` - Complete stats structure with 5 recent messages
  - Supports infinite pagination for activity

### 2. Messages (New) `/messages`
- **Purpose:** Compose and send WhatsApp messages (single/bulk/template)
- **Modes:**
  1. Single Message - Send to one recipient
  2. Bulk Upload - CSV upload with multiple recipients
  3. Template - Use saved templates with variables

- **Key Features:**
  - Phone number validation & auto-formatting
  - Message type toggle (template vs custom)
  - Character counter with 1024 limit
  - Media attachment support
  - Message preview modal
  - Schedule for later functionality
  - Recipient search

- **Key Components:**
  - MessageComposer (form container)
  - RecipientInput (with validation)
  - MessageEditor (with char counter)
  - TemplateSelector (dropdown with variables)
  - MessagePreview (modal mockup)
  - ScheduleDialog (date/time picker)

- **Mock Data:**
  - `mockTemplates` - 3 ready-to-use templates
  - `mockSingleMessageRequest` - Example send request
  - `mockScheduledMessageRequest` - Example scheduled send

### 3. Templates (New) `/templates`
- **Purpose:** Create, manage, and organize WhatsApp templates
- **Features:**
  - Create/Edit/Delete templates
  - Category organization (marketing, notification, transactional)
  - Auto-detect {{variables}} from content
  - Variable configuration (type: text/number/date, required flag)
  - Usage statistics
  - Template preview
  - Bulk operations (select multiple, delete)

- **Key Components:**
  - TemplateCard (display with edit/delete/duplicate actions)
  - TemplateForm (create/edit modal)
  - TemplateList (organized by category)
  - VariableEditor (configure template variables)
  - TemplatePreview (rendered with sample data)

- **Mock Data:**
  - `mockTemplatesResponse` - 4 templates across 3 categories
  - Complete variable definitions
  - Usage counts and creation dates
  - Status field (approved/pending/rejected)

### 4. History (New) `/history`
- **Purpose:** Message delivery logs, analytics, and audit trail
- **Features:**
  - Delivery timeline (sent → delivered → read → replied)
  - Filter by period (1d, 7d, 30d, custom)
  - Filter by status (sent, delivered, read, failed, pending)
  - Search by phone/recipient name
  - Statistics cards (total, delivery rate, read rate, reply rate)
  - Delivery trend chart (daily message count)
  - Status distribution breakdown
  - Message details modal with full timeline
  - Export to CSV/PDF
  - Paginated table (50 entries per page)

- **Key Components:**
  - MessageLogTable (virtualized for performance)
  - FilterControls (period, status, search, custom range)
  - StatsCards (quick metrics)
  - TrendChart (line graph - messages by day)
  - MessageDetailsModal (timeline + recipient info)
  - ExportDialog (format selection)

- **Mock Data:**
  - `mockHistoryResponse` - 5 messages with various statuses
  - Complete pagination info (2234 total messages)
  - Daily trend data (7 days)
  - Status distribution
  - `mockMessageDetailsResponse` - Full timeline example

## Design System Consistency

All pages follow the existing design language:

### Color Scheme
- Primary: `primary-500` (Blue) with `primary-600` hover
- Secondary: `secondary-600` (Gray)
- Status colors: Green (success), Red (error), Yellow (warning)

### Components Used
- Button (variants: primary, secondary, outline, danger)
- Input (with password toggle)
- Label (with required indicator)
- FormField (Label + Input + Error)
- Logo
- ConfirmDialog
- TestResultBanner

### Layout
- Max-width: 7xl (80rem) for content
- Header: Gradient `from-primary-500 to-primary-600`
- Background: `bg-gray-50`
- Cards: White with rounded-lg shadow

## Mockable Data Strategy

All TypeScript interfaces are designed for easy mocking:

```typescript
// Each page has complete mock structures:
- Dashboard: mockDashboardData, stats, trends, recent messages
- Messages: mockTemplates, mockSingleMessageRequest, mockScheduledMessageRequest
- Templates: mockTemplatesResponse, mockCreateTemplateRequest
- History: mockHistoryResponse, mockMessageDetailsResponse

// Can be imported and used without backend:
import { mockDashboardData } from '@/lib/mock-data';

const DashboardPage = () => {
  const [data, setData] = useState(mockDashboardData);
  // OR fetch from API when ready
};
```

## User Flows Mapped

### 6 Complete User Journeys Documented:
1. Dashboard - View overview and metrics
2. Messages - Send single custom message
3. Messages - Send bulk template-based messages
4. Templates - Create new template
5. Templates - Edit existing template
6. History - View logs with filters and export

Plus 3 additional flows:
7. Dashboard - Retry failed message
8. Templates - Delete template with confirmation
9. History - View message details timeline

## Accessibility (WCAG 2.1 AA)

All specifications include:
- Screen reader support (aria-labels, aria-invalid, aria-describedby)
- Keyboard navigation (Tab, Enter, Escape)
- Status indicators always paired with text + icon
- Color not used as only indicator
- Focus states visible on all interactive elements
- Error messages linked to form fields

## Mobile Responsive Breakpoints

- Mobile (< 640px): Single column, stacked cards
- Tablet (640-1024px): 2-column grid
- Desktop (> 1024px): Full width, multi-column grid

## Handoff to Aria (System Architect)

Aria should use this document to:
1. Define component hierarchy based on all described components
2. Create folder structure in `/frontend/src/components/`
3. Define TypeScript prop interfaces for each component
4. Plan composition using Atomic Design (Atoms → Molecules → Organisms)
5. Map out data flow and state management

## Handoff to Dex (Full Stack Developer)

Dex should use this document to:
1. Create page components at `/frontend/src/app/[page]/page.tsx`
2. Build all listed components with mock data
3. Implement form validation and error handling
4. Create hooks for data fetching (with mock fallback)
5. Add interactive features (filters, search, pagination)
6. Ensure responsive design on all breakpoints

## Handoff to Quinn (QA)

Quinn should use this document to:
1. Extract test scenarios from each user flow
2. Create acceptance criteria per component
3. Define E2E test cases for all flows
4. Verify accessibility compliance
5. Test on multiple devices and screen sizes
6. Create test data fixtures matching mock structures

---

**Next Steps:** Aria → Define architecture, then Dex → Implement with mocks, then Quinn → QA review
