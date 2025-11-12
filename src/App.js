import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from "./context/AuthContext"
import { ThemeProvider } from "./context/ThemeContext"
import { ChatProvider } from "./context/ChatContext"
import AppRouter from './components/layout/AppRouter';
import ResponsiveLayout from './components/layout/ResponsiveLayout';

function App() {
  // Get client ID from environment variables
  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID 
  console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID)

  // Check if client ID is configured
  if (!googleClientId) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Configuration Required
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Google OAuth Client ID is missing. Please check your environment variables.
          </p>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-left">
            <code className="text-sm text-gray-800 dark:text-gray-200">
              REACT_APP_GOOGLE_CLIENT_ID=your_client_id_here
            </code>
          </div>
        </div>
      </div>
    );
  }

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <ThemeProvider>
        <AuthProvider>
          <ChatProvider>
            <ResponsiveLayout>
              <AppRouter />
            </ResponsiveLayout>
          </ChatProvider>
        </AuthProvider>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default App;