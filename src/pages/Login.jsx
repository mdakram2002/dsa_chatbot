
import { useAuth } from "../context/AuthContext"
import ThemeToggle from "../components/ThemeToggle"
import { Code2, Cpu, Zap, Users, ArrowRight, MessageSquare, Clock, Shield } from 'lucide-react';

export default function Login() {
  const { loginWithGoogle, loginAsGuest } = useAuth();

  const features = [
    {
      icon: <Code2 className="w-5 h-5" />,
      text: "AI-powered DSA problem solving"
    },
    {
      icon: <Cpu className="w-5 h-5" />,
      text: "Step-by-step solutions with complexity analysis"
    },
    {
      icon: <Zap className="w-5 h-5" />,
      text: "Multiple programming languages (C++, Python, Java)"
    },
    {
      icon: <Users className="w-5 h-5" />,
      text: "Interview preparation with real questions"
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      text: "Voice input support"
    },
    {
      icon: <Clock className="w-5 h-5" />,
      text: "Chat history synchronization"
    },
    {
      icon: <Shield className="w-5 h-5" />,
      text: "Secure authentication"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 transition-colors duration-300">
      <div className="max-w-md w-full">
        {/* Theme Toggle */}
        <div className="flex justify-end mb-6">
          <ThemeToggle />
        </div>

        {/* Login Card */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 transition-all duration-300 border border-white/20 dark:border-gray-700/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-teal-400 rounded-2xl flex items-center justify-center text-3xl text-white mx-auto mb-4 shadow-lg">
              🤯
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              DSA Chatbot
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Your AI Assistant for Data Structures & Algorithms
            </p>
          </div>

          {/* Auth Buttons */}
          <div className="space-y-4 mb-8">
            <button
              onClick={loginWithGoogle}
              className="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-4 px-6 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-lg transition-all duration-300 group"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Continue with Google</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-white dark:bg-gray-800 text-sm text-gray-500 dark:text-gray-400 font-medium">
                  OR
                </span>
              </div>
            </div>

            <button
              onClick={loginAsGuest}
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-500 to-teal-400 text-white font-semibold py-4 px-6 rounded-xl hover:opacity-90 hover:shadow-xl transform hover:scale-105 transition-all duration-300 group shadow-lg"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Continue as Guest</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Features List */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 text-center uppercase tracking-wide">
              Everything You Need to Master DSA
            </h3>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 group">
                  <span className="text-green-500 group-hover:scale-110 transition-transform duration-200">
                    {feature.icon}
                  </span>
                  <span className="group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer Note */}
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-center text-gray-500 dark:text-gray-400">
              <strong>Guest users:</strong> Chat history is saved temporarily.
              <br />
              <strong>Logged-in users:</strong> Full chat history synchronization across devices.
            </p>
          </div>
        </div>

        {/* Stats Footer */}
        <div className="mt-6 text-center">
          <div className="grid grid-cols-3 gap-4 text-xs text-gray-500 dark:text-gray-400">
            <div>
              <div className="font-semibold text-gray-700 dark:text-gray-300">100+</div>
              <div>DSA Problems</div>
            </div>
            <div>
              <div className="font-semibold text-gray-700 dark:text-gray-300">3</div>
              <div>Languages</div>
            </div>
            <div>
              <div className="font-semibold text-gray-700 dark:text-gray-300">24/7</div>
              <div>Available</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}