import { Bot, User, AlertCircle, Paperclip, Image, FileText } from 'lucide-react';

export default function MessageBubble({ message, isLatest }) {
  const isUser = message.sender === 'user';
  const isError = message.isError;
  const hasFile = message.hasFile;

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getFileIcon = () => {
    if (message.fileName) {
      if (message.fileName.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
        return <Image className="w-4 h-4" />;
      }
      return <FileText className="w-4 h-4" />;
    }
    return <Paperclip className="w-4 h-4" />;
  };

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} ${isLatest ? 'animate-fade-in' : ''}`}>
      {/* Avatar */}
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isUser
          ? 'bg-gradient-to-br from-blue-500 to-blue-600'
          : isError
          ? 'bg-red-500'
          : 'bg-gradient-to-br from-indigo-500 to-teal-400'
      }`}>
        {isUser ? (
          <User className="w-4 h-4 text-white" />
        ) : isError ? (
          <AlertCircle className="w-4 h-4 text-white" />
        ) : (
          <Bot className="w-4 h-4 text-white" />
        )}
      </div>

      {/* Message Content */}
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[85%] md:max-w-[75%]`}>
        <div className={`rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-blue-500 text-white rounded-br-none'
            : isError
            ? 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200 rounded-bl-none border border-red-200 dark:border-red-800'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-none'
        }`}>
          {/* File Indicator */}
          {hasFile && (
            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-200 dark:border-gray-600">
              {getFileIcon()}
              <span className="text-sm font-medium">
                {message.fileName || 'File'}
              </span>
            </div>
          )}

          <div className="whitespace-pre-wrap break-words leading-relaxed">
            {message.text}
          </div>
        </div>

        {/* Timestamp */}
        {message.timestamp && (
          <div className="mt-1">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formatTime(message.timestamp)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}