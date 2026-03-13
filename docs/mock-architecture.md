# Mock Architecture - Frontend-Only Implementation

**Phase 1: UX Validation with Mock Data**

This document defines the architecture for frontend-only implementation using mock data. No backend API calls are made. The system works entirely offline with in-memory data structures.

**Author:** Aria (System Architect)
**Date:** 2026-03-11
**Status:** Design Phase - Ready for Implementation

---

## Executive Summary

The mock architecture enables rapid UX validation without backend dependencies. It provides:

- **Zero Backend Dependencies** - No PostgreSQL, Redis, or API server required
- **In-Memory Data Storage** - Mock data persists during session
- **Realistic Data Flows** - Same component patterns as production
- **Easy Backend Migration** - Mock layer swaps with real API client
- **TypeScript-Safe** - Full type safety with interfaces

---

## 1. Core Design Principles

### 1.1 Simplicity First
- Mock data lives in-memory during session
- No database, no API server, no infrastructure
- Simple JSON files define default mock state
- Clear separation between mock layer and UI layer

### 1.2 Production Parity
- Same TypeScript interfaces used for both mock and real data
- Identical async patterns (promises/async-await)
- Same state management approach
- Components don't know if data is mocked or real

### 1.3 Easy Transition
- Mock layer is a thin adapter
- Real API client can replace mock without component changes
- Interfaces remain constant across both implementations
- Configuration flag switches between mock and real modes

---

## 2. TypeScript Interfaces

All data types are strictly typed for production readiness.

### 2.1 WhatsApp Message Interface

```typescript
// src/lib/types/message.ts

export interface WhatsAppMessage {
  id: string;                    // Unique message ID (UUID)
  messageId: string;             // Meta API message ID
  templateId: string;            // Template used to send
  recipientPhoneNumber: string;  // E.164 format: +55 11 98765-4321
  status: MessageStatus;         // Current delivery status
  sentAt: Date;                  // ISO 8601 timestamp
  deliveredAt?: Date;            // When carrier confirmed delivery
  readAt?: Date;                 // When recipient read (if supported)
  content: {
    templateName: string;        // e.g., "welcome_offer"
    templateLanguage: string;    // e.g., "pt_BR"
    parameters?: Record<string, string>;  // Dynamic template parameters
  };
  error?: {
    code: string;                // Meta error code
    message: string;             // Human-readable error
    timestamp: Date;
  };
}

export type MessageStatus =
  | 'pending'      // Queued for sending
  | 'sent'         // Delivered to Meta
  | 'delivered'    // Delivered to carrier
  | 'read'         // Read by recipient
  | 'failed';      // Failed to send

export interface MessageListResponse {
  messages: WhatsAppMessage[];
  total: number;
  page: number;
  pageSize: number;
}
```

### 2.2 Template Interface

```typescript
// src/lib/types/template.ts

export interface WhatsAppTemplate {
  id: string;                           // UUID
  name: string;                         // Template identifier
  language: string;                     // pt_BR, en_US, etc
  status: TemplateStatus;               // approval_pending, approved, rejected, disabled
  category: TemplateCategory;           // MARKETING, AUTHENTICATION, UTILITY, SERVICE_UPDATE
  content: {
    header?: TemplateHeaderContent;     // Media or text header
    body: string;                       // Message body with placeholders {1}, {2}
    footer?: string;                    // Optional footer
    buttons?: TemplateButton[];         // CTA buttons
  };
  variables: TemplateVariable[];        // Parameters like {1}, {2}, etc
  createdAt: Date;
  updatedAt: Date;
  version: number;                      // Template versioning
  metaId?: string;                      // Meta API template ID
}

export type TemplateStatus =
  | 'draft'
  | 'approval_pending'
  | 'approved'
  | 'rejected'
  | 'disabled';

export type TemplateCategory =
  | 'MARKETING'
  | 'AUTHENTICATION'
  | 'UTILITY'
  | 'SERVICE_UPDATE';

export interface TemplateHeaderContent {
  type: 'TEXT' | 'IMAGE' | 'VIDEO' | 'DOCUMENT';
  value?: string;  // For TEXT type
}

export interface TemplateButton {
  type: 'URL' | 'PHONE_NUMBER' | 'QUICK_REPLY';
  text: string;
  value?: string;
}

export interface TemplateVariable {
  position: number;           // 1, 2, 3...
  name: string;              // Display name
  required: boolean;
  type: 'text' | 'date' | 'time' | 'currency';
  example: string;
}
```

