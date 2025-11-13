import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from "./context/AuthContext"
import { ThemeProvider } from "./context/ThemeContext"
import { ChatProvider } from "./context/ChatContext"
import AppRouter from './components/layout/AppRouter';
import ResponsiveLayout from './components/layout/ResponsiveLayout';

function App() {
  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
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