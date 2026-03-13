/**
 * Mock Data para Plataforma de Disparos WhatsApp Business
 * Dados realistas em português brasileiro
 */

export interface Campaign {
  id: string;
  name: string;
  status: 'scheduled' | 'sending' | 'completed' | 'failed';
  total: number;
  sent: number;
  delivered: number;
  read: number;
  failed: number;
  createdAt: string;
  scheduledFor?: string;
  completedAt?: string;
  template: string;
}

export interface Template {
  id: string;
  name: string;
  category: 'MARKETING' | 'UTILITY' | 'AUTHENTICATION';
  status: 'APPROVED' | 'PENDING' | 'REJECTED';
  language: string;
  header?: {
    type: 'TEXT' | 'IMAGE' | 'VIDEO' | 'DOCUMENT';
    content: string;
  };
  body: string;
  footer?: string;
  buttons?: Array<{
    type: 'QUICK_REPLY' | 'URL' | 'PHONE_NUMBER';
    text: string;
    url?: string;
    phone?: string;
  }>;
  createdAt: string;
  approvedAt?: string;
}

export interface DashboardStats {
  totalDisparos: number;
  totalEntregues: number;
  totalLidos: number;
  taxaEntrega: number;
  taxaLeitura: number;
  disparosHoje: number;
  campanhasAtivas: number;
  templatesAprovados: number;
}

export interface ChartData {
  date: string;
  enviados: number;
  entregues: number;
  lidos: number;
}

export interface RecentCampaign {
  id: string;
  name: string;
  status: 'completed' | 'sending' | 'scheduled';
  sent: number;
  total: number;
  deliveryRate: number;
  createdAt: string;
}

export interface Alert {
  id: string;
  type: 'warning' | 'error' | 'info' | 'success';
  title: string;
  message: string;
  createdAt: string;
}

// Dados de mock
export const mockDashboardStats: DashboardStats = {
  totalDisparos: 127543,
  totalEntregues: 123891,
  totalLidos: 98234,
  taxaEntrega: 97.1,
  taxaLeitura: 77.0,
  disparosHoje: 3421,
  campanhasAtivas: 5,
  templatesAprovados: 12,
};

export const mockChartData: ChartData[] = [
  { date: '07/03', enviados: 15234, entregues: 14876, lidos: 11234 },
  { date: '08/03', enviados: 18543, entregues: 18012, lidos: 14321 },
  { date: '09/03', enviados: 16789, entregues: 16234, lidos: 12876 },
  { date: '10/03', enviados: 19876, entregues: 19321, lidos: 15432 },
  { date: '11/03', enviados: 17654, entregues: 17123, lidos: 13654 },
  { date: '12/03', enviados: 20123, entregues: 19567, lidos: 16234 },
  { date: '13/03', enviados: 19234, entregues: 18765, lidos: 15123 },
];

export const mockRecentCampaigns: RecentCampaign[] = [
  {
    id: 'camp-001',
    name: 'Promoção Black Friday 2026',
    status: 'completed',
    sent: 15234,
    total: 15234,
    deliveryRate: 98.2,
    createdAt: '2026-03-12T10:30:00',
  },
  {
    id: 'camp-002',
    name: 'Lembrete Pagamento - Março',
    status: 'sending',
    sent: 8432,
    total: 12000,
    deliveryRate: 97.5,
    createdAt: '2026-03-13T08:15:00',
  },
  {
    id: 'camp-003',
    name: 'Newsletter Semanal',
    status: 'scheduled',
    sent: 0,
    total: 25000,
    deliveryRate: 0,
    createdAt: '2026-03-13T14:00:00',
  },
  {
    id: 'camp-004',
    name: 'Confirmação de Pedidos',
    status: 'completed',
    sent: 3421,
    total: 3421,
    deliveryRate: 99.1,
    createdAt: '2026-03-13T06:00:00',
  },
  {
    id: 'camp-005',
    name: 'Recuperação de Carrinho',
    status: 'completed',
    sent: 1876,
    total: 1876,
    deliveryRate: 96.8,
    createdAt: '2026-03-12T18:45:00',
  },
];

export const mockAlerts: Alert[] = [
  {
    id: 'alert-001',
    type: 'warning',
    title: 'Limite mensal próximo',
    message: 'Você utilizou 85% do limite mensal de disparos. Considere aumentar sua cota.',
    createdAt: '2026-03-13T09:00:00',
  },
  {
    id: 'alert-002',
    type: 'info',
    title: 'Novo template aprovado',
    message: 'O template "Confirmação de Entrega" foi aprovado pela Meta.',
    createdAt: '2026-03-12T16:30:00',
  },
  {
    id: 'alert-003',
    type: 'success',
    title: 'Campanha concluída',
    message: 'A campanha "Promoção Black Friday 2026" foi concluída com sucesso.',
    createdAt: '2026-03-12T11:00:00',
  },
];

