import React, { useState, useEffect } from "react";
import { getFlashcards, saveQuizHistory } from "../api";

const Quiz = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); 

  useEffect(() => {
    getFlashcards().then((response) => {
      setFlashcards(response.data);
    });

    const timer = timeLeft > 0 && setInterval(() => setTimeLeft(timeLeft - 1), 1000);
    if (timeLeft === 0) {
      handleSubmitQuiz();
    }
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswer = (answer) => {
    if (answer === flashcards[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleSubmitQuiz = async () => {
    try {
      await saveQuizHistory(score, flashcards.length);
      alert("Quiz history saved successfully!");
    } catch (error) {
      console.error("Error saving quiz history:", error);
    }
  };

  if (currentQuestionIndex >= flashcards.length) {
    return (
      <div>
        <h2>Quiz Completed</h2>
        <p>Your score: {score}/{flashcards.length}</p>
        <button onClick={handleSubmitQuiz}>Save Quiz History</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Quiz</h2>
      <p>Time Left: {timeLeft}s</p>
      <div>
        <p>{flashcards[currentQuestionIndex].question}</p>
        <button onClick={() => handleAnswer("A")}>A</button>
        <button onClick={() => handleAnswer("I")}>I</button>
        <button onClick={() => handleAnswer("U")}>U</button>
        <button onClick={() => handleAnswer("E")}>E</button>
        <button onClick={() => handleAnswer("O")}>O</button>
      </div>
    </div>
  );
};

export default Quiz;
