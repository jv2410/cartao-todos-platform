'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import { Sidebar } from '@/components/shared/Sidebar';
import { PageHeader } from '@/components/shared/PageHeader';
import { mockCampaigns } from '@/lib/mockData';
import {
  Send,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Download,
  Filter,
  Calendar,
  TrendingUp,
  Users,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { Button } from '@/components/ui/button';

/**
 * Página de Campanhas
 * Histórico e analytics de campanhas enviadas
 */
export default function CampanhasPage() {
  const router = useRouter();
  const { user, isLoading, logout, isAuthenticated } = useAuth();
  const [filter, setFilter] = useState<'all' | 'completed' | 'sending' | 'scheduled' | 'failed'>('all');

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const filteredCampaigns = filter === 'all'
    ? mockCampaigns
    : mockCampaigns.filter(c => c.status === filter);

  const stats = {
    total: mockCampaigns.length,
    completed: mockCampaigns.filter(c => c.status === 'completed').length,
    sending: mockCampaigns.filter(c => c.status === 'sending').length,
    scheduled: mockCampaigns.filter(c => c.status === 'scheduled').length,
  };

  const totalSent = mockCampaigns.reduce((acc, c) => acc + c.sent, 0);
  const totalDelivered = mockCampaigns.reduce((acc, c) => acc + c.delivered, 0);
  const totalRead = mockCampaigns.reduce((acc, c) => acc + c.read, 0);
  const totalFailed = mockCampaigns.reduce((acc, c) => acc + c.failed, 0);

  const pieData = [
    { name: 'Entregues', value: totalDelivered, color: '#10b981' },
    { name: 'Lidos', value: totalRead, color: '#8b5cf6' },
    { name: 'Falharam', value: totalFailed, color: '#ef4444' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar username={user.username} onLogout={logout} />

      <main className="flex-1 lg:ml-64 p-8">
        <PageHeader
          title="Campanhas"
          description="Histórico e analytics das suas campanhas WhatsApp"
          action={
            <Button onClick={() => router.push('/disparos')}>
              <Send className="w-4 h-4 mr-2" />
              Nova Campanha
            </Button>
          }
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <Send className="w-8 h-8 text-blue-500" />
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {totalSent.toLocaleString('pt-BR')}
            </p>
            <p className="text-sm text-gray-600">Total Enviados</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {totalDelivered.toLocaleString('pt-BR')}
            </p>
            <p className="text-sm text-gray-600">Entregues</p>
            <p className="text-xs text-green-600 mt-1">
              {((totalDelivered / totalSent) * 100).toFixed(1)}% taxa de entrega
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <Eye className="w-8 h-8 text-purple-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {totalRead.toLocaleString('pt-BR')}
            </p>
            <p className="text-sm text-gray-600">Lidos</p>
            <p className="text-xs text-purple-600 mt-1">
              {((totalRead / totalDelivered) * 100).toFixed(1)}% taxa de leitura
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-orange-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-sm text-gray-600">Total Campanhas</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Performance by Campaign */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Performance por Campanha
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockCampaigns.filter(c => c.status === 'completed').slice(0, 5)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="name"
                  stroke="#6b7280"
                  fontSize={11}
                  angle={-15}
                  textAnchor="end"
                  height={80}
                />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="delivered" fill="#10b981" name="Entregues" />
                <Bar dataKey="read" fill="#8b5cf6" name="Lidos" />
                <Bar dataKey="failed" fill="#ef4444" name="Falhas" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Status Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Distribuição de Status
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Campaigns List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Todas as Campanhas
              </h3>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as 'all' | 'completed' | 'sending' | 'scheduled' | 'failed')}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="all">Todas ({stats.total})</option>
                  <option value="completed">Concluídas ({stats.completed})</option>
                  <option value="sending">Enviando ({stats.sending})</option>
                  <option value="scheduled">Agendadas ({stats.scheduled})</option>
                </select>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredCampaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-gray-900">
                        {campaign.name}
                      </h4>
                      <StatusBadge status={campaign.status} />
                    </div>

                    <div className="grid grid-cols-4 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-gray-500">Total</p>
                        <p className="text-sm font-medium text-gray-900">
                          {campaign.total.toLocaleString('pt-BR')}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Enviados</p>
                        <p className="text-sm font-medium text-gray-900">
                          {campaign.sent.toLocaleString('pt-BR')}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Entregues</p>
                        <p className="text-sm font-medium text-green-600">
                          {campaign.delivered.toLocaleString('pt-BR')}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Lidos</p>
                        <p className="text-sm font-medium text-purple-600">
                          {campaign.read.toLocaleString('pt-BR')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(campaign.createdAt).toLocaleString('pt-BR')}
                      </span>
                      {campaign.completedAt && (
                        <span>
                          Concluída: {new Date(campaign.completedAt).toLocaleString('pt-BR')}
                        </span>
                      )}
                      {campaign.scheduledFor && (
                        <span>
                          Agendada para: {new Date(campaign.scheduledFor).toLocaleString('pt-BR')}
                        </span>
                      )}
                    </div>

                    {/* Progress Bar */}
                    {campaign.status === 'sending' && (
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                          <span>Progresso</span>
                          <span>{((campaign.sent / campaign.total) * 100).toFixed(0)}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 transition-all"
                            style={{ width: `${(campaign.sent / campaign.total) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        alert('Exportando relatório...');
                      }}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

function StatusBadge({ status }: { status: 'completed' | 'sending' | 'scheduled' | 'failed' }) {
  const config = {
    completed: {
      icon: CheckCircle,
      text: 'Concluída',
      className: 'bg-green-100 text-green-700 border-green-200',
    },
    sending: {
      icon: Send,
      text: 'Enviando',
      className: 'bg-blue-100 text-blue-700 border-blue-200',
    },
    scheduled: {
      icon: Clock,
      text: 'Agendada',
      className: 'bg-orange-100 text-orange-700 border-orange-200',
    },
    failed: {
      icon: XCircle,
      text: 'Falhou',
      className: 'bg-red-100 text-red-700 border-red-200',
    },
  };

  const { icon: Icon, text, className } = config[status];

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${className}`}>
      <Icon className="w-3.5 h-3.5" />
      {text}
    </span>
  );
}