export const mockCampaigns: Campaign[] = [
  {
    id: 'camp-001',
    name: 'Promoção Black Friday 2026',
    status: 'completed',
    total: 15234,
    sent: 15234,
    delivered: 14965,
    read: 12543,
    failed: 269,
    createdAt: '2026-03-12T10:30:00',
    completedAt: '2026-03-12T11:00:00',
    template: 'promocao_black_friday',
  },
  {
    id: 'camp-002',
    name: 'Lembrete Pagamento - Março',
    status: 'sending',
    total: 12000,
    sent: 8432,
    delivered: 8234,
    read: 6123,
    failed: 198,
    createdAt: '2026-03-13T08:15:00',
    template: 'lembrete_pagamento',
  },
  {
    id: 'camp-003',
    name: 'Newsletter Semanal',
    status: 'scheduled',
    total: 25000,
    sent: 0,
    delivered: 0,
    read: 0,
    failed: 0,
    createdAt: '2026-03-13T12:00:00',
    scheduledFor: '2026-03-15T09:00:00',
    template: 'newsletter_semanal',
  },
  {
    id: 'camp-004',
    name: 'Confirmação de Pedidos',
    status: 'completed',
    total: 3421,
    sent: 3421,
    delivered: 3391,
    read: 3256,
    failed: 30,
    createdAt: '2026-03-13T06:00:00',
    completedAt: '2026-03-13T06:30:00',
    template: 'confirmacao_pedido',
  },
  {
    id: 'camp-005',
    name: 'Recuperação de Carrinho',
    status: 'completed',
    total: 1876,
    sent: 1876,
    delivered: 1817,
    read: 1432,
    failed: 59,
    createdAt: '2026-03-12T18:45:00',
    completedAt: '2026-03-12T19:15:00',
    template: 'recuperacao_carrinho',
  },
  {
    id: 'camp-006',
    name: 'Pesquisa de Satisfação',
    status: 'completed',
    total: 8765,
    sent: 8765,
    delivered: 8543,
    read: 6234,
    failed: 222,
    createdAt: '2026-03-11T14:00:00',
    completedAt: '2026-03-11T15:00:00',
    template: 'pesquisa_satisfacao',
  },
  {
    id: 'camp-007',
    name: 'Boas-vindas Novos Clientes',
    status: 'completed',
    total: 542,
    sent: 542,
    delivered: 538,
    read: 512,
    failed: 4,
    createdAt: '2026-03-10T10:00:00',
    completedAt: '2026-03-10T10:15:00',
    template: 'boas_vindas',
  },
];