### 2.3 Message History Interface

```typescript
// src/lib/types/history.ts

export interface MessageHistory {
  id: string;
  messages: WhatsAppMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface MessageFilter {
  status?: MessageStatus[];
  templateId?: string;
  phoneNumber?: string;
  dateRange?: {
    startDate: Date;
    endDate: Date;
  };
}

export interface MessageHistoryResponse {
  messages: WhatsAppMessage[];
  total: number;
  page: number;
  pageSize: number;
}
```

### 2.4 Dashboard Statistics Interface

```typescript
// src/lib/types/dashboard.ts

export interface DashboardStats {
  period: 'today' | 'week' | 'month';
  totalMessagesSent: number;
  totalMessagesDelivered: number;
  totalMessagesRead: number;
  failedMessages: number;
  successRate: number;                // 0-100
  averageDeliveryTime: number;        // seconds
  topTemplates: TemplateStatistic[];
  messageStatusBreakdown: StatusBreakdown;
  recentErrors: ErrorStatistic[];
}

export interface TemplateStatistic {
  templateId: string;
  templateName: string;
  messageCount: number;
  successRate: number;
}

export interface StatusBreakdown {
  pending: number;
  sent: number;
  delivered: number;
  read: number;
  failed: number;
}

export interface ErrorStatistic {
  code: string;
  message: string;
  count: number;
  lastOccurred: Date;
}
```

---

## 3. Mock Data Organization

### 3.1 File Structure

```
frontend/src/lib/
├── mock/
│   ├── data/
│   │   ├── messages.json          # Mock message history
│   │   ├── templates.json         # Mock templates
│   │   └── dashboard-stats.json   # Mock statistics
│   ├── services/
│   │   ├── mock-api-client.ts     # API client with mock data
│   │   ├── mock-message-service.ts
│   │   ├── mock-template-service.ts
│   │   └── mock-dashboard-service.ts
│   └── utils/
│       └── mock-data-generator.ts # Generate realistic mock data
├── types/
│   ├── message.ts
│   ├── template.ts
│   ├── history.ts
│   └── dashboard.ts
└── api-client.ts                  # Real or mock (configurable)
```

### 3.2 Mock Data Files

#### messages.json
```json
{
  "messages": [
    {
      "id": "msg-001",
      "messageId": "meta-msg-001",
      "templateId": "tmpl-001",
      "recipientPhoneNumber": "+55 11 98765-4321",
      "status": "delivered",
      "sentAt": "2026-03-11T10:30:00Z",
      "deliveredAt": "2026-03-11T10:31:00Z",
      "content": {
        "templateName": "welcome_offer",
        "templateLanguage": "pt_BR",
        "parameters": {
          "1": "João Silva",
          "2": "R$ 50,00"
        }
      }
    }
  ]
}
```

#### templates.json
```json
{
  "templates": [
    {
      "id": "tmpl-001",
      "name": "welcome_offer",
      "language": "pt_BR",
      "status": "approved",
      "category": "MARKETING",
      "content": {
        "body": "Olá {1}! Aproveite nossa oferta especial de {2} 🎉"
      },
      "variables": [
        {
          "position": 1,
          "name": "Nome do Cliente",
          "required": true,
          "type": "text",
          "example": "João"
        },
        {
          "position": 2,
          "name": "Valor da Oferta",
          "required": true,
          "type": "currency",
          "example": "R$ 50,00"
        }
      ]
    }
  ]
}
```

---

## 4. Mock Service Layer

### 4.1 Mock API Client Pattern

