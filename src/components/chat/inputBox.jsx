import { useState, useRef, useEffect } from 'react';
import { useChat } from "../../context/ChatContext"
import MessageBubble from "./MessageBubble";
import VoiceInput from "../common/VoiceInput";
import FileUpload from "../common/FileUpload";
import { Send, Loader, Paperclip, X } from 'lucide-react';

export default function InputBox({ currentMessages, onMessagesUpdate, activeChat }) {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const messagesEndRef = useRef(null);
  const { sendMessage } = useChat();

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end'
    });
  }, [currentMessages]);

  const handleSendMessage = async () => {
    const message = input.trim();
    if (!message || !activeChat || isLoading) return;

    const userMessage = {
      text: message,
      sender: 'user',
      timestamp: new Date()
    };

    const updatedMessages = [...currentMessages, userMessage];
    onMessagesUpdate(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      await sendMessage(activeChat._id || activeChat.id, message);
    } catch (error) {
      console.error('Failed to send message:', error);
      const errorMessage = {
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: new Date(),
        isError: true
      };
      onMessagesUpdate([...updatedMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileAnalyze = async (file) => {
    if (!activeChat || isLoading) return;

    setIsLoading(true);

    try {
      // Create a message about the file upload
      const fileMessage = {
        text: `📎 Uploaded file: ${file.name} (${file.type}) - Analyzing for DSA content...`,
        sender: 'user',
        timestamp: new Date(),
        hasFile: true,
        fileName: file.name
      };

      const updatedMessages = [...currentMessages, fileMessage];
      onMessagesUpdate(updatedMessages);

      // Simulate file analysis (replace with actual API call)
      const analysisResult = await analyzeFileForDSA(file);

      const botResponse = {
        text: analysisResult,
        sender: 'bot',
        timestamp: new Date()
      };

      onMessagesUpdate([...updatedMessages, botResponse]);
      setShowFileUpload(false);

    } catch (error) {
      console.error('File analysis failed:', error);
      const errorMessage = {
        text: 'Sorry, I could not analyze the file. Please try again.',
        sender: 'bot',
        timestamp: new Date(),
        isError: true
      };
      onMessagesUpdate([...currentMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Mock file analysis function (replace with actual AI service)
  const analyzeFileForDSA = async (file) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (file.type.startsWith('image/')) {
          resolve(`I've analyzed your image "${file.name}". This appears to be a DSA-related diagram. I can help you understand:\n\n• Data structure visualization\n• Algorithm flowcharts\n• Code complexity graphs\n• Problem-solving diagrams\n\nCould you tell me more about what specific DSA concept this image represents?`);
        } else if (file.type === 'text/plain') {
          resolve(`I've analyzed your text file "${file.name}". This contains code/data that could be related to:\n\n• Algorithm implementations\n• Data structure definitions\n• Problem statements\n• Complexity analysis\n\nI'm ready to help explain or optimize this DSA content!`);
        } else {
          resolve(`I've received your file "${file.name}". I can help analyze:\n\n• DSA problem statements\n• Algorithm explanations\n• Code implementations\n• Complexity analysis\n\nWhat specific aspect would you like me to focus on?`);
        }
      }, 2000);
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleVoiceText = (text) => {
    setInput(prev => prev + (prev ? ' ' + text : text));
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto w-full p-4 space-y-6">
          {currentMessages.map((msg, index) => (
            <MessageBubble
              key={index}
              message={msg}
              isLatest={index === currentMessages.length - 1}
            />
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-3xl bg-gray-100 dark:bg-gray-800 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                  <Loader className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Analyzing...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* File Upload Modal */}
      {showFileUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Upload DSA File
              </h3>
              <button
                onClick={() => setShowFileUpload(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <FileUpload
              onFileAnalyze={handleFileAnalyze}
              disabled={isLoading}
            />
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
        <div className="max-w-4xl mx-auto">
          {/* File Upload Toggle */}
          <div className="flex items-center gap-2 mb-3">
            <button
              onClick={() => setShowFileUpload(true)}
              disabled={isLoading || !activeChat}
              className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors disabled:opacity-50"
            >
              <Paperclip className="w-4 h-4" />
              <span>Attach DSA files</span>
            </button>
          </div>

          <div className="flex items-end gap-3">
            {/* Voice Input */}
            <div className="flex-shrink-0">
              <VoiceInput
                onTextConverted={handleVoiceText}
                disabled={isLoading || !activeChat}
              />
            </div>

            {/* Text Input */}
            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={activeChat ? "Ask about Data Structures & Algorithms or upload files..." : "Create a new chat to start messaging..."}
                className="w-full resize-none bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-2xl px-4 py-3 pr-12 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 min-h-[56px] max-h-32"
                rows={1}
                disabled={isLoading || !activeChat}
              />

              {input.length > 0 && (
                <div className="absolute bottom-2 right-12">
                  <span className={`text-xs ${
                    input.length > 1000 ? 'text-red-500' : 'text-gray-400'
                  }`}>
                    {input.length}/1000
                  </span>
                </div>
              )}
            </div>

            {/* Send Button */}
            <button
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading || !activeChat}
              className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-indigo-500 to-teal-400 text-white rounded-xl flex items-center justify-center hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
            >
              {isLoading ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Helper Text */}
          <div className="mt-2 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Press Enter to send, Shift+Enter for new line. Upload images of diagrams, code, or DSA problems!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}