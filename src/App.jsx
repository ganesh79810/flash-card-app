import { useState, useEffect } from "react";
import "./App.css";

function App() {

  // LOGIN STATE
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  // FLASHCARDS
  const [flashcards, setFlashcards] = useState([
    {
      question: "What is JavaScript?",
      answer: "JavaScript is a programming language.",
    },
    {
      question: "What is React?",
      answer: "React is a JavaScript library.",
    },
    {
      question: "What is JSX?",
      answer: "JSX allows HTML inside React.",
    },
  ]);

  const [currentCard, setCurrentCard] = useState(0);

  const [showAnswer, setShowAnswer] = useState(false);

  // SAVE LOGIN
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  // LOGIN FUNCTION
  const handleLogin = () => {

    if (username.trim() === "" || password.trim() === "") {

      alert("Please enter username and password");

      return;
    }

    setIsLoggedIn(true);
  };

  // LOGOUT
  const handleLogout = () => {

    setIsLoggedIn(false);

    setUsername("");

    setPassword("");
  };

  // NEXT CARD
  const nextCard = () => {

    setShowAnswer(false);

    setCurrentCard((prev) =>
      prev === flashcards.length - 1 ? 0 : prev + 1
    );
  };

  // PREVIOUS CARD
  const prevCard = () => {

    setShowAnswer(false);

    setCurrentCard((prev) =>
      prev === 0 ? flashcards.length - 1 : prev - 1
    );
  };

  // FLIP CARD
  const flipCard = () => {

    setShowAnswer(!showAnswer);
  };

  // LOGIN PAGE
  if (!isLoggedIn) {

    return (

      <div className="login-page">

        <div className="login-box">

          <h1>Flash Card Login</h1>

          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleLogin}>
            Login
          </button>

        </div>

      </div>
    );
  }

  // MAIN APP
  return (

    <div className="app">

      <div className="top-bar">

        <h1>Flash Card App 🚀</h1>

        <button onClick={handleLogout}>
          Logout
        </button>

      </div>

      <div className="flashcard" onClick={flipCard}>

        {showAnswer
          ? flashcards[currentCard].answer
          : flashcards[currentCard].question}

      </div>

      <p>Click Card to Flip</p>

      <div className="navigation-buttons">

        <button onClick={prevCard}>
          Previous
        </button>

        <button onClick={nextCard}>
          Next
        </button>

      </div>

    </div>
  );
}

export default App;