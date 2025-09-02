
import { useState, useRef, useEffect } from "react";
import { sendMessageToServer } from "../services/api";
import MessageBubble from "./ResponseMarkdown";

export default function InputBox({ currentMessages, onMessagesUpdate }) {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages]);

  // Send message logic inside component
  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { text: input, sender: "user" };
    const updatedMessages = [...currentMessages, newMessage];
    onMessagesUpdate(updatedMessages);
    setInput("");

    const reply = await sendMessageToServer(input);
    const botMessage = { text: reply, sender: "bot" };
    onMessagesUpdate([...updatedMessages, botMessage]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto space-y-4">
        {currentMessages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-xl p-2 rounded-lg ${
              msg.sender === "user"
                ? "bg-gray-800 self-end ml-auto"
                : "bg-gray-700 self-start mr-auto"
            }`}
          >
            {
              <div className="markdown">
                <MessageBubble text={msg.text} />
              </div>
            }
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-end gap-2 mt-4 p-3 rounded-2xl border border-gray-700 bg-gray-700/50 shadow-lg">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Message DSA Chatbot"
          className="flex-1 resize-none bg-transparent text-white outline-none p-2 max-h-40 overflow-auto"
          rows={1}
        />
        <button
          onClick={handleSendMessage}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-teal-400 flex items-center justify-center text-black font-bold hover:opacity-90"
        >
          ➤
        </button>
      </div>
    </>
  );
}
