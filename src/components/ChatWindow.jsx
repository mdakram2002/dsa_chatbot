
import { useState } from "react";
import Sidebar from "./Sidebar";
import InputBox from "./InputBox";

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);

  return (
    <div className="flex h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-300">
      <Sidebar onChatChange={setMessages} />

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

        <InputBox currentMessages={messages} onMessagesUpdate={setMessages} />

        <p className="flex items-center justify-center lg:text-sm text-[10px] mx-auto mt-0 mb-0 text-gray-500">
          AI-generated, for reference only
        </p>
      </main>
    </div>
  );
}
