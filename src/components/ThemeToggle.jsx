import { useTheme } from "../context/ThemeContext";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full border transition-all duration-300
        ${theme === "dark"
          ? "border-gray-600 bg-gray-800 hover:bg-gray-700 shadow-inner"
          : "border-gray-200 bg-white hover:bg-gray-50 shadow-md"}`}
      title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {theme === "dark" ? (
        <Sun className="text-yellow-400" size={20} />
      ) : (
        <Moon className="text-gray-700" size={20} />
      )}
    </button>
  );
};

export default ThemeToggle;
