const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const getUserChats = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/chat/user/${userId}`);
  return response.json();
};

export const createChat = async (userId, title = 'New Chat', initialMessage = null) => {
  const response = await fetch(`${API_BASE_URL}/chat/user/${userId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, initialMessage }),
  });
  return response.json();
};

export const sendMessage = async (chatId, message) => {
  const response = await fetch(`${API_BASE_URL}/chat/${chatId}/message`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });
  return response.json();
};

export const updateChat = async (chatId, updates) => {
  const response = await fetch(`${API_BASE_URL}/chat/${chatId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  return response.json();
};

export const deleteChat = async (chatId) => {
  const response = await fetch(`${API_BASE_URL}/chat/${chatId}`, {
    method: 'DELETE',
  });
  return response.json();
};

export const deleteAllChats = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/chat/user/${userId}/all`, {
    method: 'DELETE',
  });
  return response.json();
};