```typescript
// src/lib/mock/services/mock-api-client.ts

import {
  WhatsAppMessage,
  WhatsAppTemplate,
  DashboardStats,
  MessageStatus,
} from '../types';

/**
 * Mock API Client
 * Simulates backend API responses with in-memory data
 * All methods are async to match real API behavior
 */
export class MockAPIClient {
  private messagesData: WhatsAppMessage[] = [];
  private templatesData: WhatsAppTemplate[] = [];
  private messageIdCounter: number = 1;

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData(): void {
    // Load mock data from JSON files or generate
    this.messagesData = this.generateMockMessages(10);
    this.templatesData = this.generateMockTemplates();
  }

  /**
   * Get message history with pagination and filtering
   */
  async getMessages(
    page: number = 1,
    pageSize: number = 10,
    filters?: MessageFilter
  ): Promise<MessageListResponse> {
    // Simulate network delay
    await this.delay(300);

    let filtered = [...this.messagesData];

    // Apply filters
    if (filters?.status) {
      filtered = filtered.filter(m => filters.status?.includes(m.status));
    }
    if (filters?.templateId) {
      filtered = filtered.filter(m => m.templateId === filters.templateId);
    }
    if (filters?.phoneNumber) {
      filtered = filtered.filter(m =>
        m.recipientPhoneNumber.includes(filters.phoneNumber!)
      );
    }

    // Paginate
    const start = (page - 1) * pageSize;
    const paginatedMessages = filtered.slice(start, start + pageSize);

    return {
      messages: paginatedMessages,
      total: filtered.length,
      page,
      pageSize,
    };
  }

  /**
   * Get single message by ID
   */
  async getMessageById(id: string): Promise<WhatsAppMessage> {
    await this.delay(150);

    const message = this.messagesData.find(m => m.id === id);
    if (!message) {
      throw new Error(`Message ${id} not found`);
    }

    return message;
  }

  /**
   * Send a new message (mock)
   */
  async sendMessage(
    templateId: string,
    phoneNumber: string,
    parameters?: Record<string, string>
  ): Promise<WhatsAppMessage> {
    await this.delay(500); // Simulate API processing

    const template = this.templatesData.find(t => t.id === templateId);
    if (!template) {
      throw new Error(`Template ${templateId} not found`);
    }

    const newMessage: WhatsAppMessage = {
      id: `msg-${String(this.messageIdCounter++).padStart(6, '0')}`,
      messageId: `meta-msg-${Date.now()}`,
      templateId,
      recipientPhoneNumber: phoneNumber,
      status: 'pending',
      sentAt: new Date(),
      content: {
        templateName: template.name,
        templateLanguage: template.language,
        parameters,
      },
    };

    this.messagesData.unshift(newMessage);

    // Simulate delivery progression
    this.simulateMessageDelivery(newMessage.id);

    return newMessage;
  }

  /**
   * Get all templates
   */
  async getTemplates(): Promise<WhatsAppTemplate[]> {
    await this.delay(200);
    return [...this.templatesData];
  }

  /**
   * Get single template
   */
  async getTemplateById(id: string): Promise<WhatsAppTemplate> {
    await this.delay(150);

    const template = this.templatesData.find(t => t.id === id);
    if (!template) {
      throw new Error(`Template ${id} not found`);
    }

    return template;
  }

  /**
   * Get dashboard statistics
   */
  async getDashboardStats(period: 'today' | 'week' | 'month'): Promise<DashboardStats> {
    await this.delay(400);

    const messages = this.messagesData;
    const totalSent = messages.length;
    const delivered = messages.filter(m =>
      m.status === 'delivered' || m.status === 'read'
    ).length;
    const failed = messages.filter(m => m.status === 'failed').length;

    return {
      period,
      totalMessagesSent: totalSent,
      totalMessagesDelivered: delivered,
      totalMessagesRead: messages.filter(m => m.status === 'read').length,
      failedMessages: failed,
      successRate: totalSent > 0 ? (delivered / totalSent) * 100 : 0,
      averageDeliveryTime: 65,
      topTemplates: this.calculateTopTemplates(),
      messageStatusBreakdown: {
        pending: messages.filter(m => m.status === 'pending').length,
        sent: messages.filter(m => m.status === 'sent').length,
        delivered: messages.filter(m => m.status === 'delivered').length,
        read: messages.filter(m => m.status === 'read').length,
        failed,
      },
      recentErrors: this.getRecentErrors(),
    };
  }

  /**
   * PRIVATE: Simulate message delivery lifecycle
   */
  private simulateMessageDelivery(messageId: string): void {
    const message = this.messagesData.find(m => m.id === messageId);
    if (!message) return;

    // Transition: pending -> sent (after 1 second)
    setTimeout(() => {
      const msg = this.messagesData.find(m => m.id === messageId);
      if (msg && msg.status === 'pending') {
        msg.status = 'sent';
      }
    }, 1000);

    // Transition: sent -> delivered (after 2-3 seconds)
    setTimeout(() => {
      const msg = this.messagesData.find(m => m.id === messageId);
      if (msg && msg.status === 'sent') {
        msg.status = 'delivered';
        msg.deliveredAt = new Date();
      }
    }, 2000 + Math.random() * 1000);

    // Transition: delivered -> read (occasionally, after 5+ seconds)
    if (Math.random() > 0.3) { // 70% of messages get read
      setTimeout(() => {
        const msg = this.messagesData.find(m => m.id === messageId);
        if (msg && msg.status === 'delivered') {
          msg.status = 'read';
          msg.readAt = new Date();
        }
      }, 5000 + Math.random() * 5000);
    }
  }

  /**
   * PRIVATE: Calculate top templates
   */
  private calculateTopTemplates(): TemplateStatistic[] {
    const templateStats = new Map<string, { name: string; count: number; delivered: number }>();

    this.messagesData.forEach(msg => {
      const template = this.templatesData.find(t => t.id === msg.templateId);
      if (!template) return;

      if (!templateStats.has(msg.templateId)) {
        templateStats.set(msg.templateId, { name: template.name, count: 0, delivered: 0 });
      }

      const stat = templateStats.get(msg.templateId)!;
      stat.count++;
      if (msg.status === 'delivered' || msg.status === 'read') {
        stat.delivered++;
      }
    });

    return Array.from(templateStats.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
      .map(stat => ({
        templateId: stat.name,
        templateName: stat.name,
        messageCount: stat.count,
        successRate: (stat.delivered / stat.count) * 100,
      }));
  }

  /**
   * PRIVATE: Get recent errors
   */
  private getRecentErrors(): ErrorStatistic[] {
    const errorMap = new Map<string, { message: string; count: number; lastOccurred: Date }>();

    this.messagesData
      .filter(m => m.error)
      .forEach(msg => {
        if (!msg.error) return;

        if (!errorMap.has(msg.error.code)) {
          errorMap.set(msg.error.code, {
            message: msg.error.message,
            count: 0,
            lastOccurred: new Date(),
          });
        }

        const error = errorMap.get(msg.error.code)!;
        error.count++;
        error.lastOccurred = new Date(msg.error.timestamp);
      });

    return Array.from(errorMap.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
      .map((error, idx) => ({
        code: `ERR_${String(idx + 1).padStart(3, '0')}`,
        message: error.message,
        count: error.count,
        lastOccurred: error.lastOccurred,
      }));
  }

  /**
   * PRIVATE: Simulate network delay
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Data generation helpers...
  private generateMockMessages(count: number): WhatsAppMessage[] {
    // Implementation in next section
  }

  private generateMockTemplates(): WhatsAppTemplate[] {
    // Implementation in next section
  }
}

// Export singleton instance
export const mockApiClient = new MockAPIClient();
```

