import { useState, useRef, useEffect } from "react";
import { sendMessageToServer } from "../services/api";
import MessageBubble from "./ResponseMarkdown";

export default function InputBox({ currentMessages, onMessagesUpdate }) {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { text: input, sender: "user" };
    const updatedMessages = [...currentMessages, newMessage];
    onMessagesUpdate(updatedMessages);
    setInput("");

    try {
      const reply = await sendMessageToServer(input);
      const botMessage = { text: reply, sender: "bot" };
      onMessagesUpdate([...updatedMessages, botMessage]);
    } catch (error) {
      const errorMessage = { text: "Error connecting to server.", sender: "bot" };
      onMessagesUpdate([...updatedMessages, errorMessage]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Message area */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4">
        {currentMessages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-xl p-4 rounded-2xl shadow-sm transition-all duration-300 ${
              msg.sender === "user"
                ? "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white self-end ml-auto" // Same as bot
                : "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white self-start mr-auto" // Same as user
            }`}
          >
            <MessageBubble text={msg.text} />
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="flex items-end gap-2 mt-4 p-3 rounded-2xl border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700/50 shadow-lg transition-colors duration-300">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Message DSA Chatbot"
          className="flex-1 resize-none bg-transparent text-gray-900 dark:text-white outline-none p-2 max-h-40 overflow-auto placeholder-gray-500 dark:placeholder-gray-400"
          rows={1}
        />
        <button
          onClick={handleSendMessage}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-teal-400 flex items-center justify-center text-white font-bold hover:opacity-90"
        >
          ➤
        </button>
      </div>
    </>
  );
}