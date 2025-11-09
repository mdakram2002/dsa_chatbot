import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import InputBox from "./InputBox";

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [chats, setChats] = useState(() => {
    return JSON.parse(localStorage.getItem("chatHistory")) || [];
  });

  // Update chats in localStorage whenever chats change
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(chats));
  }, [chats]);

  const handleChatChange = (newMessages, chatId) => {
    setMessages(newMessages);
    setActiveChatId(chatId);
  };

  const updateChatTitle = (chatId, userMessage) => {
    if (!userMessage.trim() || !chatId) return;

    // Extract first few words for title (max 5 words)
    const words = userMessage.trim().split(/\s+/);
    let newTitle = words.slice(0, 5).join(" ");

    // Add ellipsis if message was truncated
    if (words.length > 5) {
      newTitle += "...";
    }

    // Capitalize first letter
    newTitle = newTitle.charAt(0).toUpperCase() + newTitle.slice(1);

    setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === chatId && chat.title === "New Chat"
          ? { ...chat, title: newTitle }
          : chat
      )
    );
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white transition-colors duration-300">
      <Sidebar
        onChatChange={handleChatChange}
        activeChatId={activeChatId}
        chats={chats}
        setChats={setChats}
        onChatTitleUpdate={updateChatTitle}
      />

      <main className="flex flex-col flex-1 p-6 transition-all duration-300">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center flex-1">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-teal-400 flex items-center justify-center text-3xl">
              🤯
            </div>
            <h2 className="mt-4 text-2xl font-semibold">
              Hi, I'm DSA Chatbot.
            </h2>
            <p className="text-gray-400">How can I help you today?</p>
          </div>
        )}

        <InputBox
          currentMessages={messages}
          onMessagesUpdate={(newMessages) => {
            setMessages(newMessages);

            // Update chat title when user sends first message
            if (activeChatId && newMessages.length > 0) {
              const userMessages = newMessages.filter(msg => msg.sender === "user");
              if (userMessages.length === 1) {
                const firstUserMessage = userMessages[0].text;
                updateChatTitle(activeChatId, firstUserMessage);
              }
            }
          }}
          activeChatId={activeChatId}
        />

        <p className="flex items-center justify-center lg:text-sm text-[10px] mx-auto mt-0 mb-0 text-gray-500">
          AI-generated, for reference only
        </p>
      </main>
    </div>
  );
}