### 4.2 Configurable API Client

The real api-client.ts file can be configured to use either mock or real implementations:

```typescript
// src/lib/api-client.ts (enhanced)

import { mockApiClient } from './mock/services/mock-api-client';

const USE_MOCK_API = process.env.NEXT_PUBLIC_USE_MOCK_API === 'true';

// Decide which client to use
export const apiClient = USE_MOCK_API ? mockApiClient : realApiClient;

// Re-export all methods
export const {
  getMessages,
  getTemplates,
  getDashboardStats,
  sendMessage,
} = apiClient;
```

---

## 5. State Management Pattern

### 5.1 React Hooks with Mock Data

Use React hooks to manage component state. Mock service provides data through custom hooks:

```typescript
// src/hooks/useMessages.ts

import { useState, useEffect } from 'react';
import { mockApiClient } from '@/lib/mock/services/mock-api-client';
import { WhatsAppMessage, MessageFilter } from '@/lib/types';

export function useMessages(page: number = 1, pageSize: number = 10) {
  const [messages, setMessages] = useState<WhatsAppMessage[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const response = await mockApiClient.getMessages(page, pageSize);
        setMessages(response.messages);
        setTotal(response.total);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [page, pageSize]);

  return { messages, total, loading, error };
}

export function useSendMessage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const send = async (
    templateId: string,
    phoneNumber: string,
    parameters?: Record<string, string>
  ) => {
    try {
      setLoading(true);
      setError(null);
      const message = await mockApiClient.sendMessage(
        templateId,
        phoneNumber,
        parameters
      );
      return message;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { send, loading, error };
}
```

