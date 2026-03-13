'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import { Sidebar } from '@/components/shared/Sidebar';
import { PageHeader } from '@/components/shared/PageHeader';
import { mockTemplates, mockContacts } from '@/lib/mockData';
import {
  Upload,
  FileText,
  Send,
  CheckCircle,
  AlertCircle,
  Download,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

/**
 * Página de Disparos em Massa
 * Import CSV, seleção de template, agendamento
 */
export default function DisparosPage() {
  const router = useRouter();
  const { user, isLoading, logout, isAuthenticated } = useAuth();
  const [step, setStep] = useState<'upload' | 'template' | 'preview' | 'schedule'>('upload');
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvPreview, setCsvPreview] = useState<Array<{ nome: string; telefone: string; empresa: string }>>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [campaignName, setCampaignName] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [sendNow, setSendNow] = useState(true);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'text/csv') {
      setCsvFile(file);
      // Simular preview com dados mock
      setCsvPreview(mockContacts);
    }
  };

  const handleDownloadTemplate = () => {
    const csvContent = 'nome,telefone,empresa\nJoão Silva,+5511987654321,Tech Solutions Ltda\n';
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'template_disparos.csv';
    a.click();
  };

  const handleSendCampaign = () => {
    // Simular envio
    alert('Campanha criada com sucesso! Redirecionando para campanhas...');
    router.push('/campanhas');
  };

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

  const approvedTemplates = mockTemplates.filter(t => t.status === 'APPROVED');

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar username={user.username} onLogout={logout} />

      <main className="flex-1 lg:ml-64 p-8">
        <PageHeader
          title="Disparos em Massa"
          description="Envie mensagens WhatsApp em massa para sua lista de contatos"
        />

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-3xl">
            <StepIndicator
              number={1}
              label="Upload CSV"
              active={step === 'upload'}
              completed={csvFile !== null}
            />
            <div className="flex-1 h-0.5 bg-gray-300 mx-2">
              <div
                className={`h-full bg-primary-600 transition-all ${
                  csvFile ? 'w-full' : 'w-0'
                }`}
              />
            </div>
            <StepIndicator
              number={2}
              label="Template"
              active={step === 'template'}
              completed={selectedTemplate !== ''}
            />
            <div className="flex-1 h-0.5 bg-gray-300 mx-2">
              <div
                className={`h-full bg-primary-600 transition-all ${
                  selectedTemplate ? 'w-full' : 'w-0'
                }`}
              />
            </div>
            <StepIndicator
              number={3}
              label="Preview"
              active={step === 'preview'}
              completed={campaignName !== ''}
            />
            <div className="flex-1 h-0.5 bg-gray-300 mx-2">
              <div
                className={`h-full bg-primary-600 transition-all ${
                  campaignName ? 'w-full' : 'w-0'
                }`}
              />
            </div>
            <StepIndicator
              number={4}
              label="Agendar"
              active={step === 'schedule'}
              completed={false}
            />
          </div>
        </div>

        {/* Step 1: Upload CSV */}
        {step === 'upload' && (
          <div className="max-w-3xl">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="text-center mb-6">
                <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Importar Lista de Contatos
                </h2>
                <p className="text-gray-600">
                  Faça upload de um arquivo CSV com seus contatos
                </p>
              </div>

              {!csvFile ? (
                <>
                  <label className="block w-full cursor-pointer">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 hover:border-primary-500 transition-colors">
                      <div className="text-center">
                        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-2">
                          Clique para selecionar ou arraste o arquivo
                        </p>
                        <p className="text-sm text-gray-500">CSV até 10MB</p>
                      </div>
                    </div>
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>

                  <div className="mt-6 text-center">
                    <button
                      onClick={handleDownloadTemplate}
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-2 mx-auto"
                    >
                      <Download className="w-4 h-4" />
                      Baixar template CSV
                    </button>
                  </div>
                </>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="text-sm font-medium text-green-900">
                          {csvFile.name}
                        </p>
                        <p className="text-xs text-green-700">
                          {csvPreview.length} contatos encontrados
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setCsvFile(null);
                        setCsvPreview([]);
                      }}
                      className="text-green-600 hover:text-green-700"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Preview */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">
                      Preview dos Contatos
                    </h3>
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Nome
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Telefone
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Empresa
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {csvPreview.slice(0, 5).map((contact, index) => (
                            <tr key={index}>
                              <td className="px-4 py-3 text-sm text-gray-900">
                                {contact.nome}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-600">
                                {contact.telefone}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-600">
                                {contact.empresa}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {csvPreview.length > 5 && (
                        <div className="px-4 py-2 bg-gray-50 text-center text-sm text-gray-600">
                          + {csvPreview.length - 5} contatos adicionais
                        </div>
                      )}
                    </div>
                  </div>

                  <Button
                    onClick={() => setStep('template')}
                    className="w-full"
                  >
                    Continuar para Seleção de Template
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 2: Select Template */}
        {step === 'template' && (
          <div className="max-w-4xl">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Selecione um Template
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {approvedTemplates.map((template) => (
                  <div
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedTemplate === template.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {template.name}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {template.category} • {template.language}
                        </p>
                      </div>
                      {selectedTemplate === template.id && (
                        <CheckCircle className="w-5 h-5 text-primary-600" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {template.body}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => setStep('upload')}
                  className="flex-1"
                >
                  Voltar
                </Button>
                <Button
                  onClick={() => setStep('preview')}
                  disabled={!selectedTemplate}
                  className="flex-1"
                >
                  Continuar para Preview
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Preview */}
        {step === 'preview' && (
          <div className="max-w-4xl">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Revisar Campanha
              </h2>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="campaignName">Nome da Campanha</Label>
                  <Input
                    id="campaignName"
                    value={campaignName}
                    onChange={(e) => setCampaignName(e.target.value)}
                    placeholder="Ex: Promoção Março 2026"
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Total de Contatos</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {csvPreview.length}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Template Selecionado</p>
                    <p className="text-sm font-medium text-gray-900">
                      {approvedTemplates.find(t => t.id === selectedTemplate)?.name}
                    </p>
                  </div>
                </div>

                <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-blue-900">
                        Preview da Mensagem
                      </h3>
                      <p className="text-sm text-blue-700 mt-2 whitespace-pre-wrap">
                        {approvedTemplates.find(t => t.id === selectedTemplate)?.body}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setStep('template')}
                    className="flex-1"
                  >
                    Voltar
                  </Button>
                  <Button
                    onClick={() => setStep('schedule')}
                    disabled={!campaignName}
                    className="flex-1"
                  >
                    Continuar para Agendamento
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Schedule */}
        {step === 'schedule' && (
          <div className="max-w-3xl">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Agendar Envio
              </h2>

              <div className="space-y-6">
                <div className="space-y-4">
                  <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary-300">
                    <input
                      type="radio"
                      checked={sendNow}
                      onChange={() => setSendNow(true)}
                      className="w-4 h-4 text-primary-600"
                    />
                    <div>
                      <p className="font-medium text-gray-900">Enviar Agora</p>
                      <p className="text-sm text-gray-600">
                        Os disparos começarão imediatamente
                      </p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary-300">
                    <input
                      type="radio"
                      checked={!sendNow}
                      onChange={() => setSendNow(false)}
                      className="w-4 h-4 text-primary-600"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Agendar para depois</p>
                      <p className="text-sm text-gray-600 mb-3">
                        Escolha data e horário
                      </p>
                      {!sendNow && (
                        <div className="grid grid-cols-2 gap-4">
                          <Input
                            type="date"
                            value={scheduleDate}
                            onChange={(e) => setScheduleDate(e.target.value)}
                          />
                          <Input
                            type="time"
                            value={scheduleTime}
                            onChange={(e) => setScheduleTime(e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                  </label>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-green-900">
                        Tudo pronto!
                      </h3>
                      <p className="text-sm text-green-700 mt-1">
                        Sua campanha &quot;{campaignName}&quot; será enviada para {csvPreview.length} contatos.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setStep('preview')}
                    className="flex-1"
                  >
                    Voltar
                  </Button>
                  <Button
                    onClick={handleSendCampaign}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {sendNow ? 'Iniciar Disparos' : 'Agendar Campanha'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

interface StepIndicatorProps {
  number: number;
  label: string;
  active: boolean;
  completed: boolean;
}

function StepIndicator({ number, label, active, completed }: StepIndicatorProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
          completed
            ? 'bg-primary-600 text-white'
            : active
            ? 'bg-primary-100 text-primary-600 border-2 border-primary-600'
            : 'bg-gray-200 text-gray-600'
        }`}
      >
        {completed ? <CheckCircle className="w-5 h-5" /> : number}
      </div>
      <p
        className={`text-xs font-medium ${
          active || completed ? 'text-gray-900' : 'text-gray-600'
        }`}
      >
        {label}
      </p>
    </div>
  );
}
