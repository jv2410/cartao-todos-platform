/**
 * Mock API Service Layer
 * Provides realistic mock data for all platform features
 * Following Aria's architecture specification
 */

// =====================
// TYPE DEFINITIONS
// =====================

export interface DashboardData {
  stats: {
    totalMessagesSent: number;
    deliveryRate: number;
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
  recentMessages: Message[];
  quickLinks: QuickLink[];
}

export interface Message {
  id: string;
  content: string;
  recipientName: string;
  recipientPhone: string;
  status: 'pending' | 'sent' | 'delivered' | 'read' | 'failed';
  sentAt: string;
  templateId?: string;
  templateName?: string;
  errorMessage?: string;
  deliveredAt?: string;
  readAt?: string;
}

export interface QuickLink {
  id: string;
  icon: string;
  label: string;
  href: string;
  description: string;
}

export interface Template {
  id: string;
  name: string;
  category: 'marketing' | 'notification' | 'transactional';
  content: string;
  variables: TemplateVariable[];
  createdAt: string;
  updatedAt: string;
  lastUsedAt?: string;
  usageCount: number;
  status: 'approved' | 'pending' | 'rejected';
}

export interface TemplateVariable {
  name: string;
  type: 'text' | 'number' | 'date';
  required: boolean;
  placeholder?: string;
  description?: string;
}

export interface HistoryResponse {
  messages: Message[];
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
  };
}

export interface SendMessageRequest {
  mode: 'single' | 'bulk' | 'template';
  recipients: Array<{
    name?: string;
    phone: string;
    variables?: Record<string, string>;
  }>;
  messageType: 'template' | 'custom';
  templateId?: string;
  customContent?: string;
  scheduledFor?: Date;
}

export interface SendMessageResponse {
  success: boolean;
  messageId: string;
  status: 'sent' | 'pending' | 'scheduled';
  recipientCount: number;
  estimatedDeliveryTime: string;
  timestamp: string;
}

// =====================
// MOCK DATA STORAGE
// =====================

class MockDataStore {
  private messages: Message[] = [];
  private templates: Template[] = [];
  private messageIdCounter = 1;

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Initialize templates
    this.templates = [
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
    ];

    // Initialize messages
    this.messages = [
      {
        id: 'msg-001',
        content: 'Your order #12345 has been confirmed. Total: R$ 299.90. Delivery: 2026-03-15',
        recipientName: 'John Doe',
        recipientPhone: '+55 11 99999-9999',
        status: 'read',
        sentAt: '2026-03-11T15:30:00Z',
        deliveredAt: '2026-03-11T15:30:15Z',
        readAt: '2026-03-11T15:35:22Z',
        templateId: 'tpl-002',
        templateName: 'Order Confirmation'
      },
      {
        id: 'msg-002',
        content: 'Hello Jane! Welcome to our service. Thank you for choosing us!',
        recipientName: 'Jane Smith',
        recipientPhone: '+55 21 88888-8888',
        status: 'delivered',
        sentAt: '2026-03-11T14:00:00Z',
        deliveredAt: '2026-03-11T14:00:20Z',
        templateId: 'tpl-001',
        templateName: 'Welcome Message'
      },
      {
        id: 'msg-003',
        content: 'Limited time offer! Spring Sale - Save 20% on Electronics. Use code: SPRING20',
        recipientName: 'Bob Johnson',
        recipientPhone: '+55 31 77777-7777',
        status: 'pending',
        sentAt: '2026-03-11T16:00:00Z',
        templateId: 'tpl-003',
        templateName: 'Promotion Alert'
      },
      {
        id: 'msg-004',
        content: 'Test message',
        recipientName: 'Alice Williams',
        recipientPhone: '+55 47 66666-6666',
        status: 'failed',
        sentAt: '2026-03-11T12:30:00Z',
        errorMessage: 'Invalid phone number format'
      },
      {
        id: 'msg-005',
        content: 'Hi Charlie, reminder: You have an appointment on 2026-03-15 at 14:30 at Office Building A.',
        recipientName: 'Charlie Brown',
        recipientPhone: '+55 85 55555-5555',
        status: 'delivered',
        sentAt: '2026-03-10T09:00:00Z',
        deliveredAt: '2026-03-10T09:00:10Z',
        templateId: 'tpl-004',
        templateName: 'Appointment Reminder'
      }
    ];