### 5.2 Server State vs Client State

**Server State (from mock service):**
- Message history
- Templates
- Dashboard statistics
- All read-only data from "API"

**Client State (component local):**
- Form inputs during message composition
- Filter selections
- Pagination state
- UI state (modals, dropdowns)

---

## 6. Component Architecture

### 6.1 Reusable Components

All components work with both mock and real data through consistent interfaces.

```
frontend/src/components/
├── messages/
│   ├── MessageList.tsx         # Display message history
│   ├── MessageDetail.tsx       # Single message view
│   ├── MessageStatusBadge.tsx  # Status indicator
│   └── MessageFilter.tsx       # Filter/search UI
├── templates/
│   ├── TemplateList.tsx        # Browse templates
│   ├── TemplateDetail.tsx      # Template preview
│   └── TemplateSelector.tsx    # Choose template for sending
├── dashboard/
│   ├── StatsCard.tsx           # KPI card
│   ├── StatsGrid.tsx           # Grid layout
│   ├── MessageChart.tsx        # Message trends (recharts)
│   └── StatusBreakdown.tsx     # Pie/donut chart
├── forms/
│   ├── SendMessageForm.tsx     # Compose and send
│   └── TemplateForm.tsx        # Template management
└── shared/
    ├── LoadingSpinner.tsx
    ├── ErrorBanner.tsx
    └── ConfirmDialog.tsx
```

### 6.2 Data Flow Pattern

```
┌─────────────────┐
│   Component     │
│   (e.g., Page)  │
└────────┬────────┘
         │
         │ useMessages()
         │ useDashboardStats()
         ▼
┌─────────────────────┐
│  Custom Hooks       │
│  (useMessages,      │
│   useDashboardStats)│
└────────┬────────────┘
         │
         │ mockApiClient.getMessages()
         │ mockApiClient.getDashboardStats()
         ▼
┌─────────────────────┐
│  Mock API Client    │
│  (In-Memory Store)  │
└────────┬────────────┘
         │
         │ this.messagesData
         │ this.templatesData
         ▼
┌─────────────────────┐
│  Mock Data Objects  │
│  (Typed)            │
└─────────────────────┘
```

---

## 7. Feature Implementation Guide

### 7.1 Dashboard Page

```typescript
// src/app/dashboard/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { mockApiClient } from '@/lib/mock/services/mock-api-client';
import { DashboardStats } from '@/lib/types';

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<'today' | 'week' | 'month'>('today');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await mockApiClient.getDashboardStats(period);
        setStats(data);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [period]);

  if (loading) return <div>Carregando...</div>;
  if (!stats) return <div>Erro ao carregar dados</div>;

  return (
    <div className="space-y-8">
      {/* Period selector */}
      <div className="flex gap-2">
        {(['today', 'week', 'month'] as const).map(p => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={period === p ? 'bg-blue-500 text-white' : ''}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Enviado"
          value={stats.totalMessagesSent}
          icon="📤"
        />
        <StatsCard
          title="Entregue"
          value={stats.totalMessagesDelivered}
          icon="✅"
        />
        <StatsCard
          title="Lido"
          value={stats.totalMessagesRead}
          icon="👀"
        />
        <StatsCard
          title="Taxa de Sucesso"
          value={`${stats.successRate.toFixed(1)}%`}
          icon="📊"
        />
      </div>

      {/* Charts and detailed stats */}
    </div>
  );
}
```

### 7.2 Message History Page

```typescript
// src/app/messages/page.tsx

'use client';

import { useState } from 'react';
import { useMessages } from '@/hooks/useMessages';
import MessageList from '@/components/messages/MessageList';
import MessageFilter from '@/components/messages/MessageFilter';

export default function MessagesPage() {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({});
  const { messages, total, loading } = useMessages(page, 10);

  return (
    <div className="space-y-4">
      <MessageFilter onFilter={setFilter} />

      {loading ? (
        <div>Carregando...</div>
      ) : (
        <>
          <MessageList messages={messages} />
          <Pagination
            current={page}
            total={Math.ceil(total / 10)}
            onChange={setPage}
          />
        </>
      )}
    </div>
  );
}
```

