'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import Button from '@/components/ui/button';
import { Logo } from '@/components/Logo';
import { mockAPI, type HistoryResponse, type Message } from '@/lib/mockAPI';
import Input from '@/components/ui/input';
import Label from '@/components/ui/label';

/**
 * History Page
 * View message delivery logs, analytics, and audit trail
 */
export default function HistoryPage() {
  const router = useRouter();
  const { user, isLoading, logout, isAuthenticated } = useAuth();

  const [historyData, setHistoryData] = useState<HistoryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  useEffect(() => {
    if (isAuthenticated) {
      loadHistory();
    }
  }, [isAuthenticated, currentPage]);

  const loadHistory = async () => {
    try {
      setLoading(true);
      const data = await mockAPI.getHistory(currentPage, 50);
      setHistoryData(data);
    } catch (error) {
      console.error('Failed to load history:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: Message['status']) => {
    switch (status) {
      case 'pending':
        return '⏳';
      case 'sent':
        return '✓';
      case 'delivered':
        return '✓✓';
      case 'read':
        return '👁️';
      case 'failed':
        return '✗';
    }
  };

  const getStatusColor = (status: Message['status']) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'sent':
        return 'text-blue-600 bg-blue-50';
      case 'delivered':
        return 'text-green-600 bg-green-50';
      case 'read':
        return 'text-green-700 bg-green-100';
      case 'failed':
        return 'text-red-600 bg-red-50';
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredMessages = historyData?.messages.filter((message) => {
    const matchesSearch =
      message.recipientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.recipientPhone.includes(searchQuery) ||
      message.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || message.status === statusFilter;
    return matchesSearch && matchesStatus;
  }) || [];

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
              <h1 className="text-xl font-semibold text-white">Message History</h1>
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading history...</p>
          </div>
        ) : historyData ? (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-white rounded-lg shadow p-4">
                <p className="text-sm text-gray-600 mb-1">Total Sent</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {historyData.stats.totalSent}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <p className="text-sm text-gray-600 mb-1">Delivered</p>
                <p className="text-2xl font-semibold text-green-600">
                  {historyData.stats.delivered}
                </p>
                <p className="text-xs text-gray-500">
                  {historyData.stats.deliveryRate.toFixed(1)}%
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <p className="text-sm text-gray-600 mb-1">Read</p>
                <p className="text-2xl font-semibold text-blue-600">
                  {historyData.stats.read}
                </p>
                <p className="text-xs text-gray-500">
                  {historyData.stats.readRate.toFixed(1)}%
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <p className="text-sm text-gray-600 mb-1">Failed</p>
                <p className="text-2xl font-semibold text-red-600">
                  {historyData.stats.failed}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <p className="text-sm text-gray-600 mb-1">Pending</p>
                <p className="text-2xl font-semibold text-yellow-600">
                  {historyData.stats.pending}
                </p>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="search">Search</Label>
                  <Input
                    id="search"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by phone, name, or content..."
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status Filter</Label>
                  <select
                    id="status"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-500 focus:ring-primary-500"
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="sent">Sent</option>
                    <option value="delivered">Delivered</option>
                    <option value="read">Read</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Messages Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Recipient
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Content
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sent At
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredMessages.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                          No messages found
                        </td>
                      </tr>
                    ) : (
                      filteredMessages.map((message) => (
                        <tr key={message.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {message.recipientName}
                            </div>
                            <div className="text-xs text-gray-500">
                              {message.recipientPhone}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900 max-w-md truncate">
                              {message.content}
                            </div>
                            {message.templateName && (
                              <div className="text-xs text-gray-500">
                                Template: {message.templateName}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                message.status
                              )}`}
                            >
                              <span className="mr-1">{getStatusIcon(message.status)}</span>
                              {message.status}
                            </span>
                            {message.errorMessage && (
                              <div className="text-xs text-red-600 mt-1">
                                {message.errorMessage}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(message.sentAt)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <button
                              onClick={() => setSelectedMessage(message)}
                              className="text-primary-600 hover:text-primary-800 font-medium"
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {historyData.pagination.totalPages > 1 && (
                <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200">
                  <div className="text-sm text-gray-700">
                    Showing {filteredMessages.length} of {historyData.pagination.totalCount} messages
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    <span className="px-4 py-2 text-sm text-gray-700">
                      Page {currentPage} of {historyData.pagination.totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((p) => Math.min(historyData.pagination.totalPages, p + 1))}
                      disabled={currentPage === historyData.pagination.totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-600">Failed to load message history</p>
            <Button onClick={loadHistory} className="mt-4">
              Retry
            </Button>
          </div>
        )}
      </main>

      {/* Message Details Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Message Details</h2>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Recipient</Label>
                  <p className="text-gray-900 font-medium">{selectedMessage.recipientName}</p>
                  <p className="text-sm text-gray-600">{selectedMessage.recipientPhone}</p>
                </div>

                {selectedMessage.templateName && (
                  <div>
                    <Label>Template</Label>
                    <p className="text-gray-900">{selectedMessage.templateName}</p>
                  </div>
                )}

                <div>
                  <Label>Content</Label>
                  <p className="text-gray-900 whitespace-pre-wrap">{selectedMessage.content}</p>
                </div>

                <div>
                  <Label>Status</Label>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      selectedMessage.status
                    )}`}
                  >
                    <span className="mr-1">{getStatusIcon(selectedMessage.status)}</span>
                    {selectedMessage.status}
                  </span>
                </div>

                <div>
                  <Label>Timeline</Label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center text-sm">
                      <span className="w-32 text-gray-600">Sent:</span>
                      <span className="text-gray-900">{formatDate(selectedMessage.sentAt)}</span>
                    </div>
                    {selectedMessage.deliveredAt && (
                      <div className="flex items-center text-sm">
                        <span className="w-32 text-gray-600">Delivered:</span>
                        <span className="text-gray-900">{formatDate(selectedMessage.deliveredAt)}</span>
                      </div>
                    )}
                    {selectedMessage.readAt && (
                      <div className="flex items-center text-sm">
                        <span className="w-32 text-gray-600">Read:</span>
                        <span className="text-gray-900">{formatDate(selectedMessage.readAt)}</span>
                      </div>
                    )}
                    {selectedMessage.errorMessage && (
                      <div className="flex items-start text-sm">
                        <span className="w-32 text-gray-600">Error:</span>
                        <span className="text-red-600">{selectedMessage.errorMessage}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button onClick={() => setSelectedMessage(null)}>Close</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
