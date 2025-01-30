import axios from "axios";

const API_URL = "https://flashcard-back-end-1.onrender.com";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export const registerUser = async (username, password) => {
  return api.post("/register", { username, password });
};

export const loginUser = async (username, password) => {
  return api.post("/login", { username, password });
};

export const getFlashcards = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: [
          { id: 1, question: "ア", answer: "A", fact: "ア is the Katakana character for the 'A' sound.", example: "Example: アイス (ice)" },
          { id: 2, question: "イ", answer: "I", fact: "イ is the Katakana character for the 'I' sound.", example: "Example: イチゴ (strawberry)" },
          { id: 3, question: "ウ", answer: "U", fact: "ウ is the Katakana character for the 'U' sound.", example: "Example: ウサギ (rabbit)" },
          { id: 4, question: "エ", answer: "E", fact: "エ is the Katakana character for the 'E' sound.", example: "Example: エビ (shrimp)" },
          { id: 5, question: "オ", answer: "O", fact: "オ is the Katakana character for the 'O' sound.", example: "Example: オレンジ (orange)" },
        ],
      });
    }, 1000);
  });
};

export const saveQuizHistory = async (score, totalQuestions) => {
  return api.post("/quiz-history", { score, totalQuestions });
};
