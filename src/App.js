/** @format */

import { Route, Routes } from "react-router-dom";
import "./App.css";
import ChatWindow from "./components/ChatWindow";

function App() {
  return (
    <div
      className="min-h-screen text-gray-900 dark:text-gray-100 bg-gradient-to-b from-indigo-200 via-green-100 to-white
  dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 bg-[length:200%_200%] animate-gradientMove"
    >
      <Routes>
        <Route path="/" element={<ChatWindow />} />
      </Routes>
    </div>
  );
}

export default App;
