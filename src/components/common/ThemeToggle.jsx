import { useTheme } from "../../context/ThemeContext"
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const {toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-xl border transition-all duration-300 transform hover:scale-105 ${
        isDark
          ? 'border-gray-600 bg-gray-800 hover:bg-gray-700 text-yellow-400 shadow-inner'
          : 'border-gray-300 bg-white hover:bg-gray-50 text-gray-700 shadow-md'
      }`}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  );
}