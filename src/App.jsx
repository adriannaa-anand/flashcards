import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Flashcard from "./components/Flashcard";
import Quiz from "./components/Quiz";
import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
  const [userToken, setUserToken] = useState(null);
  const list = [
    { id: 1, question: "ア", answer: "A", fact: "ア is the Katakana character for the 'A' sound.", example: "Example: アイス (ice)" },
    { id: 2, question: "イ", answer: "I", fact: "イ is the Katakana character for the 'I' sound.", example: "Example: イチゴ (strawberry)" },
    { id: 3, question: "ウ", answer: "U", fact: "ウ is the Katakana character for the 'U' sound.", example: "Example: ウサギ (rabbit)" },
    { id: 4, question: "エ", answer: "E", fact: "エ is the Katakana character for the 'E' sound.", example: "Example: エビ (shrimp)" },
    { id: 5, question: "オ", answer: "O", fact: "オ is the Katakana character for the 'O' sound.", example: "Example: オレンジ (orange)" },
  ];

  return (
    <Router>
      <div className="App">
        <Navbar userToken={userToken} />
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/flashcards" />} />
            <Route path="/flashcards" element={userToken ? <Flashcard list={list} /> : <Navigate to="/login" />} />
            <Route path="/quiz" element={userToken ? <Quiz /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login setUserToken={setUserToken} />} />
            <Route path="/register" element={<Register setUserToken={setUserToken} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
