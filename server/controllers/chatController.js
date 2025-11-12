import Chat from "../models/Chat.js";
import User from "../models/User.js";
import { generateDSAResponse } from "../services/geminiService.js";

export const getChats = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: "User ID is required"
      });
    }

    const chats = await Chat.find({ userId })
      .sort({ lastMessageAt: -1 })
      .limit(50);

    res.json({
      success: true,
      chats,
      count: chats.length
    });
  } catch (error) {
    console.error("Get chats error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch chats"
    });
  }
};

export const createChat = async (req, res) => {
  try {
    const { userId } = req.params;
    const { title, initialMessage } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: "User ID is required"
      });
    }

    // Verify user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found"
      });
    }

    const newChat = new Chat({
      userId,
      title: title || "New Chat",
      messages: initialMessage ? [initialMessage] : [],
      isGuestChat: user.isGuest
    });

    await newChat.save();

    res.status(201).json({
      success: true,
      chat: newChat
    });
  } catch (error) {
    console.error("Create chat error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create chat"
    });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { message } = req.body;

    if (!message?.trim()) {
      return res.status(400).json({
        success: false,
        error: "Message is required"
      });
    }

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({
        success: false,
        error: "Chat not found"
      });
    }

    // Add user message to chat
    const userMessage = {
      text: message.trim(),
      sender: "user"
    };
    chat.messages.push(userMessage);

    // Generate AI response
    const aiResponse = await generateDSAResponse(chat.messages);

    // Add bot message to chat
    const botMessage = {
      text: aiResponse,
      sender: "bot"
    };
    chat.messages.push(botMessage);

    // Update chat title if it's the first user message
    if (chat.messages.filter(m => m.sender === "user").length === 1) {
      const words = message.trim().split(/\s+/);
      let newTitle = words.slice(0, 5).join(" ");
      if (words.length > 5) newTitle += "...";
      chat.title = newTitle.charAt(0).toUpperCase() + newTitle.slice(1);
    }

    await chat.save();

    res.json({
      success: true,
      chat: chat,
      userMessage,
      botMessage
    });
  } catch (error) {
    console.error("Send message error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to process message"
    });
  }
};

export const deleteChat = async (req, res) => {
  try {
    const { chatId } = req.params;

    const chat = await Chat.findByIdAndDelete(chatId);
    if (!chat) {
      return res.status(404).json({
        success: false,
        error: "Chat not found"
      });
    }

    res.json({
      success: true,
      message: "Chat deleted successfully"
    });
  } catch (error) {
    console.error("Delete chat error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete chat"
    });
  }
};

export const deleteAllChats = async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await Chat.deleteMany({ userId });

    res.json({
      success: true,
      message: "All chats deleted successfully",
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error("Delete all chats error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete chats"
    });
  }
};