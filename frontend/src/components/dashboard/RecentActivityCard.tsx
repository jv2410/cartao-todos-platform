import type { Message } from '@/lib/mockAPI';

interface RecentActivityCardProps {
  messages: Message[];
  onViewAll: () => void;
}

export default function RecentActivityCard({ messages, onViewAll }: RecentActivityCardProps) {
  const getStatusIcon = (status: Message['status']) => {
    switch (status) {
      case 'pending':
        return <span className="text-yellow-500" title="Pending">⏳</span>;
      case 'sent':
        return <span className="text-blue-500" title="Sent">✓</span>;
      case 'delivered':
        return <span className="text-green-500" title="Delivered">✓✓</span>;
      case 'read':
        return <span className="text-green-600" title="Read">✓✓</span>;
      case 'failed':
        return <span className="text-red-500" title="Failed">✗</span>;
    }
  };

  const getStatusLabel = (status: Message['status']) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'sent':
        return 'Sent';
      case 'delivered':
        return 'Delivered';
      case 'read':
        return 'Read';
      case 'failed':
        return 'Failed';
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <button
          onClick={onViewAll}
          className="text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          View All
        </button>
      </div>
      <div className="divide-y divide-gray-100">
        {messages.length === 0 ? (
          <div className="px-6 py-8 text-center text-gray-500">
            No messages sent yet
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className="px-6 py-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-gray-900 truncate">
                      {message.recipientName}
                    </p>
                    <span className="text-sm text-gray-500">
                      ({message.recipientPhone})
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate mb-1">
                    {message.content}
                  </p>
                  {message.templateName && (
                    <p className="text-xs text-gray-500">
                      Template: {message.templateName}
                    </p>
                  )}
                </div>
                <div className="ml-4 flex flex-col items-end">
                  <div className="flex items-center gap-1 mb-1">
                    {getStatusIcon(message.status)}
                    <span className={`text-xs font-medium ${
                      message.status === 'failed' ? 'text-red-600' :
                      message.status === 'read' ? 'text-green-600' :
                      message.status === 'delivered' ? 'text-green-500' :
                      'text-gray-600'
                    }`}>
                      {getStatusLabel(message.status)}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {formatTime(message.sentAt)}
                  </span>
                  {message.errorMessage && (
                    <span className="text-xs text-red-600 mt-1">
                      {message.errorMessage}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