    this.messageIdCounter = this.messages.length + 1;
  }

  // Dashboard API
  async getDashboardData(): Promise<DashboardData> {
    await this.delay(300);

    const totalSent = this.messages.length;
    const delivered = this.messages.filter(m => m.status === 'delivered' || m.status === 'read').length;

    return {
      stats: {
        totalMessagesSent: totalSent,
        deliveryRate: totalSent > 0 ? (delivered / totalSent) * 100 : 0,
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
      recentMessages: this.messages.slice(0, 5),
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
  }

  // Templates API
  async getTemplates(): Promise<Template[]> {
    await this.delay(200);
    return [...this.templates];
  }

  async getTemplateById(id: string): Promise<Template | null> {
    await this.delay(150);
    return this.templates.find(t => t.id === id) || null;
  }

  async createTemplate(template: Omit<Template, 'id' | 'createdAt' | 'updatedAt' | 'usageCount' | 'status'>): Promise<Template> {
    await this.delay(400);

    const newTemplate: Template = {
      ...template,
      id: `tpl-${String(this.templates.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      usageCount: 0,
      status: 'approved'
    };

    this.templates.push(newTemplate);
    return newTemplate;
  }

  async updateTemplate(id: string, updates: Partial<Template>): Promise<Template | null> {
    await this.delay(400);

    const template = this.templates.find(t => t.id === id);
    if (!template) return null;

    Object.assign(template, updates, {
      updatedAt: new Date().toISOString()
    });

    return template;
  }

  async deleteTemplate(id: string): Promise<boolean> {
    await this.delay(300);

    const index = this.templates.findIndex(t => t.id === id);
    if (index === -1) return false;

    this.templates.splice(index, 1);
    return true;
  }

  // Messages API
  async getHistory(page: number = 1, pageSize: number = 50): Promise<HistoryResponse> {
    await this.delay(400);

    const totalCount = this.messages.length;
    const totalPages = Math.ceil(totalCount / pageSize);
    const start = (page - 1) * pageSize;
    const paginatedMessages = this.messages.slice(start, start + pageSize);

    const delivered = this.messages.filter(m => m.status === 'delivered' || m.status === 'read').length;
    const read = this.messages.filter(m => m.status === 'read').length;
    const failed = this.messages.filter(m => m.status === 'failed').length;
    const pending = this.messages.filter(m => m.status === 'pending').length;

    return {
      messages: paginatedMessages,
      pagination: {
        totalCount,
        pageSize,
        currentPage: page,
        totalPages
      },
      stats: {
        totalSent: totalCount,
        delivered,
        read,
        failed,
        pending,
        deliveryRate: totalCount > 0 ? (delivered / totalCount) * 100 : 0,
        readRate: totalCount > 0 ? (read / totalCount) * 100 : 0,
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
        ]
      }
    };
  }

  async sendMessage(request: SendMessageRequest): Promise<SendMessageResponse> {
    await this.delay(500);

    const messageIds: string[] = [];

    for (const recipient of request.recipients) {
      const messageId = `msg-${String(this.messageIdCounter++).padStart(6, '0')}`;

      let content = '';
      let templateName: string | undefined;

      if (request.messageType === 'template' && request.templateId) {
        const template = this.templates.find(t => t.id === request.templateId);
        if (template) {
          content = template.content;
          templateName = template.name;

          // Replace variables
          if (recipient.variables) {
            Object.entries(recipient.variables).forEach(([key, value]) => {
              content = content.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value);
            });
          }

          // Increment usage
          template.usageCount++;
          template.lastUsedAt = new Date().toISOString();
        }
      } else if (request.customContent) {
        content = request.customContent;
      }

      const newMessage: Message = {
        id: messageId,
        content,
        recipientName: recipient.name || recipient.phone,
        recipientPhone: recipient.phone,
        status: request.scheduledFor ? 'pending' : 'sent',
        sentAt: new Date().toISOString(),
        templateId: request.templateId,
        templateName
      };

      this.messages.unshift(newMessage);
      messageIds.push(messageId);

      // Simulate delivery progression
      if (!request.scheduledFor) {
        this.simulateDelivery(messageId);
      }
    }

    return {
      success: true,
      messageId: messageIds[0],
      status: request.scheduledFor ? 'scheduled' : 'sent',
      recipientCount: request.recipients.length,
      estimatedDeliveryTime: '2-3 seconds',
      timestamp: new Date().toISOString()
    };
  }

  private simulateDelivery(messageId: string) {
    // Transition to delivered after 2-3 seconds
    setTimeout(() => {
      const message = this.messages.find(m => m.id === messageId);
      if (message && message.status === 'sent') {
        message.status = 'delivered';
        message.deliveredAt = new Date().toISOString();
      }
    }, 2000 + Math.random() * 1000);

    // 70% chance of being read after 5-10 seconds
    if (Math.random() > 0.3) {
      setTimeout(() => {
        const message = this.messages.find(m => m.id === messageId);
        if (message && message.status === 'delivered') {
          message.status = 'read';
          message.readAt = new Date().toISOString();
        }
      }, 5000 + Math.random() * 5000);
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Export singleton instance
export const mockAPI = new MockDataStore();
