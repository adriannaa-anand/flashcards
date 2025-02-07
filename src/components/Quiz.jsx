import React, { useState, useEffect } from "react";
import { getFlashcards, saveQuizHistory } from "../api";

const Quiz = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getFlashcards()
      .then((response) => {
        const shuffledFlashcards = response.data.sort(() => 0.5 - Math.random());
        setFlashcards(shuffledFlashcards.slice(0, 10));
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    if (currentQuestionIndex < flashcards.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
      saveQuizHistory(score, flashcards.length);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (quizCompleted) {
    return <div>Quiz completed! Your score: {score}</div>;
  }

  const currentQuestion = flashcards[currentQuestionIndex];

  return (
    <div>
      <h2>Quiz</h2>
      <div>
        <p>{currentQuestion.question}</p>
        <button onClick={() => handleAnswer(true)}>Correct</button>
        <button onClick={() => handleAnswer(false)}>Incorrect</button>
      </div>
      <div>Time left: {timeLeft} seconds</div>
    </div>
  );
};

export default Quiz;
