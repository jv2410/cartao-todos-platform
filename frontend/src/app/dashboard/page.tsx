'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import { Sidebar } from '@/components/shared/Sidebar';
import { PageHeader } from '@/components/shared/PageHeader';
import {
  mockDashboardStats,
  mockChartData,
  mockRecentCampaigns,
  mockAlerts,
} from '@/lib/mockData';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  Send,
  CheckCircle2,
  Eye,
  TrendingUp,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowUpRight,
} from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Dashboard Page - Nível Apple de Excelência
 * Analytics de disparos WhatsApp Business com animações fluidas
 */
export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoading, logout, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary-50">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-3 border-primary-600 border-t-transparent rounded-full mx-auto"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-secondary-600 font-medium"
          >
            Carregando...
          </motion.p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-secondary-50 flex">
      <Sidebar username={user.username} onLogout={logout} />

      <main className="flex-1 lg:ml-64 p-6 md:p-8">
        {/* Force Password Change Warning */}
        {user.force_password_change && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="alert alert-warning mb-6"
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold">Alteração de senha obrigatória</h3>
              <p className="text-sm mt-1">
                Por favor, altere sua senha padrão antes de continuar.
                <button
                  onClick={() => router.push('/change-password')}
                  className="ml-2 underline font-semibold hover:text-warning-700 transition-colors"
                >
                  Alterar senha agora
                </button>
              </p>
            </div>
          </motion.div>
        )}

        <PageHeader
          title="Dashboard"
          description="Visão geral dos seus disparos WhatsApp Business"
        />

        {/* Stats Cards with stagger animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Send}
            label="Total de Disparos"
            value={mockDashboardStats.totalDisparos.toLocaleString('pt-BR')}
            color="blue"
            trend="+12.5%"
            delay={0}
          />
          <StatCard
            icon={CheckCircle2}
            label="Taxa de Entrega"
            value={`${mockDashboardStats.taxaEntrega}%`}
            color="green"
            trend="+2.3%"
            delay={0.1}
          />
          <StatCard
            icon={Eye}
            label="Taxa de Leitura"
            value={`${mockDashboardStats.taxaLeitura}%`}
            color="purple"
            trend="+5.1%"
            delay={0.2}
          />
          <StatCard
            icon={Calendar}
            label="Disparos Hoje"
            value={mockDashboardStats.disparosHoje.toLocaleString('pt-BR')}
            color="orange"
            delay={0.3}
          />
        </div>

        {/* Chart Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="card p-6 mb-8 hover:shadow-elevation-3 transition-shadow duration-250"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-secondary-900">
              Disparos - Últimos 7 dias
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-sm text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-1"
            >
              Ver detalhes
              <ArrowUpRight className="w-4 h-4" />
            </motion.button>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={mockChartData}>
              <defs>
                <linearGradient id="colorEnviados" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorEntregues" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorLidos" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.5} />
              <XAxis
                dataKey="date"
                stroke="#64748b"
                fontSize={13}
                tickLine={false}
                axisLine={{ stroke: '#e2e8f0' }}
              />
              <YAxis
                stroke="#64748b"
                fontSize={13}
                tickLine={false}
                axisLine={{ stroke: '#e2e8f0' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.98)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  padding: '12px',
                }}
                labelStyle={{ fontWeight: 600, color: '#1e293b', marginBottom: '8px' }}
              />
              <Legend
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="circle"
              />
              <Line
                type="monotone"
                dataKey="enviados"
                stroke="#3b82f6"
                strokeWidth={3}
                name="Enviados"
                dot={{ fill: '#3b82f6', r: 5, strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 7 }}
                fill="url(#colorEnviados)"
              />
              <Line
                type="monotone"
                dataKey="entregues"
                stroke="#10b981"
                strokeWidth={3}
                name="Entregues"
                dot={{ fill: '#10b981', r: 5, strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 7 }}
                fill="url(#colorEntregues)"
              />
              <Line
                type="monotone"
                dataKey="lidos"
                stroke="#8b5cf6"
                strokeWidth={3}
                name="Lidos"
                dot={{ fill: '#8b5cf6', r: 5, strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 7 }}
                fill="url(#colorLidos)"
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Bottom Grid: Recent Campaigns + Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Campaigns */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-secondary-900">
                Últimas Campanhas
              </h2>
              <motion.button
                onClick={() => router.push('/campanhas')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-sm text-primary-600 hover:text-primary-700 font-semibold"
              >
                Ver todas
              </motion.button>
            </div>
            <div className="space-y-3">
              {mockRecentCampaigns.slice(0, 5).map((campaign, index) => (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  onClick={() => router.push(`/campanhas/${campaign.id}`)}
                  className="flex items-center gap-4 p-4 rounded-lg border border-secondary-200 hover:border-primary-300 hover:shadow-elevation-2 transition-all duration-200 ease-apple cursor-pointer group"
                >
                  <div className="flex-shrink-0">
                    {campaign.status === 'completed' && (
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-success-500 to-success-600 flex items-center justify-center shadow-elevation-1 group-hover:shadow-elevation-2 transition-shadow">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                    )}
                    {campaign.status === 'sending' && (
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-info-500 to-info-600 flex items-center justify-center shadow-elevation-1 group-hover:shadow-elevation-2 transition-shadow">
                        <Send className="w-6 h-6 text-white" />
                      </div>
                    )}
                    {campaign.status === 'scheduled' && (
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-warning-500 to-warning-600 flex items-center justify-center shadow-elevation-1 group-hover:shadow-elevation-2 transition-shadow">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-secondary-900 truncate group-hover:text-primary-700 transition-colors">
                      {campaign.name}
                    </p>
                    <p className="text-xs text-secondary-500 mt-0.5">
                      {campaign.sent.toLocaleString('pt-BR')} / {campaign.total.toLocaleString('pt-BR')} enviados
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-secondary-900">
                      {campaign.deliveryRate > 0 ? `${campaign.deliveryRate.toFixed(1)}%` : '-'}
                    </p>
                    <p className="text-xs text-secondary-500">Taxa entrega</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Alerts */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="card p-6"
          >
            <h2 className="text-xl font-bold text-secondary-900 mb-6">
              Alertas e Notificações
            </h2>
            <div className="space-y-4">
              {mockAlerts.map((alert, index) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
                  className={`p-4 rounded-xl border ${
                    alert.type === 'warning'
                      ? 'bg-warning-50 border-warning-200'
                      : alert.type === 'error'
                      ? 'bg-error-50 border-error-200'
                      : alert.type === 'success'
                      ? 'bg-success-50 border-success-200'
                      : 'bg-info-50 border-info-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {alert.type === 'warning' && (
                        <AlertCircle className="w-5 h-5 text-warning-600" />
                      )}
                      {alert.type === 'success' && (
                        <CheckCircle className="w-5 h-5 text-success-600" />
                      )}
                      {alert.type === 'info' && (
                        <AlertCircle className="w-5 h-5 text-info-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`text-sm font-semibold ${
                          alert.type === 'warning'
                            ? 'text-warning-900'
                            : alert.type === 'error'
                            ? 'text-error-900'
                            : alert.type === 'success'
                            ? 'text-success-900'
                            : 'text-info-900'
                        }`}
                      >
                        {alert.title}
                      </h3>
                      <p
                        className={`text-sm mt-1 ${
                          alert.type === 'warning'
                            ? 'text-warning-700'
                            : alert.type === 'error'
                            ? 'text-error-700'
                            : alert.type === 'success'
                            ? 'text-success-700'
                            : 'text-info-700'
                        }`}
                      >
                        {alert.message}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-secondary-200">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-4 bg-gradient-to-br from-primary-50 to-primary-100/50 rounded-xl cursor-pointer"
                >
                  <p className="text-3xl font-bold text-primary-600">
                    {mockDashboardStats.campanhasAtivas}
                  </p>
                  <p className="text-xs text-secondary-600 mt-1 font-medium">Campanhas Ativas</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 1 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-4 bg-gradient-to-br from-primary-50 to-primary-100/50 rounded-xl cursor-pointer"
                >
                  <p className="text-3xl font-bold text-primary-600">
                    {mockDashboardStats.templatesAprovados}
                  </p>
                  <p className="text-xs text-secondary-600 mt-1 font-medium">Templates Aprovados</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

interface StatCardProps {
  icon: any;
  label: string;
  value: string;
  color: 'blue' | 'green' | 'purple' | 'orange';
  trend?: string;
  delay: number;
}

function StatCard({ icon: Icon, label, value, color, trend, delay }: StatCardProps) {
  const colorClasses = {
    blue: {
      bg: 'bg-gradient-to-br from-info-500 to-info-600',
      glow: 'group-hover:shadow-info-500/20',
    },
    green: {
      bg: 'bg-gradient-to-br from-success-500 to-success-600',
      glow: 'group-hover:shadow-success-500/20',
    },
    purple: {
      bg: 'bg-gradient-to-br from-purple-500 to-purple-600',
      glow: 'group-hover:shadow-purple-500/20',
    },
    orange: {
      bg: 'bg-gradient-to-br from-warning-500 to-warning-600',
      glow: 'group-hover:shadow-warning-500/20',
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="stat-card group"
    >
      <div className="flex items-center justify-between mb-4">
        <motion.div
          whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
          transition={{ duration: 0.4 }}
          className={`stat-card-icon ${colorClasses[color].bg} ${colorClasses[color].glow} transition-shadow duration-250`}
        >
          <Icon className="w-6 h-6 text-white" />
        </motion.div>
        {trend && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + 0.2 }}
            className="flex items-center gap-1 text-success-600 text-sm font-semibold px-2 py-1 bg-success-50 rounded-md"
          >
            <TrendingUp className="w-4 h-4" />
            <span>{trend}</span>
          </motion.div>
        )}
      </div>
      <p className="text-secondary-600 text-sm mb-2 font-medium">{label}</p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.3 }}
        className="text-3xl font-bold text-secondary-900"
      >
        {value}
      </motion.p>
    </motion.div>
  );
}