---

## 8. Data Lifecycle Simulation

### 8.1 Message Delivery States

Mock messages automatically transition through delivery states:

```typescript
pending (0s)
  ↓ (1s)
sent
  ↓ (2-3s)
delivered → (70% chance, 5-10s) → read
          → (30% chance) → stays delivered
```

### 8.2 Realistic Delays

- API calls: 150-500ms (simulating network)
- Message delivery simulation: 1-10s total
- Dashboard load: 400ms
- Form submission: 500ms

---

## 9. Testing Mock Layer

### 9.1 Unit Tests

```typescript
// src/lib/mock/services/__tests__/mock-api-client.test.ts

describe('MockAPIClient', () => {
  let client: MockAPIClient;

  beforeEach(() => {
    client = new MockAPIClient();
  });

  describe('getMessages', () => {
    it('should return paginated messages', async () => {
      const response = await client.getMessages(1, 10);
      expect(response.messages).toHaveLength(10);
      expect(response.total).toBeGreaterThan(0);
    });

    it('should filter by status', async () => {
      const response = await client.getMessages(1, 100, {
        status: ['delivered'],
      });
      response.messages.forEach(msg => {
        expect(msg.status).toBe('delivered');
      });
    });
  });

  describe('sendMessage', () => {
    it('should create new message in pending state', async () => {
      const message = await client.sendMessage(
        'tmpl-001',
        '+55 11 98765-4321'
      );
      expect(message.status).toBe('pending');
      expect(message.sentAt).toBeDefined();
    });

    it('should transition message through states', async () => {
      const message = await client.sendMessage(
        'tmpl-001',
        '+55 11 98765-4321'
      );

      // Wait for transitions
      await new Promise(resolve => setTimeout(resolve, 1500));
      const updated = await client.getMessageById(message.id);
      expect(updated.status).toBe('sent');
    });
  });
});
```

### 9.2 Component Tests

```typescript
// src/components/messages/__tests__/MessageList.test.tsx

describe('MessageList', () => {
  it('renders message list with mock data', async () => {
    const mockMessages = await mockApiClient.getMessages();
    render(<MessageList messages={mockMessages.messages} />);

    expect(screen.getByText(/message/i)).toBeInTheDocument();
  });
});
```

---

## 10. Migration Path to Production

### 10.1 Phase 1 → Phase 2 Transition

When backend is ready, follow this migration pattern:

**Before (Mock):**
```typescript
// src/lib/api-client.ts
import { mockApiClient } from './mock/services/mock-api-client';
export const apiClient = mockApiClient;
```

**After (Real):**
```typescript
// src/lib/api-client.ts
import { realApiClient } from './real/services/real-api-client';
export const apiClient = realApiClient;
```

**Components stay the same** - they don't change because both clients implement the same interface.

### 10.2 Real API Client Structure

```typescript
// src/lib/real/services/real-api-client.ts

import axios from 'axios';
import { WhatsAppMessage, WhatsAppTemplate, DashboardStats } from '@/lib/types';

export class RealAPIClient {
  private client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

  async getMessages(page: number, pageSize: number): Promise<MessageListResponse> {
    const { data } = await this.client.get('/api/messages', {
      params: { page, pageSize },
    });
    return data;
  }

  async getTemplates(): Promise<WhatsAppTemplate[]> {
    const { data } = await this.client.get('/api/templates');
    return data;
  }

  async getDashboardStats(period: string): Promise<DashboardStats> {
    const { data } = await this.client.get(`/api/dashboard/stats`, {
      params: { period },
    });
    return data;
  }

  async sendMessage(
    templateId: string,
    phoneNumber: string,
    parameters?: Record<string, string>
  ): Promise<WhatsAppMessage> {
    const { data } = await this.client.post('/api/messages/send', {
      templateId,
      phoneNumber,
      parameters,
    });
    return data;
  }
}
```

---

## 11. Configuration & Environment

### 11.1 Environment Variables

```bash
# .env.local (Frontend)

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001

# Mock Mode (Phase 1)
NEXT_PUBLIC_USE_MOCK_API=true

# Feature Flags
NEXT_PUBLIC_ENABLE_TEMPLATES=true
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_AUDIT_LOGS=true
```

### 11.2 Conditional Imports

