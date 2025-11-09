import { useState, useEffect } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { LuPanelLeftClose } from "react-icons/lu";
import ThemeToggle from "./ThemeToggle";

export default function Sidebar({ onChatChange, activeChatId, chats, setChats }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [menuOpen, setMenuOpen] = useState(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setMenuOpen(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Start a new chat
  const handleNewChat = () => {
    const timestamp = new Date().toLocaleString();
    const newChat = {
      id: Date.now(),
      title: "New Chat",
      timestamp,
      messages: [{ text: "Hello! How can I help you?", sender: "bot" }],
    };

    setChats((prev) => [newChat, ...prev]);
    onChatChange(newChat.messages, newChat.id);
    setMenuOpen(null);
  };

  // Select an existing chat
  const handleSelectChat = (chatId) => {
    const chat = chats.find((c) => c.id === chatId);
    if (chat) {
      onChatChange(chat.messages, chat.id);
    }
    setMenuOpen(null);
  };

  // Delete a single chat
  const handleDeleteChat = (chatId, e) => {
    e.stopPropagation();
    const updatedChats = chats.filter(chat => chat.id !== chatId);
    setChats(updatedChats);
    setMenuOpen(null);
  };

  // Delete all chats
  const handleDeleteAllChats = (e) => {
    e.stopPropagation();
    setChats([]);
    onChatChange([], null);
    setMenuOpen(null);
  };

  // Toggle menu for a specific chat
  const toggleMenu = (chatId, e) => {
    e.stopPropagation();
    setMenuOpen(menuOpen === chatId ? null : chatId);
  };

  return (
    <>
      {sidebarOpen ? (
        <aside className="flex flex-col w-72 bg-gray-100 dark:bg-gray-800/50 text-gray-900 dark:text-white p-4 rounded-lg shadow-lg transition-all duration-300">
          {/* Header Section with App Title + Theme Toggle */}
          <div className="flex items-center justify-between gap-2 mb-4">
            <div>
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                DSA Chatbot
              </h1>
              <p className="text-xs text-gray-600 dark:text-gray-400 transition-colors duration-300">
                Your DSA AI Assistant
              </p>
            </div>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-2xl text-gray-400 hover:text-white transition"
                title="Close Sidebar"
              >
                <LuPanelLeftClose />
              </button>
            </div>
          </div>

          {/* New Chat Button */}
          <button
            onClick={handleNewChat}
            className="bg-gradient-to-r from-indigo-500 to-green-400 text-gray-900 dark:text-gray-900 font-semibold py-2 rounded-lg shadow hover:opacity-90 dark:from-indigo-400 dark:to-green-300 transition-colors duration-300 mb-4"
          >
            + New chat
          </button>

          {/* Chat History */}
          <div className="space-y-2 overflow-y-auto flex-1">
            {chats.length > 0 && (
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  Chat History
                </span>
                <button
                  onClick={handleDeleteAllChats}
                  className="text-xs text-gray-400 hover:text-red-700 dark:text-gray-400 dark:hover:text-red-300 transition-colors"
                  title="Delete all chats"
                >
                  Clear All
                </button>
              </div>
            )}

            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => handleSelectChat(chat.id)}
                className={`group relative p-2 rounded-lg cursor-pointer transition ${
                  activeChatId === chat.id
                    ? "bg-gray-700"
                    : "hover:bg-gray-700/50"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-gray-900 dark:text-white transition-colors duration-300 truncate">
                      {chat.title}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 transition-colors duration-300">
                      {chat.timestamp}
                    </div>
                  </div>

                  {/* Three-dot menu button */}
                  <button
                    onClick={(e) => toggleMenu(chat.id, e)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 rounded hover:bg-gray-600/30 ml-2"
                    title="Chat options"
                  >
                    <FiMoreVertical size={16} />
                  </button>
                </div>

                {/* Dropdown menu */}
                {menuOpen === chat.id && (
                  <div
                    className="absolute right-2 top-8 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-10 min-w-32"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={(e) => handleDeleteChat(chat.id, e)}
                      className="w-full text-left px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors rounded-lg"
                    >
                      Delete Chat
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>
      ) : (
        <button
          onClick={() => setSidebarOpen(true)}
          className="absolute top-4 left-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 shadow-lg"
        >
          ☰
        </button>
      )}
    </>
  );
}