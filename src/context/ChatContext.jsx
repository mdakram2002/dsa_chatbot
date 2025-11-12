import { createContext, useContext, useState, useCallback } from 'react';
import {
  getUserChats,
  createChat,
  sendMessage as sendMessageApi,
  deleteChat as deleteChatApi
} from '../services/chatService';

const ChatContext = createContext();

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadUserChats = useCallback(async (userId) => {
    if (!userId) return;

    setLoading(true);
    setError(null);
    try {
      const result = await getUserChats(userId);
      if (result.success) {
        setChats(result.chats);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to load chats');
      console.error('Load chats error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createNewChat = useCallback(async (userId, title = 'New Chat') => {
    setLoading(true);
    setError(null);
    try {
      const result = await createChat(userId, title, {
        text: "Hello! How can I help you with Data Structures & Algorithms today?",
        sender: "bot",
        timestamp: new Date()
      });

      if (result.success) {
        const newChat = result.chat;
        setChats(prev => [newChat, ...prev]);
        setActiveChat(newChat);
        return newChat;
      } else {
        setError(result.error);
        return null;
      }
    } catch (err) {
      setError('Failed to create chat');
      console.error('Create chat error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const sendMessage = useCallback(async (chatId, message) => {
    if (!message.trim()) return null;

    setLoading(true);
    setError(null);
    try {
      const result = await sendMessageApi(chatId, message);
      if (result.success) {
        // Update the chat in the local state
        setChats(prev => prev.map(chat =>
          chat._id === chatId ? result.chat : chat
        ));

        if (activeChat && activeChat._id === chatId) {
          setActiveChat(result.chat);
        }

        return result.botMessage;
      } else {
        setError(result.error);
        return null;
      }
    } catch (err) {
      setError('Failed to send message');
      console.error('Send message error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [activeChat]);

  const deleteChat = useCallback(async (chatId) => {
    try {
      const result = await deleteChatApi(chatId);
      if (result.success) {
        setChats(prev => prev.filter(chat => chat._id !== chatId));
        if (activeChat && activeChat._id === chatId) {
          setActiveChat(null);
        }
        return true;
      } else {
        setError(result.error);
        return false;
      }
    } catch (err) {
      setError('Failed to delete chat');
      console.error('Delete chat error:', err);
      return false;
    }
  }, [activeChat]);

  const selectChat = useCallback((chat) => {
    setActiveChat(chat);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value = {
    chats,
    activeChat,
    loading,
    error,
    loadUserChats,
    createNewChat,
    sendMessage,
    deleteChat,
    selectChat,
    clearError,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};