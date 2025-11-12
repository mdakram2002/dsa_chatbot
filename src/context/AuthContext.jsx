import { createContext, useContext, useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {
  googleAuth,
  createGuestUser,
  convertGuestToUser
} from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('dsa_chatbot_user');
    const savedDbUser = localStorage.getItem('dsa_chatbot_db_user');

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedDbUser) {
      setDbUser(JSON.parse(savedDbUser));
    }
    setLoading(false);
  }, []);

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });

        if (!userInfoResponse.ok) {
          throw new Error('Failed to fetch user info');
        }

        const userInfo = await userInfoResponse.json();
        const authResult = await googleAuth(tokenResponse.access_token, userInfo);

        if (authResult.success) {
          const userData = {
            ...authResult.user,
            access_token: tokenResponse.access_token,
          };
          setUser(userData);
          setDbUser(authResult.user);
          localStorage.setItem('dsa_chatbot_user', JSON.stringify(userData));
          localStorage.setItem('dsa_chatbot_db_user', JSON.stringify(authResult.user));
        }
      } catch (error) {
        console.error('Google login failed:', error);
        alert('Login failed. Please try again.');
      }
    },
    onError: (error) => {
      console.error('Google OAuth error:', error);
      alert('Google login failed. Please try again.');
    },
  });

  const loginAsGuest = async () => {
    try {
      const result = await createGuestUser();
      if (result.success) {
        setUser(result.user);
        setDbUser(result.user);
        localStorage.setItem('dsa_chatbot_user', JSON.stringify(result.user));
        localStorage.setItem('dsa_chatbot_db_user', JSON.stringify(result.user));
      }
    } catch (error) {
      console.error('Guest login failed:', error);
      alert('Guest login failed. Please try again.');
    }
  };

  const convertToRegularUser = async (accessToken, userInfo) => {
    try {
      const result = await convertGuestToUser(user.guestId, userInfo, accessToken);
      if (result.success) {
        const userData = {
          ...result.user,
          access_token: accessToken,
        };
        setUser(userData);
        setDbUser(result.user);
        localStorage.setItem('dsa_chatbot_user', JSON.stringify(userData));
        localStorage.setItem('dsa_chatbot_db_user', JSON.stringify(result.user));
      }
    } catch (error) {
      console.error('Conversion failed:', error);
    }
  };

  const logout = () => {
    if (user && !user.isGuest) {
      googleLogout();
    }
    setUser(null);
    setDbUser(null);
    localStorage.removeItem('dsa_chatbot_user');
    localStorage.removeItem('dsa_chatbot_db_user');
  };

  const value = {
    user,
    dbUser,
    loginWithGoogle,
    loginAsGuest,
    convertToRegularUser,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};