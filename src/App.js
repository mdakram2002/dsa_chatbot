import { Route, Routes } from "react-router-dom";
import "./App.css";
import ChatWindow from "./components/ChatWindow";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ChatWindow />} />
      </Routes>
    </>
  );
}

export default App;