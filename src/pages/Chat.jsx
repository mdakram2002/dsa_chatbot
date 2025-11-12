import { useState, useEffect } from 'react';
import { useAuth } from "../context/AuthContext"
import { useChat } from "../context/ChatContext"
import ResponsiveSidebar from "../components/chat/ResponsiveSidebar"
import InputBox from "../components/chat/inputBox"
import { Menu, Plus } from 'lucide-react';

export default function Chat() {
  const { dbUser } = useAuth();
  const {
    chats,
    activeChat,
    loading,
    createNewChat,
    selectChat,
    loadUserChats
  } = useChat();

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [localMessages, setLocalMessages] = useState([]);

  // Load user chats when component mounts or user changes
  useEffect(() => {
    if (dbUser?.id) {
      loadUserChats(dbUser.id);
    }
  }, [dbUser, loadUserChats]);

  // Update local messages when active chat changes
  useEffect(() => {
    if (activeChat) {
      setLocalMessages(activeChat.messages || []);
    } else {
      setLocalMessages([]);
    }
  }, [activeChat]);

  const handleNewChat = async () => {
    if (!dbUser?.id) return;

    const newChat = await createNewChat(dbUser.id);
    if (newChat) {
      selectChat(newChat);
      if (window.innerWidth < 768) {
        setIsMobileSidebarOpen(false);
      }
    }
  };

  const handleSelectChat = (chat) => {
    selectChat(chat);
    if (window.innerWidth < 768) {
      setIsMobileSidebarOpen(false);
    }
  };

  const handleMessagesUpdate = (newMessages) => {
    setLocalMessages(newMessages);
  };

  // Responsive sidebar handling
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading && !chats.length) {
    return (
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900 items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your chats...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setIsMobileSidebarOpen(true)}
        className="md:hidden fixed top-4 left-4 z-30 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 shadow-lg"
      >
        <Menu size={20} />
      </button>

      {/* Quick New Chat Button - Mobile */}
      <button
        onClick={handleNewChat}
        className="md:hidden fixed top-4 right-4 z-30 bg-gradient-to-r from-indigo-500 to-teal-400 text-white p-3 rounded-xl hover:opacity-90 transition-all duration-300 shadow-lg"
      >
        <Plus size={20} />
      </button>

      <ResponsiveSidebar
        chats={chats}
        activeChat={activeChat}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
        isMobileOpen={isMobileSidebarOpen}
        onMobileToggle={setIsMobileSidebarOpen}
        user={dbUser}
      />

      {/* Main Chat Area */}
      <main className="flex flex-col flex-1 md:ml-0 transition-all duration-300 min-w-0">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            {dbUser?.picture && (
              <img
                src={dbUser.picture}
                alt={dbUser.name}
                className="w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600"
              />
            )}
            <div>
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                {activeChat?.title || 'DSA Chatbot'}
              </h1>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {dbUser?.isGuest ? 'Guest' : dbUser?.name}
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          {localMessages.length === 0 ? (
            <div className="flex flex-col items-center justify-center flex-1 text-center px-4 py-8">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-gradient-to-br from-indigo-500 to-teal-400 flex items-center justify-center text-3xl md:text-4xl mb-6">
                🤯
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-900 dark:text-white">
                Welcome to DSA Chatbot!
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl mb-8 max-w-2xl">
                I can help you with Data Structures & Algorithms problems,
                explain concepts, and provide code solutions.
              </p>

              {/* Quick Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
                <button
                  onClick={() => handleNewChat()}
                  className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-300 text-left group"
                >
                  <div className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <Plus size={18} />
                    Start New Chat
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Begin a new conversation
                  </div>
                </button>

                <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-left">
                  <div className="font-semibold text-gray-900 dark:text-white mb-2">
                    Try asking:
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <div>"Explain binary search tree traversal"</div>
                    <div>"How to solve Two Sum problem?"</div>
                    <div>"What is dynamic programming?"</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <InputBox
              currentMessages={localMessages}
              onMessagesUpdate={handleMessagesUpdate}
              activeChat={activeChat}
            />
          )}

          {/* Footer */}
          <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <p className="text-center text-xs md:text-sm text-gray-500 dark:text-gray-400 py-3 px-4">
              AI-generated responses for reference only. Always verify solutions.
              {dbUser?.isGuest && ' Guest session - chat history will be lost when you leave.'}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}