'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import { Sidebar } from '@/components/shared/Sidebar';
import { PageHeader } from '@/components/shared/PageHeader';
import { mockTemplates } from '@/lib/mockData';
import {
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  Plus,
  Eye,
  Edit,
  Smartphone,
  Filter,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Página de Templates WhatsApp
 * Gerenciamento de templates aprovados pela Meta
 */
export default function TemplatesPage() {
  const router = useRouter();
  const { user, isLoading, logout, isAuthenticated } = useAuth();
  const [filter, setFilter] = useState<'all' | 'APPROVED' | 'PENDING' | 'REJECTED'>('all');
  const [selectedTemplate, setSelectedTemplate] = useState<typeof mockTemplates[0] | null>(null);

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

  const filteredTemplates = filter === 'all'
    ? mockTemplates
    : mockTemplates.filter(t => t.status === filter);

  const stats = {
    total: mockTemplates.length,
    approved: mockTemplates.filter(t => t.status === 'APPROVED').length,
    pending: mockTemplates.filter(t => t.status === 'PENDING').length,
    rejected: mockTemplates.filter(t => t.status === 'REJECTED').length,
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar username={user.username} onLogout={logout} />

      <main className="flex-1 lg:ml-64 p-8">
        <PageHeader
          title="Templates WhatsApp"
          description="Gerencie seus templates aprovados pela Meta"
          action={
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Novo Template
            </Button>
          }
        />

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <FileText className="w-8 h-8 text-gray-400" />
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <p className="text-sm text-gray-600">Total de Templates</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
            </div>
            <p className="text-sm text-gray-600">Aprovados</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 text-orange-500" />
              <p className="text-2xl font-bold text-orange-600">{stats.pending}</p>
            </div>
            <p className="text-sm text-gray-600">Pendentes</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <XCircle className="w-8 h-8 text-red-500" />
              <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
            </div>
            <p className="text-sm text-gray-600">Rejeitados</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Template List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              {/* Filter Tabs */}
              <div className="flex items-center gap-2 p-4 border-b border-gray-200">
                <Filter className="w-4 h-4 text-gray-500" />
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === 'all'
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Todos ({stats.total})
                </button>
                <button
                  onClick={() => setFilter('APPROVED')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === 'APPROVED'
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Aprovados ({stats.approved})
                </button>
                <button
                  onClick={() => setFilter('PENDING')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === 'PENDING'
                      ? 'bg-orange-100 text-orange-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Pendentes ({stats.pending})
                </button>
              </div>

              {/* Templates */}
              <div className="divide-y divide-gray-200">
                {filteredTemplates.map((template) => (
                  <div
                    key={template.id}
                    onClick={() => setSelectedTemplate(template)}
                    className={`p-6 cursor-pointer transition-colors ${
                      selectedTemplate?.id === template.id
                        ? 'bg-primary-50'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900">
                            {template.name}
                          </h3>
                          <StatusBadge status={template.status} />
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">
                            {template.category}
                          </span>
                          <span>{template.language}</span>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTemplate(template);
                        }}
                        className="text-primary-600 hover:text-primary-700"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {template.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Template Preview */}
          <div className="lg:col-span-1">
            {selectedTemplate ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-gray-900">Preview</h3>
                  <Smartphone className="w-5 h-5 text-gray-400" />
                </div>

                {/* WhatsApp-like Preview */}
                <div className="bg-gradient-to-b from-gray-100 to-gray-200 rounded-lg p-4">
                  <div className="bg-white rounded-lg shadow-sm p-4 max-w-xs">
                    {selectedTemplate.header && (
                      <div className="mb-3">
                        {selectedTemplate.header.type === 'TEXT' && (
                          <h4 className="font-semibold text-gray-900">
                            {selectedTemplate.header.content}
                          </h4>
                        )}
                        {selectedTemplate.header.type === 'IMAGE' && (
                          <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                            <FileText className="w-8 h-8 text-gray-400" />
                          </div>
                        )}
                      </div>
                    )}

                    <p className="text-sm text-gray-800 whitespace-pre-wrap mb-3">
                      {selectedTemplate.body}
                    </p>

                    {selectedTemplate.footer && (
                      <p className="text-xs text-gray-500 mb-3">
                        {selectedTemplate.footer}
                      </p>
                    )}

                    {selectedTemplate.buttons && selectedTemplate.buttons.length > 0 && (
                      <div className="space-y-2 pt-2 border-t border-gray-200">
                        {selectedTemplate.buttons.map((button, index) => (
                          <button
                            key={index}
                            className="w-full py-2 text-sm text-primary-600 font-medium hover:bg-gray-50 rounded"
                          >
                            {button.text}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Template Details */}
                <div className="mt-6 space-y-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Status</p>
                    <StatusBadge status={selectedTemplate.status} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Categoria</p>
                    <p className="text-sm font-medium text-gray-900">
                      {selectedTemplate.category}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Idioma</p>
                    <p className="text-sm font-medium text-gray-900">
                      {selectedTemplate.language}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Criado em</p>
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(selectedTemplate.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  {selectedTemplate.approvedAt && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Aprovado em</p>
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(selectedTemplate.approvedAt).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-6 space-y-2">
                  <Button
                    className="w-full"
                    onClick={() => router.push('/disparos')}
                  >
                    Usar em Disparo
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Edit className="w-4 h-4 mr-2" />
                    Editar Template
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center sticky top-8">
                <Smartphone className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  Selecione um template para visualizar
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function StatusBadge({ status }: { status: 'APPROVED' | 'PENDING' | 'REJECTED' }) {
  const config = {
    APPROVED: {
      icon: CheckCircle,
      text: 'Aprovado',
      className: 'bg-green-100 text-green-700 border-green-200',
    },
    PENDING: {
      icon: Clock,
      text: 'Pendente',
      className: 'bg-orange-100 text-orange-700 border-orange-200',
    },
    REJECTED: {
      icon: XCircle,
      text: 'Rejeitado',
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
