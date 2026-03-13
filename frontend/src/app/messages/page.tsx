'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import Button from '@/components/ui/button';
import { Logo } from '@/components/Logo';
import { mockAPI, type Template } from '@/lib/mockAPI';
import Input from '@/components/ui/input';
import Label from '@/components/ui/label';

/**
 * Messages Page
 * Send WhatsApp messages using templates or custom content
 */
export default function MessagesPage() {
  const router = useRouter();
  const { user, isLoading, logout, isAuthenticated } = useAuth();

  const [mode, setMode] = useState<'single' | 'bulk' | 'template'>('single');
  const [messageType, setMessageType] = useState<'template' | 'custom'>('custom');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [customContent, setCustomContent] = useState('');
  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const [templateVariables, setTemplateVariables] = useState<Record<string, string>>({});
  const [templates, setTemplates] = useState<Template[]>([]);
  const [sending, setSending] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      const data = await mockAPI.getTemplates();
      setTemplates(data);
    } catch (error) {
      console.error('Failed to load templates:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!recipientPhone) {
      alert('Please enter recipient phone number');
      return;
    }

    if (messageType === 'custom' && !customContent) {
      alert('Please enter message content');
      return;
    }

    if (messageType === 'template' && !selectedTemplateId) {
      alert('Please select a template');
      return;
    }

    try {
      setSending(true);

      const response = await mockAPI.sendMessage({
        mode,
        recipients: [
          {
            name: recipientName || recipientPhone,
            phone: recipientPhone,
            variables: messageType === 'template' ? templateVariables : undefined
          }
        ],
        messageType,
        templateId: messageType === 'template' ? selectedTemplateId : undefined,
        customContent: messageType === 'custom' ? customContent : undefined
      });

      alert(`Message sent successfully! Message ID: ${response.messageId}`);

      // Reset form
      setRecipientPhone('');
      setRecipientName('');
      setCustomContent('');
      setSelectedTemplateId('');
      setTemplateVariables({});
    } catch (error) {
      console.error('Failed to send message:', error);
      alert('Failed to send message');
    } finally {
      setSending(false);
    }
  };

  const selectedTemplate = templates.find(t => t.id === selectedTemplateId);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary-500 to-primary-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Logo
                width={123}
                height={32}
                className="h-8 w-auto"
                linkTo="/dashboard"
              />
              <h1 className="text-xl font-semibold text-white">Send Messages</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-white">{user.username}</p>
                <p className="text-xs text-primary-100">Administrador</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => logout()}
                className="bg-white hover:bg-gray-50 text-primary-600 border-white"
              >
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          {/* Mode Toggle */}
          <div className="mb-6">
            <Label>Send Mode</Label>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => setMode('single')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  mode === 'single'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Single Message
              </button>
              <button
                onClick={() => setMode('bulk')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  mode === 'bulk'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                disabled
                title="Bulk mode coming soon"
              >
                Bulk Upload
              </button>
              <button
                onClick={() => setMode('template')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  mode === 'template'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                disabled
                title="Advanced template mode coming soon"
              >
                Template
              </button>
            </div>
          </div>

          {/* Recipient Info */}
          <div className="space-y-4 mb-6">
            <div>
              <Label htmlFor="recipientName">Recipient Name (Optional)</Label>
              <Input
                id="recipientName"
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="John Doe"
              />
            </div>

            <div>
              <Label htmlFor="recipientPhone" required>
                Recipient Phone Number
              </Label>
              <Input
                id="recipientPhone"
                type="tel"
                value={recipientPhone}
                onChange={(e) => setRecipientPhone(e.target.value)}
                placeholder="+55 11 99999-9999"
                required
              />
              <p className="mt-1 text-xs text-gray-500">Format: +55 11 9999-9999</p>
            </div>
          </div>

          {/* Message Type */}
          <div className="mb-6">
            <Label>Message Type</Label>
            <div className="mt-2 flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="messageType"
                  value="custom"
                  checked={messageType === 'custom'}
                  onChange={(e) => setMessageType('custom')}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">Custom Message</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="messageType"
                  value="template"
                  checked={messageType === 'template'}
                  onChange={(e) => setMessageType('template')}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">Use Template</span>
              </label>
            </div>
          </div>

          {/* Template Selection */}
          {messageType === 'template' && (
            <div className="mb-6">
              <Label htmlFor="template" required>
                Select Template
              </Label>
              <select
                id="template"
                value={selectedTemplateId}
                onChange={(e) => {
                  setSelectedTemplateId(e.target.value);
                  setTemplateVariables({});
                }}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-500 focus:ring-primary-500"
              >
                <option value="">Choose a template...</option>
                {templates.map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.name} ({template.category})
                  </option>
                ))}
              </select>

              {/* Template Variables */}
              {selectedTemplate && selectedTemplate.variables.length > 0 && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Template Variables</h4>
                  <div className="space-y-3">
                    {selectedTemplate.variables.map((variable) => (
                      <div key={variable.name}>
                        <Label htmlFor={`var-${variable.name}`} required={variable.required}>
                          {variable.name}
                        </Label>
                        <Input
                          id={`var-${variable.name}`}
                          type={variable.type === 'number' ? 'number' : variable.type === 'date' ? 'date' : 'text'}
                          value={templateVariables[variable.name] || ''}
                          onChange={(e) =>
                            setTemplateVariables((prev) => ({
                              ...prev,
                              [variable.name]: e.target.value
                            }))
                          }
                          placeholder={variable.placeholder}
                          required={variable.required}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Template Preview */}
              {selectedTemplate && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Template Content</h4>
                  <p className="text-sm text-blue-800 whitespace-pre-wrap">
                    {selectedTemplate.content}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Custom Message Content */}
          {messageType === 'custom' && (
            <div className="mb-6">
              <Label htmlFor="content" required>
                Message Content
              </Label>
              <textarea
                id="content"
                value={customContent}
                onChange={(e) => setCustomContent(e.target.value)}
                rows={6}
                maxLength={1024}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-500 focus:ring-primary-500"
                placeholder="Enter your message here..."
                required
              />
              <p className="mt-1 text-xs text-gray-500 text-right">
                {customContent.length}/1024 characters
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={() => router.push('/dashboard')}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSendMessage}
              disabled={sending}
              className="min-w-[120px]"
            >
              {sending ? 'Sending...' : 'Send Now'}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
