import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from "./context/AuthContext"
import { ThemeProvider } from "./context/ThemeContext"
import { ChatProvider } from "./context/ChatContext"
import AppRouter from './components/layout/AppRouter';
import ResponsiveLayout from './components/layout/ResponsiveLayout';

function App() {
  // Force production detection
  const isProduction = window.location.hostname !== 'localhost';
  const apiUrl = isProduction ? '/api' : 'http://localhost:5000/api';
  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  console.log('=== PRODUCTION DEBUG ===');
  console.log('Hostname:', window.location.hostname);
  console.log('Is Production:', isProduction);
  console.log('API URL:', apiUrl);
  console.log('Google Client ID exists:', !!googleClientId);

  if (!googleClientId) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
        <h1>Missing Google Client ID</h1>
        <p>Please check your Vercel environment variables</p>
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