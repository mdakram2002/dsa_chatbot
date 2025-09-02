
import { useState, useEffect } from "react";
import { LuPanelLeftClose } from "react-icons/lu";

export default function Sidebar({ onChatChange }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [chats, setChats] = useState(() => {
    return JSON.parse(localStorage.getItem("chatHistory")) || [];
  });
  const [activeChatId, setActiveChatId] = useState(null);

  // Save chat history
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(chats));
  }, [chats]);

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
    setActiveChatId(newChat.id);
    onChatChange(newChat.messages);
  };

  // Select existing chat
  const handleSelectChat = (chatId) => {
    const chat = chats.find((c) => c.id === chatId);
    if (chat) {
      setActiveChatId(chatId);
      onChatChange(chat.messages);
    }
  };

  return (
    <>
      {sidebarOpen ? (
        <aside className="flex flex-col w-72 bg-gray-800/50 p-4 rounded-lg shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between gap-2 mb-4">
            <div>
              <h1 className="text-lg font-semibold">DSA Chatbot</h1>
              <p className="text-xs text-gray-400">Your DSA AI assistant</p>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-2xl text-gray-400 hover:text-white transition"
            >
              <LuPanelLeftClose />
            </button>
          </div>

          <button
            onClick={handleNewChat}
            className="bg-gradient-to-r from-indigo-500 to-green-400 text-black font-semibold py-2 rounded-lg shadow hover:opacity-90 mb-4"
          >
            + New chat
          </button>

          <div className="space-y-2 overflow-y-auto">
            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => handleSelectChat(chat.id)}
                className={`p-2 rounded-lg cursor-pointer transition ${
                  activeChatId === chat.id
                    ? "bg-gray-700"
                    : "hover:bg-gray-700/50"
                }`}
              >
                <div className="font-semibold text-sm">{chat.title}</div>
                <div className="text-xs text-gray-400">{chat.timestamp}</div>
              </div>
            ))}
          </div>
        </aside>
      ) : (
        <button
          onClick={() => setSidebarOpen(true)}
          className="absolute top-4 left-4 bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-600 transition"
        >
          ☰
        </button>
      )}
    </>
  );
}
