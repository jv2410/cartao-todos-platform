# UX Design Specifications - Mock Pages

**Document Version:** 1.0
**Date:** 2026-03-11
**Designer:** Uma (UX/UI Expert)
**Project:** Cartão de Todos - WhatsApp Business Message Platform
**Status:** Design Phase - Ready for Implementation

---

## Design System Summary

### Color Palette
- **Primary:** `primary-500` (Blue) - Main brand color
- **Primary Dark:** `primary-600` - Hover states
- **Secondary:** `secondary-600` (Gray) - Secondary actions
- **Danger:** Red (#DC2626) - Destructive actions
- **Success:** Green (#16A34A) - Confirmations
- **Warning:** Yellow (#EA8B34) - Alerts
- **Neutral:** Gray (#F3F4F6) - Backgrounds

### Typography
- **Headers:** Semibold (600) - Primary titles
- **Body:** Regular (400) - Content text
- **Small:** 12px - Helper text, metadata
- **Buttons:** Medium (500) - Call-to-action

### Spacing
- **Compact:** 4px, 8px - Tight spacing
- **Standard:** 16px, 24px - Default spacing
- **Generous:** 32px, 48px - Section spacing
- **Max Width:** 7xl (80rem) for content container

### Components Available
- Button (variants: primary, secondary, outline, danger)
- Input (with password toggle)
- Label (with required indicator)
- FormField (Molecule - Label + Input + Error)
- Logo
- ConfirmDialog
- TestResultBanner

---

## Page 1: Dashboard (Enhancement)

### 1.1 Overview
**URL:** `/dashboard`
**Purpose:** Main hub showing system overview, quick statistics, recent activity, and quick actions
**User:** Small business owner after login
**Current State:** 40% placeholder - needs enrichment
**Priority:** P0 (core feature)

### 1.2 Layout Structure

```
┌─ HEADER (gradient: primary-500 → primary-600) ──────────────────┐
│  Logo + Dashboard Title  |  User Name + Logout Button           │
└──────────────────────────────────────────────────────────────────┘

┌─ PASSWORD WARNING (conditional) ─────────────────────────────────┐
│  ⚠️ Change password required    [Change Now]                     │
└──────────────────────────────────────────────────────────────────┘

┌─ MAIN CONTENT (max-w-7xl, gray-50 background) ───────────────────┐
│                                                                   │
│  ┌─ STATS SECTION ────────────────────────────────────────────┐ │
│  │ Messages Sent  │ Delivery Rate  │ Monthly Quota  │ Credits  │ │
│  │    1,234       │     94.2%      │    450/500     │  $125.50 │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  ┌─ QUICK ACTIONS ────────────────────────────────────────────┐ │
│  │  ✉️  Send Message  │  📋 Create Template  │  📊 View Report  │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  ┌─ RECENT ACTIVITY ──────────────────────────────────────────┐ │
│  │ Last 5 messages sent with status                           │ │
│  │  1. "Hello World" → John (+55 11 99999-9999)  ✓ Delivered   │ │
│  │  2. "Welcome!" → Jane (+55 11 88888-8888)     ✓ Read        │ │
│  │  3. "Testing..." → Bob (+55 11 77777-7777)    ⏳ Pending    │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

### 1.3 Key Components

#### Stats Card Component
```typescript
interface StatCard {
  icon: 'message' | 'trend' | 'quota' | 'credit';
  label: string;
  value: string | number;
  unit?: string;
  trend?: {
    direction: 'up' | 'down';
    percentage: number;
    period: string; // "vs yesterday", "vs last week"
  };
  backgroundColor: string; // Tailwind bg color
  textColor: string;
}
```

**Props:**
- `icon`: SVG icon type
- `label`: "Messages Sent", "Delivery Rate", etc.
- `value`: Main number/stat
- `unit`: Optional suffix ("%", "$", etc.)
- `trend`: Optional comparison data
- `backgroundColor`: Card background (e.g., "blue-50")
- `textColor`: Text color (e.g., "blue-900")

#### Recent Activity Card
```typescript
interface Message {
  id: string;
  content: string;
  recipientName: string;
  recipientPhone: string;
  status: 'pending' | 'sent' | 'delivered' | 'read' | 'failed';
  sentAt: Date;
  templateId?: string;
}

interface RecentActivityProps {
  messages: Message[];
  onViewAll: () => void;
  onRetry: (messageId: string) => void;
}
```

**Behavior:**
- Shows 5 most recent messages
- Status icons: ⏳ (pending), ✓ (sent), ✓✓ (delivered), ✓✓ (read), ✗ (failed)
- Hover state: Show retry button for failed messages
- Click: Open message details

### 1.4 Mock Data Structure

```typescript
interface DashboardData {
  stats: {
    totalMessagesSent: number;
    deliveryRate: number; // percentage
    monthlyQuotaUsed: number;
    monthlyQuotaTotal: number;
    accountBalance: number;
    currency: string;
  };
  trends: {
    messagesSentTrend: {
      direction: 'up' | 'down';
      percentage: number;
    };
    deliveryRateTrend: {
      direction: 'up' | 'down';
      percentage: number;
    };
  };
  recentMessages: Array<{
    id: string;
    content: string;
    recipientName: string;
    recipientPhone: string;
    status: 'pending' | 'sent' | 'delivered' | 'read' | 'failed';
    sentAt: string; // ISO timestamp
    templateId?: string;
    errorMessage?: string;
  }>;
  quickLinks: Array<{
    id: string;
    icon: 'message' | 'template' | 'report';
    label: string;
    href: string;
    description: string;
  }>;
}

// Mock Data Example
const mockDashboardData: DashboardData = {
  stats: {
    totalMessagesSent: 1234,
    deliveryRate: 94.2,
    monthlyQuotaUsed: 450,
    monthlyQuotaTotal: 500,
    accountBalance: 125.50,
    currency: 'BRL'
  },
  trends: {
    messagesSentTrend: {
      direction: 'up',
      percentage: 12.5
    },
    deliveryRateTrend: {
      direction: 'up',
      percentage: 2.3
    }
  },
  recentMessages: [
    {
      id: 'msg-001',
      content: 'Hello World',
      recipientName: 'John Doe',
      recipientPhone: '+55 11 99999-9999',
      status: 'delivered',
      sentAt: '2026-03-11T15:30:00Z',
      templateId: 'tpl-001'
    },
    // ... more messages
  ],
  quickLinks: [
    {
      id: 'link-1',
      icon: 'message',
      label: 'Send Message',
      href: '/messages',
      description: 'Send new WhatsApp message'
    },
    {
      id: 'link-2',
      icon: 'template',
      label: 'Create Template',
      href: '/templates',
      description: 'Manage message templates'
    },
    {
      id: 'link-3',
      icon: 'report',
      label: 'View Report',
      href: '/history',
      description: 'Analytics and message history'
    }
  ]
};
```

### 1.5 User Flows

**Flow 1: View Dashboard**
```
User navigates to /dashboard
  ↓
Check authentication (useAuth hook)
  ↓
Render header + warning (if applicable)
  ↓
Load dashboard data from API/mock
  ↓
Render stats cards with optional trends
  ↓
Render quick action buttons
  ↓
Render recent activity list
  ↓
User can click quick actions → navigate to feature pages
```

**Flow 2: Retry Failed Message**
```
User sees failed message in recent activity
  ↓
Hover reveals retry button
  ↓
Click "Retry"
  ↓
API call to resend message
  ↓
Toast notification (success/error)
  ↓
Recent activity updates
```

### 1.6 Interaction Patterns

- **Stats Cards:** Hover effect (subtle shadow increase)
- **Quick Action Buttons:** Full-width on mobile, 3-column grid on desktop
- **Recent Activity:** Expandable rows, click to view full message
- **Trends:** Display as +12.5% or -2.3% with color coding (green/red)
- **Loading State:** Skeleton loaders for stats and activity
- **Empty State:** "No messages sent yet" with CTA to send first message

---

## Page 2: Messages (New)

### 2.1 Overview
**URL:** `/messages`
**Purpose:** Compose and send individual or bulk WhatsApp messages
**User:** Business owner with valid API credentials
**Type:** Primary action page
**Priority:** P0 (core feature)

### 2.2 Layout Structure

```
┌─ HEADER (gradient: primary-500 → primary-600) ──────────────────┐
│  Logo + "Send Messages"  |  User Name + Logout Button           │
└──────────────────────────────────────────────────────────────────┘

┌─ MAIN CONTENT (max-w-4xl) ────────────────────────────────────────┐
│                                                                   │
│  ┌─ SEND MODE TOGGLE ──────────────────────────────────────────┐ │
│  │  [Single Message]  [Bulk Upload]  [Template]                 │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  ┌─ FORM SECTION (varies by mode) ──────────────────────────────┐ │
│  │                                                               │ │
│  │  Recipient Phone Number *                                    │ │
│  │  [+55 11 99999-9999                    ]   [Clear]  [Search] │ │
│  │  💡 Format: +55 11 9999-9999                                  │ │
│  │                                                               │ │
│  │  Message Type *                                              │ │
│  │  [ ] Use Template  [ ] Custom Message                        │ │
│  │                                                               │ │
│  │  [If Template Selected]                                      │ │
│  │  Select Template *                                           │ │
│  │  [Dropdown: "Welcome Message", "Order Confirm", ...]         │ │
│  │                                                               │ │
│  │  [If Custom Message]                                         │ │
│  │  Message Content *                                           │ │
│  │  ┌────────────────────────────────────────────────────────┐ │ │
│  │  │ Hello! This is a test message...                        │ │ │
│  │  │                                                         │ │ │
│  │  │                                                  0/1024  │ │ │
│  │  └────────────────────────────────────────────────────────┘ │ │
│  │  Max 1024 characters                                         │ │
│  │                                                               │ │
│  │  [Add Media]  [Preview Message]                              │ │
│  │                                                               │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  ┌─ PREVIEW SECTION (collapsed initially) ──────────────────────┐ │
│  │  📱 Message Preview                                          │ │
│  │  ┌─────────────────────────────────────────────────────────┐ │ │
│  │  │ WhatsApp Message                                        │ │ │
│  │  │                                                         │ │ │
│  │  │ To: John Doe (+55 11 99999-9999)                      │ │ │
│  │  │ Content: Hello! This is a test message...             │ │ │
│  │  │ Status: Ready to send                                 │ │ │
│  │  └─────────────────────────────────────────────────────────┘ │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  ┌─ ACTION BUTTONS ──────────────────────────────────────────────┐ │
│  │  [Schedule for Later]  [Send Now]                            │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

### 2.3 Key Components

#### Message Composer Card
```typescript
interface MessageComposerProps {
  mode: 'single' | 'bulk' | 'template';
  recipientPhone?: string;
  messageContent?: string;
  selectedTemplate?: string;
  mediaAttachments?: MediaFile[];
  onModeChange: (mode: 'single' | 'bulk' | 'template') => void;
  onPhoneChange: (phone: string) => void;
  onContentChange: (content: string) => void;
  onTemplateSelect: (templateId: string) => void;
  onMediaAdd: (file: MediaFile) => void;
  onMediaRemove: (index: number) => void;
  onPreview: () => void;
  onSend: () => void;
  onSchedule: () => void;
}
```

#### Recipient Validation
```typescript
interface RecipientValidation {
  isValid: boolean;
  phone: string;
  formattedPhone: string;
  countryCode: string;
  areaCode: string;
  message?: string; // "Invalid format" or "Country not supported"
  lastChecked: Date;
}
```

### 2.4 Mock Data Structure

```typescript
interface SendMessageRequest {
  mode: 'single' | 'bulk' | 'template';
  recipients: Array<{
    name?: string;
    phone: string;
    variables?: Record<string, string>; // For template variables
  }>;
  messageType: 'template' | 'custom';
  templateId?: string;
  customContent?: string;
  mediaAttachments?: Array<{
    id: string;
    type: 'image' | 'document' | 'video';
    url: string;
    mimeType: string;
    size: number;
  }>;
  scheduledFor?: Date; // If scheduled, null for immediate
}

interface SendMessageResponse {
  success: boolean;
  messageId: string;
  status: 'sent' | 'pending' | 'scheduled';
  recipientCount: number;
  estimatedDeliveryTime: string;
  timestamp: string;
}

// Mock Templates Data
interface Template {
  id: string;
  name: string;
  category: 'marketing' | 'notification' | 'transactional';
  content: string;
  variables: string[]; // ["firstName", "orderId"]
  createdAt: string;
  lastUsed?: string;
  usageCount: number;
}

const mockTemplates: Template[] = [
  {
    id: 'tpl-001',
    name: 'Welcome Message',
    category: 'marketing',
    content: 'Hello {{firstName}}! Welcome to our service. Thank you for choosing us!',
    variables: ['firstName'],
    createdAt: '2026-03-01T10:00:00Z',
    usageCount: 45
  },
  {
    id: 'tpl-002',
    name: 'Order Confirmation',
    category: 'transactional',
    content: 'Your order #{{orderId}} has been confirmed. Total: R$ {{amount}}. Delivery: {{deliveryDate}}',
    variables: ['orderId', 'amount', 'deliveryDate'],
    createdAt: '2026-03-05T12:00:00Z',
    usageCount: 342
  },
  {
    id: 'tpl-003',
    name: 'Promotion Alert',
    category: 'marketing',
    content: 'Limited time offer! {{promoName}} - Save {{discount}}% on {{productCategory}}. Use code: {{promoCode}}',
    variables: ['promoName', 'discount', 'productCategory', 'promoCode'],
    createdAt: '2026-02-20T08:00:00Z',
    usageCount: 156
  }
];

// Mock Single Message Send Request
const mockSingleMessageRequest: SendMessageRequest = {
  mode: 'single',
  recipients: [
    {
      name: 'John Doe',
      phone: '+55 11 99999-9999'
    }
  ],
  messageType: 'custom',
  customContent: 'Hello! This is a test message from Cartão de Todos.',
  mediaAttachments: [],
  scheduledFor: null
};

// Mock Scheduled Message Request
const mockScheduledMessageRequest: SendMessageRequest = {
  mode: 'single',
  recipients: [
    {
      name: 'Jane Smith',
      phone: '+55 21 98888-8888'
    }
  ],
  messageType: 'template',
  templateId: 'tpl-001',
  mediaAttachments: [],
  scheduledFor: new Date('2026-03-12T09:00:00Z')
};
```

### 2.5 User Flows

**Flow 1: Send Single Message (Custom)**
```
User clicks "Send Messages"
  ↓
Lands on /messages page
  ↓
Selects "Single Message" mode
  ↓
Enters phone number → validates format
  ↓
Selects "Custom Message"
  ↓
Types message content (real-time char count)
  ↓
Optional: Add media attachment
  ↓
Optional: Click "Preview" to see formatted message
  ↓
Optional: Schedule for later or send immediately
  ↓
Confirmation dialog
  ↓
API call to backend
  ↓
Success toast notification
  ↓
Redirects to /history or stays on page
```

**Flow 2: Send Template Message**
```
User selects "Bulk Upload" mode
  ↓
Selects "Use Template"
  ↓
Chooses template from dropdown
  ↓
Template variables appear (if any)
  ↓
Fills in template variables (or uses from CSV)
  ↓
Uploads CSV with recipients
  ↓
Preview shows first 3 recipients
  ↓
Click "Send Now"
  ↓
Confirmation dialog (show count: "Send to 150 recipients?")
  ↓
API call with bulk payload
  ↓
Success notification with job ID
  ↓
Redirect to /history with filter for this job
```

### 2.6 Interaction Patterns

- **Phone Input:** Auto-format on blur (add +55, format area code)
- **Character Counter:** Live update, visual warning at 90%
- **Template Selection:** Dropdown with search, show variable placeholders
- **Preview:** Modal showing formatted WhatsApp message mockup
- **Schedule:** Date/time picker, show "Scheduled for Mar 12, 9:00 AM"
- **Bulk Upload:** Drag-drop area, show parsing progress, preview first 5 rows
- **Error Handling:** Toast for invalid phone, inline error for missing fields

---

## Page 3: Templates (New)

### 3.1 Overview
**URL:** `/templates`
**Purpose:** Create, manage, and organize WhatsApp Business templates
**User:** Business owner managing message templates
**Type:** Management/CRUD page
**Priority:** P1 (important feature)

### 3.2 Layout Structure

```
┌─ HEADER (gradient: primary-500 → primary-600) ──────────────────┐
│  Logo + "Templates"  |  User Name + Logout Button               │
└──────────────────────────────────────────────────────────────────┘

┌─ MAIN CONTENT (max-w-6xl) ────────────────────────────────────────┐
│                                                                   │
│  ┌─ TOOLBAR ──────────────────────────────────────────────────┐ │
│  │  [+ New Template]  [Filter: All ▼]  [Search: ________]     │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  ┌─ TEMPLATES LIST ───────────────────────────────────────────┐ │
│  │                                                               │ │
│  │ Category: Marketing (3 templates)                            │ │
│  │ ┌─────────────────────────────────────────────────────────┐ │ │
│  │ │ Welcome Message                                    📝 🗑️  │ │ │
│  │ │ "Hello {{firstName}}! Welcome to our service..."        │ │ │
│  │ │ Variables: firstName | Created: 3/1  | Used: 45x        │ │ │
│  │ └─────────────────────────────────────────────────────────┘ │ │
│  │                                                               │ │
│  │ ┌─────────────────────────────────────────────────────────┐ │ │
│  │ │ Promotion Alert                                    📝 🗑️  │ │ │
│  │ │ "Limited time offer! {{promoName}} - {{discount}}%..."   │ │ │
│  │ │ Variables: promoName, discount, productCategory, ...   │ │ │
│  │ │ Created: 2/20 | Used: 156x                              │ │ │
│  │ └─────────────────────────────────────────────────────────┘ │ │
│  │                                                               │ │
│  │ Category: Transactional (1 template)                         │ │
│  │ ┌─────────────────────────────────────────────────────────┐ │ │
│  │ │ Order Confirmation                                 📝 🗑️  │ │ │
│  │ │ "Your order #{{orderId}} has been confirmed..."         │ │ │
│  │ │ Variables: orderId, amount, deliveryDate                │ │ │
│  │ │ Created: 3/5  | Used: 342x                              │ │ │
│  │ └─────────────────────────────────────────────────────────┘ │ │
│  │                                                               │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘

[Modal: New/Edit Template]
┌─────────────────────────────────────────────────────────────────┐
│ Create New Template                                    [×]       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ Template Name *                                                 │
│ [Welcome Message              ]                                 │
│                                                                 │
│ Category *                                                      │
│ [Marketing ▼]  [Notification ▼]  [Transactional ▼]             │
│                                                                 │
│ Template Content *                                              │
│ ┌────────────────────────────────────────────────────────────┐ │
│ │ Hello {{firstName}}! Welcome to our service.              │ │
│ │ We're excited to help you...                              │ │
│ │                                                    0/1024  │ │
│ └────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ Template Variables (auto-detected from content)                │
│ ┌────────────────────────────────────────────────────────────┐ │
│ │ Variable: firstName  [Type: text ▼]  [Required: Yes ✓]    │ │
│ │ Variable: ... [add more]                                  │ │
│ └────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ [Cancel]  [Save Template]                                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 3.3 Key Components

#### Template Card
```typescript
interface TemplateCardProps {
  template: Template;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onUseNow: (id: string) => void;
}
```

#### Template Form Modal
```typescript
interface TemplateFormProps {
  isOpen: boolean;
  mode: 'create' | 'edit';
  template?: Template;
  onSubmit: (data: TemplateFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

interface TemplateFormData {
  name: string;
  category: 'marketing' | 'notification' | 'transactional';
  content: string;
  variables: Array<{
    name: string;
    type: 'text' | 'number' | 'date';
    required: boolean;
    description?: string;
  }>;
}
```

### 3.4 Mock Data Structure

```typescript
interface TemplateVariable {
  name: string;
  type: 'text' | 'number' | 'date';
  required: boolean;
  description?: string;
  placeholder?: string;
}

interface Template {
  id: string;
  name: string;
  category: 'marketing' | 'notification' | 'transactional';
  content: string; // Contains {{variableName}} placeholders
  variables: TemplateVariable[];
  createdAt: string;
  updatedAt: string;
  lastUsedAt?: string;
  usageCount: number;
  status: 'approved' | 'pending' | 'rejected';
  statusMessage?: string;
}

interface TemplatesResponse {
  templates: Template[];
  categories: {
    marketing: Template[];
    notification: Template[];
    transactional: Template[];
  };
  totalCount: number;
  stats: {
    totalTemplates: number;
    mostUsedTemplate: {
      id: string;
      name: string;
      usageCount: number;
    };
    averageVariablesPerTemplate: number;
  };
}

// Mock Templates List
const mockTemplatesResponse: TemplatesResponse = {
  templates: [
    {
      id: 'tpl-001',
      name: 'Welcome Message',
      category: 'marketing',
      content: 'Hello {{firstName}}! Welcome to our service. Thank you for choosing us!',
      variables: [
        {
          name: 'firstName',
          type: 'text',
          required: true,
          placeholder: 'John'
        }
      ],
      createdAt: '2026-03-01T10:00:00Z',
      updatedAt: '2026-03-01T10:00:00Z',
      usageCount: 45,
      status: 'approved'
    },
    {
      id: 'tpl-002',
      name: 'Order Confirmation',
      category: 'transactional',
      content: 'Your order #{{orderId}} has been confirmed. Total: R$ {{amount}}. Delivery: {{deliveryDate}}',
      variables: [
        {
          name: 'orderId',
          type: 'text',
          required: true,
          placeholder: '12345'
        },
        {
          name: 'amount',
          type: 'number',
          required: true,
          placeholder: '99.99'
        },
        {
          name: 'deliveryDate',
          type: 'date',
          required: true,
          placeholder: '2026-03-15'
        }
      ],
      createdAt: '2026-03-05T12:00:00Z',
      updatedAt: '2026-03-05T12:00:00Z',
      lastUsedAt: '2026-03-10T15:30:00Z',
      usageCount: 342,
      status: 'approved'
    },
    {
      id: 'tpl-003',
      name: 'Promotion Alert',
      category: 'marketing',
      content: 'Limited time offer! {{promoName}} - Save {{discount}}% on {{productCategory}}. Use code: {{promoCode}}',
      variables: [
        {
          name: 'promoName',
          type: 'text',
          required: true,
          placeholder: 'Spring Sale'
        },
        {
          name: 'discount',
          type: 'number',
          required: true,
          placeholder: '20'
        },
        {
          name: 'productCategory',
          type: 'text',
          required: true,
          placeholder: 'Electronics'
        },
        {
          name: 'promoCode',
          type: 'text',
          required: true,
          placeholder: 'SPRING20'
        }
      ],
      createdAt: '2026-02-20T08:00:00Z',
      updatedAt: '2026-03-10T10:00:00Z',
      usageCount: 156,
      status: 'approved'
    },
    {
      id: 'tpl-004',
      name: 'Appointment Reminder',
      category: 'notification',
      content: 'Hi {{firstName}}, reminder: You have an appointment on {{appointmentDate}} at {{appointmentTime}} at {{location}}.',
      variables: [
        {
          name: 'firstName',
          type: 'text',
          required: true,
          placeholder: 'John'
        },
        {
          name: 'appointmentDate',
          type: 'date',
          required: true,
          placeholder: '2026-03-20'
        },
        {
          name: 'appointmentTime',
          type: 'text',
          required: true,
          placeholder: '14:30'
        },
        {
          name: 'location',
          type: 'text',
          required: true,
          placeholder: 'Office Building A'
        }
      ],
      createdAt: '2026-02-28T14:00:00Z',
      updatedAt: '2026-03-10T09:00:00Z',
      lastUsedAt: '2026-03-08T11:00:00Z',
      usageCount: 87,
      status: 'approved'
    }
  ],
  categories: {
    marketing: [
      // Welcome Message, Promotion Alert
    ],
    notification: [
      // Appointment Reminder
    ],
    transactional: [
      // Order Confirmation
    ]
  },
  totalCount: 4,
  stats: {
    totalTemplates: 4,
    mostUsedTemplate: {
      id: 'tpl-002',
      name: 'Order Confirmation',
      usageCount: 342
    },
    averageVariablesPerTemplate: 3.25
  }
};

// Create Template Request
interface CreateTemplateRequest {
  name: string;
  category: 'marketing' | 'notification' | 'transactional';
  content: string;
  variables: TemplateVariable[];
}

const mockCreateTemplateRequest: CreateTemplateRequest = {
  name: 'Birthday Greeting',
  category: 'marketing',
  content: 'Happy birthday {{firstName}}! Enjoy {{discount}}% off your favorite items!',
  variables: [
    {
      name: 'firstName',
      type: 'text',
      required: true,
      placeholder: 'John'
    },
    {
      name: 'discount',
      type: 'number',
      required: true,
      placeholder: '15'
    }
  ]
};
```

### 3.5 User Flows

**Flow 1: Create New Template**
```
User clicks "+ New Template"
  ↓
Modal opens with empty form
  ↓
Enters template name
  ↓
Selects category (marketing/notification/transactional)
  ↓
Types template content with {{variables}}
  ↓
System auto-detects variables and lists them
  ↓
User configures variable types (text/number/date)
  ↓
Marks required fields
  ↓
Preview shows rendered template with sample data
  ↓
Click "Save Template"
  ↓
API call to backend
  ↓
Success notification
  ↓
Modal closes, new template appears in list
```

**Flow 2: Edit Existing Template**
```
User clicks edit (📝) on template card
  ↓
Modal opens with template data
  ↓
User modifies content/variables
  ↓
Changes auto-trigger preview update
  ↓
Click "Save"
  ↓
Confirmation dialog (warn: "Used 342 times")
  ↓
API call to update
  ↓
Success notification
  ↓
List updates
```

**Flow 3: Delete Template**
```
User clicks delete (🗑️) on template
  ↓
Confirmation dialog
  ↓
Shows warning: "This template has been used 342 times"
  ↓
Offers option to archive instead of delete
  ↓
User confirms deletion
  ↓
API call to delete
  ↓
Template removed from list
  ↓
Toast notification
```

### 3.6 Interaction Patterns

- **Variable Detection:** Auto-detect {{variableName}} from content, highlight in editor
- **Variable Colors:** Color-code variables for easy identification
- **Search/Filter:** Filter by category, name, or usage count
- **Sorting:** Sort by creation date, usage count, name
- **Drag-drop:** Reorder templates within category (optional)
- **Bulk Actions:** Select multiple, delete/archive in bulk
- **Usage Stats:** Show "Used 342 times" with mini chart trend
- **Archive vs Delete:** Archive keeps history, delete is permanent

---

## Page 4: History (New)

### 4.1 Overview
**URL:** `/history`
**Purpose:** View message delivery logs, analytics, and audit trail
**User:** Business owner reviewing past messages
**Type:** Analytics/reporting page
**Priority:** P1 (important feature)

### 4.2 Layout Structure

```
┌─ HEADER (gradient: primary-500 → primary-600) ──────────────────┐
│  Logo + "Message History"  |  User Name + Logout Button         │
└──────────────────────────────────────────────────────────────────┘

┌─ MAIN CONTENT (max-w-7xl) ────────────────────────────────────────┐
│                                                                   │
│  ┌─ FILTERS & CONTROLS ───────────────────────────────────────┐ │
│  │ [Period: Last 7 Days ▼]  [Status: All ▼]  [Search: ____]   │ │
│  │ [Export CSV]  [Export PDF]  [Clear Filters]                 │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  ┌─ QUICK STATS ──────────────────────────────────────────────┐ │
│  │ Total Sent  │  Delivered  │  Read  │  Failed  │  Pending   │ │
│  │   1,234     │    1,162    │  950   │    12    │    60      │ │
│  │             │    94.2%    │ 77%    │   0.9%   │   4.8%     │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  ┌─ DELIVERY TREND (CHART) ───────────────────────────────────┐ │
│  │  Messages Sent - Last 7 Days                               │ │
│  │  500 ┐                                                      │ │
│  │      │     ╱╲                                                │ │
│  │  400 ┤    ╱  ╲      ╱╲                                       │ │
│  │      │   ╱    ╲    ╱  ╲      ╱╲                              │ │
│  │  300 ┤  ╱      ╲  ╱    ╲    ╱  ╲                             │ │
│  │      │ ╱        ╲╱      ╲  ╱    ╲                            │ │
│  │  200 ┤                   ╲╱      ╲                           │ │
│  │      │                            ╲                          │ │
│  │  100 ┤                             ╲                         │ │
│  │      │                              ╲                        │ │
│  │    0 └──────────────────────────────────                     │ │
│  │      Mon    Tue    Wed    Thu    Fri    Sat    Sun          │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  ┌─ MESSAGE LOG (TABLE) ──────────────────────────────────────┐ │
│  │ Phone        │ Template/Content  │ Status   │ Sent      │ Rply │
│  ├──────────────────────────────────────────────────────────────┤ │
│  │ +55 11 9999- │ Order Confirm... │ Delivered│ 3/11 15:30│ ✓  │ │
│  │ 9999         │ #ORD-12345       │ Read     │ 2h ago    │ Yes │ │
│  ├──────────────────────────────────────────────────────────────┤ │
│  │ +55 21 8888- │ Welcome Message  │ Delivered│ 3/11 14:00│    │ │
│  │ 8888         │ Hello Jane!      │          │ 3h ago    │ No  │ │
│  ├──────────────────────────────────────────────────────────────┤ │
│  │ +55 31 7777- │ Promotion Alert  │ Pending  │ 3/11 16:00│    │ │
│  │ 7777         │ Save 20%...      │          │ 1h ago    │ -   │ │
│  ├──────────────────────────────────────────────────────────────┤ │
│  │ +55 47 6666- │ Custom Message   │ Failed   │ 3/11 12:30│    │ │
│  │ 6666         │ Test message...  │ (Invalid │ 4h ago    │ -   │ │
│  │              │                  │  number) │           │     │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  ┌─ PAGINATION ──────────────────────────────────────────────────┐ │
│  │  < 1 2 3 4 5 ... 45 >  |  Showing 1-50 of 2,234 messages     │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘

[Modal: Message Details]
┌─────────────────────────────────────────────────────────────────┐
│ Message Details                                        [×]       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ To: John Doe (+55 11 99999-9999)                                │
│ Template: Order Confirmation                                    │
│ Content: Your order #12345 has been confirmed...               │
│ Status: Delivered ✓                                             │
│                                                                 │
│ Timeline:                                                       │
│ 3/11 15:30:00 - Sent to WhatsApp                               │
│ 3/11 15:30:15 - Delivered to recipient                         │
│ 3/11 15:35:22 - Read by recipient                              │
│ 3/11 15:40:10 - Reply received: "Thank you!"                   │
│                                                                 │
│ [Export Details]  [Close]                                       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 4.3 Key Components

#### Message Log Table
```typescript
interface MessageLogEntry {
  id: string;
  recipientPhone: string;
  recipientName?: string;
  templateId?: string;
  templateName?: string;
  customContent?: string;
  status: 'sent' | 'delivered' | 'read' | 'failed' | 'pending';
  sentAt: Date;
  deliveredAt?: Date;
  readAt?: Date;
  failureReason?: string;
  replyReceived?: boolean;
  replyContent?: string;
  replyAt?: Date;
  mediaCount: number;
}

interface MessageLogTableProps {
  messages: MessageLogEntry[];
  isLoading?: boolean;
  onRowClick: (messageId: string) => void;
  onExport: (format: 'csv' | 'pdf') => void;
  pageSize?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}
```

#### Filter Controls
```typescript
interface HistoryFilters {
  period: '1day' | '7days' | '30days' | 'custom';
  status: 'all' | 'sent' | 'delivered' | 'read' | 'failed' | 'pending';
  templateId?: string;
  searchQuery?: string;
  dateRange?: {
    from: Date;
    to: Date;
  };
}

interface FilterControlsProps {
  filters: HistoryFilters;
  templates: Template[];
  onFilterChange: (filters: HistoryFilters) => void;
  onExport: (format: 'csv' | 'pdf') => void;
  onClearFilters: () => void;
}
```

### 4.4 Mock Data Structure

```typescript
interface MessageLogEntry {
  id: string;
  recipientPhone: string;
  recipientName?: string;
  templateId?: string;
  templateName?: string;
  customContent?: string;
  status: 'sent' | 'delivered' | 'read' | 'failed' | 'pending';
  sentAt: string; // ISO timestamp
  deliveredAt?: string;
  readAt?: string;
  failureReason?: string;
  replyReceived: boolean;
  replyContent?: string;
  replyAt?: string;
  mediaCount: number;
}

interface HistoryResponse {
  messages: MessageLogEntry[];
  pagination: {
    totalCount: number;
    pageSize: number;
    currentPage: number;
    totalPages: number;
  };
  stats: {
    totalSent: number;
    delivered: number;
    read: number;
    failed: number;
    pending: number;
    deliveryRate: number;
    readRate: number;
    replyRate: number;
  };
  trends: {
    dailyCounts: Array<{
      date: string;
      count: number;
    }>;
    statusDistribution: {
      delivered: number;
      read: number;
      failed: number;
      pending: number;
    };
  };
}

// Mock History Response
const mockHistoryResponse: HistoryResponse = {
  messages: [
    {
      id: 'msg-001',
      recipientPhone: '+55 11 99999-9999',
      recipientName: 'John Doe',
      templateId: 'tpl-002',
      templateName: 'Order Confirmation',
      customContent: 'Your order #12345 has been confirmed. Total: R$ 299.90. Delivery: 2026-03-15',
      status: 'read',
      sentAt: '2026-03-11T15:30:00Z',
      deliveredAt: '2026-03-11T15:30:15Z',
      readAt: '2026-03-11T15:35:22Z',
      replyReceived: true,
      replyContent: 'Thank you!',
      replyAt: '2026-03-11T15:40:10Z',
      mediaCount: 0
    },
    {
      id: 'msg-002',
      recipientPhone: '+55 21 88888-8888',
      recipientName: 'Jane Smith',
      templateId: 'tpl-001',
      templateName: 'Welcome Message',
      customContent: 'Hello Jane! Welcome to our service. Thank you for choosing us!',
      status: 'delivered',
      sentAt: '2026-03-11T14:00:00Z',
      deliveredAt: '2026-03-11T14:00:20Z',
      replyReceived: false,
      mediaCount: 0
    },
    {
      id: 'msg-003',
      recipientPhone: '+55 31 77777-7777',
      recipientName: 'Bob Johnson',
      templateId: 'tpl-003',
      templateName: 'Promotion Alert',
      customContent: 'Limited time offer! Spring Sale - Save 20% on Electronics. Use code: SPRING20',
      status: 'pending',
      sentAt: '2026-03-11T16:00:00Z',
      replyReceived: false,
      mediaCount: 0
    },
    {
      id: 'msg-004',
      recipientPhone: '+55 47 66666-6666',
      recipientName: 'Alice Williams',
      customContent: 'Test message',
      status: 'failed',
      sentAt: '2026-03-11T12:30:00Z',
      failureReason: 'Invalid phone number format',
      replyReceived: false,
      mediaCount: 0
    },
    {
      id: 'msg-005',
      recipientPhone: '+55 85 55555-5555',
      recipientName: 'Charlie Brown',
      templateId: 'tpl-004',
      templateName: 'Appointment Reminder',
      customContent: 'Hi Charlie, reminder: You have an appointment on 2026-03-15 at 14:30 at Office Building A.',
      status: 'delivered',
      sentAt: '2026-03-10T09:00:00Z',
      deliveredAt: '2026-03-10T09:00:10Z',
      replyReceived: false,
      mediaCount: 0
    }
  ],
  pagination: {
    totalCount: 2234,
    pageSize: 50,
    currentPage: 1,
    totalPages: 45
  },
  stats: {
    totalSent: 2234,
    delivered: 2106,
    read: 1724,
    failed: 20,
    pending: 108,
    deliveryRate: 94.3,
    readRate: 77.2,
    replyRate: 12.5
  },
  trends: {
    dailyCounts: [
      { date: '2026-03-05', count: 287 },
      { date: '2026-03-06', count: 342 },
      { date: '2026-03-07', count: 298 },
      { date: '2026-03-08', count: 412 },
      { date: '2026-03-09', count: 356 },
      { date: '2026-03-10', count: 425 },
      { date: '2026-03-11', count: 514 }
    ],
    statusDistribution: {
      delivered: 2106,
      read: 1724,
      failed: 20,
      pending: 108
    }
  }
};

// Export Request
interface ExportRequest {
  format: 'csv' | 'pdf';
  filters?: HistoryFilters;
  dateRange?: {
    from: string;
    to: string;
  };
}

// Message Details Response
interface MessageDetailsResponse {
  message: MessageLogEntry;
  timeline: Array<{
    timestamp: string;
    event: 'sent' | 'delivered' | 'read' | 'failed' | 'reply';
    details: string;
  }>;
  recipient: {
    phone: string;
    name?: string;
    isWhatsAppUser: boolean;
    lastInteraction?: string;
  };
}

const mockMessageDetailsResponse: MessageDetailsResponse = {
  message: {
    id: 'msg-001',
    recipientPhone: '+55 11 99999-9999',
    recipientName: 'John Doe',
    templateId: 'tpl-002',
    templateName: 'Order Confirmation',
    customContent: 'Your order #12345 has been confirmed. Total: R$ 299.90. Delivery: 2026-03-15',
    status: 'read',
    sentAt: '2026-03-11T15:30:00Z',
    deliveredAt: '2026-03-11T15:30:15Z',
    readAt: '2026-03-11T15:35:22Z',
    replyReceived: true,
    replyContent: 'Thank you!',
    replyAt: '2026-03-11T15:40:10Z',
    mediaCount: 0
  },
  timeline: [
    {
      timestamp: '2026-03-11T15:30:00Z',
      event: 'sent',
      details: 'Message sent to WhatsApp servers'
    },
    {
      timestamp: '2026-03-11T15:30:15Z',
      event: 'delivered',
      details: 'Message delivered to recipient device'
    },
    {
      timestamp: '2026-03-11T15:35:22Z',
      event: 'read',
      details: 'Message read by recipient'
    },
    {
      timestamp: '2026-03-11T15:40:10Z',
      event: 'reply',
      details: 'Recipient replied: "Thank you!"'
    }
  ],
  recipient: {
    phone: '+55 11 99999-9999',
    name: 'John Doe',
    isWhatsAppUser: true,
    lastInteraction: '2026-03-11T15:40:10Z'
  }
};
```

### 4.5 User Flows

**Flow 1: View Message History with Filters**
```
User navigates to /history
  ↓
Page loads with default: Last 7 days, all statuses
  ↓
Shows stats cards and delivery trend chart
  ↓
Displays message log table (first 50 entries)
  ↓
User can:
  - Filter by period (1 day, 7 days, 30 days, custom range)
  - Filter by status (delivered, read, failed, pending)
  - Search by recipient phone/name
  - Sort by sent date, status
  ↓
Click message row to see details
  ↓
Details modal shows timeline and full content
```

**Flow 2: Export Message History**
```
User applies filters (e.g., "Last 30 days", "Failed messages")
  ↓
Clicks "Export CSV" or "Export PDF"
  ↓
Confirmation dialog shows: "Export 142 messages?"
  ↓
User confirms
  ↓
File download starts
  ↓
Toast notification: "Export complete"
```

**Flow 3: View Message Details**
```
User sees message in table with status icons
  ↓
Clicks on message row
  ↓
Modal opens showing:
  - Recipient info
  - Full message content
  - Status badge
  - Timeline of events (sent → delivered → read → reply)
  - Reply content (if received)
  ↓
User can click "Back" to close and view table
```

### 4.6 Interaction Patterns

- **Status Icons:** ⏳ (pending), ✓ (sent), ✓✓ (delivered), 👁️ (read), ✗ (failed), 💬 (replied)
- **Date Filter:** Preset buttons (1d, 7d, 30d) + custom date picker
- **Search:** Real-time search across phone numbers and recipient names
- **Sorting:** Clickable column headers toggle ascending/descending
- **Pagination:** Show 50 entries per page, allow jump to page
- **Export:** Progressive disclosure - click export, select format, choose filters
- **Charts:** Trend chart shows daily message count, status distribution pie chart
- **Hover States:** Row highlight, show "View Details" CTA
- **Empty States:** "No messages match your filters" with clear filters button

---

## Navigation Structure

### Site Map
```
/dashboard
├── /messages
│   └── Send WhatsApp messages
├── /templates
│   └── Manage message templates
├── /history
│   └── View message logs & analytics
└── /settings
    └── Manage API credentials
```

### Header Navigation (All Pages)
```
[Logo] [Page Title] ---- [User Name + Role] [Logout]
```

### Navigation Patterns
- **Breadcrumbs:** Dashboard → [Current Page]
- **Quick Links:** Dashboard shows cards linking to all pages
- **Back Button:** History and Templates have "Back to Dashboard" link
- **Mobile:** Hamburger menu with page links

---

## Color & Status Indicators

### Message Status Colors
| Status | Color | Icon | Hex |
|--------|-------|------|-----|
| Pending | Yellow | ⏳ | #FCD34D |
| Sent | Blue | ✓ | #3B82F6 |
| Delivered | Green | ✓✓ | #10B981 |
| Read | Dark Green | 👁️ | #059669 |
| Failed | Red | ✗ | #EF4444 |
| Replied | Purple | 💬 | #8B5CF6 |

### Template Category Colors
| Category | Color | Icon |
|----------|-------|------|
| Marketing | Blue-50 bg, Blue-900 text | 📢 |
| Notification | Amber-50 bg, Amber-900 text | 🔔 |
| Transactional | Green-50 bg, Green-900 text | 📦 |

---

## Accessibility Specifications

### WCAG 2.1 AA Compliance
- All buttons have `aria-label` for screen readers
- Form fields use `aria-invalid` for error states
- Tables use `role="table"` with proper headers
- Status icons have text fallbacks: "Delivered" not just ✓✓
- Color not used as only indicator (always pair with icon + text)
- Focus visible on all interactive elements
- Keyboard navigation: Tab through form fields, Enter to submit
- Error messages linked to inputs via `aria-describedby`

### Mobile Responsiveness
| Breakpoint | Layout |
|-----------|--------|
| Mobile (< 640px) | Single column, stacked cards |
| Tablet (640-1024px) | 2-column grid for stats |
| Desktop (> 1024px) | Full width, 4-column stats grid |

---

## Performance Considerations

### Data Loading Strategies
1. **Dashboard:** Load stats immediately (cached), recent activity paginated
2. **Messages:** Form interactive immediately, templates loaded async
3. **Templates:** List infinite-scroll or paginated (20-50 per page)
4. **History:** Table virtualized for large datasets (2000+ rows)

### Caching Strategy
- Dashboard stats: 5-minute cache
- Templates list: 10-minute cache
- Message history: No cache (always fresh)
- User data: Session cache

---

## Testing Mockable Data

All data structures above are designed to be mocked for frontend development without backend:

```typescript
// Mock data is self-contained in each component
const mockDashboardData = { ... };
const mockTemplatesResponse = { ... };
const mockHistoryResponse = { ... };
const mockMessageTemplate = { ... };

// Usage in component
const [data, setData] = useState(mockDashboardData);

// When backend ready, replace with:
const [data, setData] = useState(null);
useEffect(() => {
  fetchDashboardData().then(setData);
}, []);
```

---

## Next Steps

### For Aria (System Architect)
1. Define component hierarchy based on these specs
2. Create component folder structure
3. Define prop interfaces for each component
4. Plan composition strategy (Atomic Design)

### For Dex (Full Stack Developer)
1. Implement pages with mock data
2. Build reusable components
3. Create hooks for data fetching (with mock fallback)
4. Add form validation and error handling

### For Quinn (QA)
1. Create test cases for each flow
2. Define acceptance criteria per component
3. Plan E2E tests for key user journeys
4. Verify accessibility compliance

---

**Document Status:** Complete and Ready for Implementation
**Last Updated:** 2026-03-11
**Designer:** Uma (UX/UI Expert)
**Orchestrated By:** Orion (Master Agent)