```typescript
// src/lib/api-client.ts

const USE_MOCK_API = process.env.NEXT_PUBLIC_USE_MOCK_API === 'true';

const apiClient = USE_MOCK_API
  ? (() => {
      // Dynamic import to keep mock code out of production builds
      const mockMod = require('./mock/services/mock-api-client');
      return mockMod.mockApiClient;
    })()
  : (() => {
      const realMod = require('./real/services/real-api-client');
      return new realMod.RealAPIClient();
    })();

export default apiClient;
```

---

## 12. Best Practices

### 12.1 Do's

- ✅ Use TypeScript interfaces for all data types
- ✅ Keep mock data realistic and diverse
- ✅ Simulate realistic network delays (150-500ms)
- ✅ Implement error scenarios (failed messages, etc.)
- ✅ Use custom hooks to encapsulate data fetching
- ✅ Keep mock layer separate from UI components
- ✅ Test mock service independently from components

### 12.2 Don'ts

- ❌ Don't hardcode API URLs in components
- ❌ Don't create mock data directly in components
- ❌ Don't skip TypeScript types for mock data
- ❌ Don't implement business logic in mock layer
- ❌ Don't synchronize mock data between tabs (session-only state)
- ❌ Don't use localStorage for mock data (keep it in-memory)

---

## 13. File Checklist

### Create These Files

```
frontend/src/lib/
├── types/
│   ├── message.ts           ← Interfaces
│   ├── template.ts          ← Interfaces
│   ├── history.ts           ← Interfaces
│   ├── dashboard.ts         ← Interfaces
│   └── index.ts             ← Export all
├── mock/
│   ├── data/
│   │   ├── messages.json
│   │   ├── templates.json
│   │   └── dashboard-stats.json
│   ├── services/
│   │   ├── mock-api-client.ts    ← Core
│   │   ├── mock-message-service.ts
│   │   ├── mock-template-service.ts
│   │   └── mock-dashboard-service.ts
│   └── utils/
│       └── mock-data-generator.ts

frontend/src/hooks/
├── useMessages.ts
├── useTemplates.ts
├── useDashboardStats.ts
└── useSendMessage.ts

frontend/src/components/
├── messages/
│   ├── MessageList.tsx
│   ├── MessageDetail.tsx
│   ├── MessageStatusBadge.tsx
│   └── MessageFilter.tsx
├── templates/
│   ├── TemplateList.tsx
│   ├── TemplateDetail.tsx
│   └── TemplateSelector.tsx
├── dashboard/
│   ├── StatsCard.tsx
│   ├── StatsGrid.tsx
│   ├── MessageChart.tsx
│   └── StatusBreakdown.tsx
└── forms/
    ├── SendMessageForm.tsx
    └── TemplateForm.tsx
```

---

## 14. Summary

This mock architecture provides:

| Aspect | Benefit |
|--------|---------|
| **No Backend Required** | Develop frontend in isolation |
| **Type Safety** | Same interfaces used in production |
| **Realistic Behavior** | Simulates message delivery states |
| **Easy Testing** | Mock data is predictable |
| **Zero Migration Cost** | Swap mock ↔ real with config flag |
| **Offline Development** | Works completely offline |
| **Performance** | In-memory operations (instant) |

**Next Steps:**
1. Create TypeScript interfaces (types/)
2. Implement MockAPIClient (mock/services/)
3. Create custom hooks (hooks/)
4. Build UI components (components/)
5. Wire components to hooks
6. Test with mock data
7. Prepare real API client for Phase 2

---

**Architecture Decision Record**

**Decision:** Use in-memory mock data layer with configurable API client

**Rationale:**
- Enables complete frontend UX validation without backend dependencies
- Maintains type safety across mock and real implementations
- Supports rapid iteration and testing
- Clear migration path to production

**Consequences:**
- Mock data exists only during session (no persistence)
- No real database transactions simulated
- File storage needed for some initial load scenarios
- Requires environment flag to switch between mock/real

**Alternatives Considered:**
- REST API with mock server (json-server): More complex, requires server
- IndexedDB for persistence: Adds complexity, not needed for UX validation
- Hard-coded mock data in components: Poor separation of concerns

**Status:** Ready for Implementation

---

*Document Version: 1.0*
*Last Updated: 2026-03-11*
*Next Review: After Phase 1 completion*
