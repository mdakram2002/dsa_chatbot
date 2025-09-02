# 🤖 DSA Chatbot

A conversational **DSA (Data Structures & Algorithms) Chatbot** built with **React (frontend)** and **Node.js + Express (backend)**.
It allows users to chat with an AI assistant, save chat history, and get structured, formatted answers (with syntax highlighting for code).

---

## Features

- **Chat with AI** – Ask DSA-related questions and get instant answers.
- **Persistent chat history** – Chats are saved in `localStorage` and can be reloaded later.
- **Sidebar with multiple chats** – Start new chats and switch between them.
- **Beautiful UI** – Styled with **TailwindCSS** and designed to look like ChatGPT.
- **Code highlighting** – Supports code snippets using `react-syntax-highlighter`.
- **Markdown support** – Renders lists, tables, code blocks, and formatted text.
- **Express + Gemini API** – Backend integrates with Google Gemini API for responses.

---

## 🛠️ Tech Stack

### Frontend
- ⚛️ React (Functional Components + Hooks)
- 🎨 TailwindCSS (UI styling)
- 📝 React Markdown (`react-markdown`, `remark-gfm`)
- 💻 Syntax Highlighting (`react-syntax-highlighter`)

### Backend
- 🟢 Node.js + Express
- 🔑 Gemini API (via `@google/generative-ai`)
- 🌐 CORS & dotenv for environment management

---

## Project Structure

- -dsa_chatbot/
- │
- ├── client/ # React frontend
- │ ├── src/
-   │ ├──/assets
- │ │ ├── components/ # Reusable components
- │ │ │ ├── Sidebar.jsx
- │ │ │ ├── InputBox.jsx
- │ │ │ └── MessageBubble.jsx
- │ │ ├── pages/
- │ │ │ └── ChatWindow.jsx
- │ │ ├── services/
- │ │ │ └── api.jsx # Handles API requests
- │ │ └── index.js
- │ └── package.json
- │
- ├── server/ # Node backend
- │ ├── index.js # Express server
- │ ├── services/
- │ │ └── api.js # Gemini API integration
- │ └── package.json
- │
- ├── .env # API keys & environment vars
- └── README.md # Documentation


## Screenshots

### Chat UI
Like ChatGPT with code highlighting and markdown support.

![Chat Screenshot](./src/assets/chat_ui.png)

### Sidebar
Start and switch between chats easily.

![Sidebar Screenshot](./src/assets/sidebar.png)


---

## ⚙️ Setup & Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/dsa_chatbot.git
cd dsa_chatbot

2️⃣ Setup Backend
cd server
npm install


Create a .env file in server/:

PORT=5000
GEMINI_API_KEY=your_gemini_api_key_here


Run backend:

npm start


Server will run at: http://localhost:5000

3️⃣ Setup Frontend
cd client
npm install


Create a .env file in client/:

REACT_APP_BASE_URL=http://localhost:5000/chat


Run frontend:

npm start
