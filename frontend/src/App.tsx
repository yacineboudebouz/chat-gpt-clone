import "./App.css";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import { Home, Login, Signup, Chat, NotFound } from "./pages";
import { useAuth } from "./context/AuthContext";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000/api/v1";
axios.defaults.withCredentials = true;

function App() {
  console.log(useAuth()?.isLoggedIn);
  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;
