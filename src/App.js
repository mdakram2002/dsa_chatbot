import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from "./context/AuthContext"
import { ThemeProvider } from "./context/ThemeContext"
import { ChatProvider } from "./context/ChatContext"
import AppRouter from './components/layout/AppRouter';
import ResponsiveLayout from './components/layout/ResponsiveLayout';

function App() {
  // Get client ID from environment variables
  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  console.log('Environment:', process.env.NODE_ENV);
  console.log('API URL:', process.env.REACT_APP_API_URL);
  console.log('Google Client ID exists:', !!googleClientId);

  // Check if we have the required Google Client ID
  if (!googleClientId) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
        <h1>🚨 Configuration Error</h1>
        <p>Google Client ID is missing!</p>
        <p>Please check your environment variables in Vercel.</p>
        <p>Current Environment: {process.env.NODE_ENV}</p>
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