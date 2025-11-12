import { useState, useEffect } from 'react';
import {
  FiMoreVertical,
  FiX,
  FiTrash2,
  FiMessageSquare,
  FiUser
} from 'react-icons/fi';
import { useAuth } from "../../context/AuthContext"
import { useChat } from "../../context/ChatContext"
import ThemeToggle from "../common/ThemeToggle"
import LoadingSpinner from "../common/LoadingSpinner"

export default function ResponsiveSidebar({
  chats,
  activeChat,
  onSelectChat,
  onNewChat,
  isMobileOpen,
  onMobileToggle,
  user
}) {
  const [menuOpen, setMenuOpen] = useState(null);
  const { logout } = useAuth();
  const { deleteChat, loading } = useChat();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setMenuOpen(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleDeleteChat = async (chatId, e) => {
    e.stopPropagation();
    const success = await deleteChat(chatId);
    if (success) {
      setMenuOpen(null);
    }
  };

  const handleChatClick = (chat) => {
    onSelectChat(chat);
    setMenuOpen(null);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 168) {
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  // Mobile overlay
  const mobileOverlay = isMobileOpen && (
    <div
      className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
      onClick={() => onMobileToggle(false)}
    />
  );

  return (
    <>
      {mobileOverlay}

      <aside className={`
        flex flex-col w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
        fixed md:relative top-0 left-0 h-full z-50 transform transition-transform duration-300
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-teal-400 rounded-lg flex items-center justify-center text-white text-sm">
              🤯
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                DSA Chatbot
              </h1>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Your AI Assistant
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => onMobileToggle(false)}
              className="md:hidden text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1"
            >
              <FiX size={20} />
            </button>
          </div>
        </div>

        {/* User Info */}
        {user && (
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              {user.picture ? (
                <img
                  src={user.picture}
                  alt={user.name}
                  className="w-10 h-10 rounded-full border-2 border-gray-300 dark:border-gray-600"
                />
              ) : (
                <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <FiUser className="text-gray-600 dark:text-gray-400" size={18} />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 dark:text-white truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                  <span>{user.isGuest ? 'Guest User' : 'Logged In'}</span>
                  {user.isGuest && (
                    <span className="px-1.5 py-0.5 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs rounded">
                      Guest
                    </span>
                  )}
                </p>
              </div>
              <button
                onClick={logout}
                className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Logout
              </button>
            </div>
          </div>
        )}

        {/* New Chat Button */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={onNewChat}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-teal-400 text-white font-semibold py-3 px-4 rounded-xl hover:opacity-90 disabled:opacity-50 transition-all duration-300 shadow-lg"
          >
            <FiMessageSquare size={18} />
            New Chat
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex justify-center items-center p-8">
              <LoadingSpinner size="small" />
            </div>
          ) : chats.length > 0 ? (
            <div className="p-2">
              <div className="px-2 py-3">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                  Chat History
                </h3>
              </div>
              <div className="space-y-1">
                {chats.map((chat) => (
                  <div
                    key={chat._id || chat.id}
                    onClick={() => handleChatClick(chat)}
                    className={`group relative p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                      activeChat?._id === chat._id || activeChat?.id === chat.id
                        ? 'bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700/50 border border-transparent'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 dark:text-white text-sm truncate mb-1">
                          {chat.title}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
                          <span>{formatDate(chat.lastMessageAt || chat.updatedAt || chat.timestamp)}</span>
                          <span>•</span>
                          <span>{chat.messages?.length || 0} messages</span>
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setMenuOpen(menuOpen === chat._id ? null : chat._id);
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        <FiMoreVertical size={14} />
                      </button>
                    </div>

                    {/* Dropdown Menu */}
                    {menuOpen === chat._id && (
                      <div
                        className="absolute right-2 top-10 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-10 min-w-32 py-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={(e) => handleDeleteChat(chat._id, e)}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        >
                          <FiTrash2 size={14} />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <FiMessageSquare className="text-gray-400 dark:text-gray-600 mb-3" size={32} />
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
                No chat history yet
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-xs">
                Start a new chat to begin your DSA journey
              </p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}