export const mockTemplates: Template[] = [
  {
    id: 'tpl-001',
    name: 'promocao_black_friday',
    category: 'MARKETING',
    status: 'APPROVED',
    language: 'pt_BR',
    header: {
      type: 'IMAGE',
      content: 'https://via.placeholder.com/400x200/00A988/FFFFFF?text=Black+Friday',
    },
    body: 'Olá {{1}}! 🎉\n\nNossa Black Friday chegou com descontos de até 70%!\n\nAproveite as ofertas imperdíveis em toda a loja. Válido até {{2}}.\n\nAcesse agora: {{3}}',
    footer: 'Promoção válida enquanto durarem os estoques',
    buttons: [
      { type: 'URL', text: 'Ver Ofertas', url: 'https://exemplo.com/blackfriday' },
    ],
    createdAt: '2026-03-01T10:00:00',
    approvedAt: '2026-03-02T14:30:00',
  },
  {
    id: 'tpl-002',
    name: 'lembrete_pagamento',
    category: 'UTILITY',
    status: 'APPROVED',
    language: 'pt_BR',
    body: 'Olá {{1}},\n\nLembramos que sua fatura no valor de R$ {{2}} vence em {{3}}.\n\nCódigo de barras: {{4}}\n\nPague agora para evitar juros e multas.',
    footer: 'Dúvidas? Responda esta mensagem',
    buttons: [
      { type: 'URL', text: 'Pagar Agora', url: 'https://exemplo.com/pagamento' },
    ],
    createdAt: '2026-02-15T09:00:00',
    approvedAt: '2026-02-16T11:00:00',
  },
  {
    id: 'tpl-003',
    name: 'confirmacao_pedido',
    category: 'UTILITY',
    status: 'APPROVED',
    language: 'pt_BR',
    header: {
      type: 'TEXT',
      content: 'Pedido Confirmado ✅',
    },
    body: 'Olá {{1}}!\n\nSeu pedido #{{2}} foi confirmado com sucesso.\n\nValor: R$ {{3}}\nPrevisão de entrega: {{4}}\n\nAcompanhe seu pedido em tempo real.',
    footer: 'Obrigado por comprar conosco!',
    buttons: [
      { type: 'URL', text: 'Acompanhar Pedido', url: 'https://exemplo.com/pedido' },
    ],
    createdAt: '2026-02-20T14:00:00',
    approvedAt: '2026-02-21T10:30:00',
  },
  {
    id: 'tpl-004',
    name: 'recuperacao_carrinho',
    category: 'MARKETING',
    status: 'APPROVED',
    language: 'pt_BR',
    body: 'Oi {{1}}! 🛒\n\nVimos que você deixou alguns itens no carrinho.\n\nNão perca! Finalize sua compra agora e ganhe 10% de desconto.\n\nCódigo: VOLTA10',
    footer: 'Oferta válida por 24 horas',
    buttons: [
      { type: 'URL', text: 'Finalizar Compra', url: 'https://exemplo.com/carrinho' },
    ],
    createdAt: '2026-02-25T16:00:00',
    approvedAt: '2026-02-26T09:00:00',
  },
  {
    id: 'tpl-005',
    name: 'newsletter_semanal',
    category: 'MARKETING',
    status: 'APPROVED',
    language: 'pt_BR',
    header: {
      type: 'TEXT',
      content: 'Newsletter Semanal 📰',
    },
    body: 'Olá {{1}}!\n\nConfira as novidades desta semana:\n\n✨ {{2}}\n🎁 {{3}}\n🚀 {{4}}\n\nFique por dentro de tudo!',
    footer: 'Enviado semanalmente',
    buttons: [
      { type: 'URL', text: 'Ler Mais', url: 'https://exemplo.com/newsletter' },
    ],
    createdAt: '2026-03-05T10:00:00',
    approvedAt: '2026-03-06T15:00:00',
  },
  {
    id: 'tpl-006',
    name: 'pesquisa_satisfacao',
    category: 'MARKETING',
    status: 'APPROVED',
    language: 'pt_BR',
    body: 'Olá {{1}}!\n\nQueremos ouvir você! 🎯\n\nO que achou do nosso atendimento?\n\nSua opinião é muito importante para nós.',
    footer: 'Leva menos de 1 minuto',
    buttons: [
      { type: 'URL', text: 'Responder Pesquisa', url: 'https://exemplo.com/pesquisa' },
    ],
    createdAt: '2026-03-08T11:00:00',
    approvedAt: '2026-03-09T14:00:00',
  },
  {
    id: 'tpl-007',
    name: 'boas_vindas',
    category: 'MARKETING',
    status: 'APPROVED',
    language: 'pt_BR',
    header: {
      type: 'TEXT',
      content: 'Bem-vindo(a)! 🎉',
    },
    body: 'Olá {{1}}!\n\nSeja bem-vindo(a) à nossa loja! 🛍️\n\nEstamos felizes em ter você conosco.\n\nAproveite 15% OFF na sua primeira compra com o código: BEMVINDO15',
    footer: 'Válido para primeira compra',
    buttons: [
      { type: 'URL', text: 'Começar a Comprar', url: 'https://exemplo.com/inicio' },
    ],
    createdAt: '2026-03-10T08:00:00',
    approvedAt: '2026-03-10T09:30:00',
  },
  {
    id: 'tpl-008',
    name: 'autenticacao_codigo',
    category: 'AUTHENTICATION',
    status: 'APPROVED',
    language: 'pt_BR',
    body: 'Seu código de verificação é: {{1}}\n\nNão compartilhe este código com ninguém.\n\nVálido por 5 minutos.',
    footer: 'Código de segurança',
    createdAt: '2026-01-15T10:00:00',
    approvedAt: '2026-01-15T11:00:00',
  },
  {
    id: 'tpl-009',
    name: 'confirmacao_agendamento',
    category: 'UTILITY',
    status: 'PENDING',
    language: 'pt_BR',
    body: 'Olá {{1}}!\n\nSeu agendamento foi confirmado:\n\nData: {{2}}\nHorário: {{3}}\nLocal: {{4}}\n\nNos vemos em breve!',
    footer: 'Para reagendar, entre em contato',
    createdAt: '2026-03-12T14:00:00',
  },
  {
    id: 'tpl-010',
    name: 'entrega_realizada',
    category: 'UTILITY',
    status: 'APPROVED',
    language: 'pt_BR',
    header: {
      type: 'TEXT',
      content: 'Entrega Concluída 📦',
    },
    body: 'Olá {{1}}!\n\nSeu pedido #{{2}} foi entregue com sucesso!\n\nRecebido por: {{3}}\nData/Hora: {{4}}\n\nObrigado pela preferência!',
    footer: 'Avalie sua experiência',
    buttons: [
      { type: 'URL', text: 'Avaliar Entrega', url: 'https://exemplo.com/avaliar' },
    ],
    createdAt: '2026-03-11T16:00:00',
    approvedAt: '2026-03-12T10:00:00',
  },
];

export const mockContacts = [
  { nome: 'João Silva', telefone: '+5511987654321', empresa: 'Tech Solutions Ltda' },
  { nome: 'Maria Santos', telefone: '+5511976543210', empresa: 'Comercial Oliveira' },
  { nome: 'Pedro Oliveira', telefone: '+5521987651234', empresa: 'Indústria XYZ' },
  { nome: 'Ana Costa', telefone: '+5521976541234', empresa: 'Varejo ABC' },
  { nome: 'Carlos Souza', telefone: '+5511965432109', empresa: 'Serviços Gerais SA' },
];
