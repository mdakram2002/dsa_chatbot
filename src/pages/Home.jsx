import { useAuth } from "../context/AuthContext"
import ThemeToggle from "../components/ThemeToggle"
import { Code2, Cpu, Zap, Users, ArrowRight } from 'lucide-react';

export default function Home() {
  const { loginWithGoogle, loginAsGuest } = useAuth();

  const features = [
    {
      icon: <Code2 className="w-6 h-6" />,
      title: "DSA Problem Solving",
      description: "Get step-by-step solutions for Data Structures & Algorithms problems"
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "AI-Powered Assistance",
      description: "Intelligent explanations with time and space complexity analysis"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Multiple Languages",
      description: "Code solutions in C++, Python, or Java based on your preference"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Interview Preparation",
      description: "Practice with real interview questions from top tech companies"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="relative z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-teal-400 rounded-xl flex items-center justify-center text-white text-xl">
                🤯
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">DSA Chatbot</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Your AI DSA Assistant</p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Master
              <span className="bg-gradient-to-r from-indigo-500 to-teal-400 bg-clip-text text-transparent"> Data Structures </span>
              & Algorithms
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              AI-powered assistant to help you solve DSA problems, prepare for interviews,
              and become a better programmer.
            </p>
          </div>

          {/* Auth Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={loginWithGoogle}
              className="group flex items-center justify-center gap-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-4 px-8 rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={loginAsGuest}
              className="group flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-500 to-teal-400 text-white font-semibold py-4 px-8 rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Start as Guest
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-300 hover:shadow-lg"
              >
                <div className="text-indigo-600 dark:text-indigo-400 mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">100+</div>
                <div className="text-gray-600 dark:text-gray-400">DSA Problems</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">3</div>
                <div className="text-gray-600 dark:text-gray-400">Languages</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">24/7</div>
                <div className="text-gray-600 dark:text-gray-400">Available</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">AI</div>
                <div className="text-gray-600 dark:text-gray-400">Powered</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p>Built with ❤️ for developers preparing for technical interviews</p>
            <p className="text-sm mt-2">AI-generated responses for reference only</p>
          </div>
        </div>
      </footer>
    </div>
  );
}