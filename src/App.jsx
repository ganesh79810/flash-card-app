import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [flashcards, setFlashcards] = useState(() => {
    const savedCards = localStorage.getItem("flashcards");

    return savedCards
      ? JSON.parse(savedCards)
      : [
          {
            question: "What is JavaScript?",
            answer: "JavaScript is a programming language.",
          },
          {
            question: "What is React?",
            answer: "React is a JavaScript library for building UI.",
          },
          {
            question: "What is JSX?",
            answer: "JSX lets you write HTML inside React.",
          },
        ];
  });

  const [currentCard, setCurrentCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    localStorage.setItem("flashcards", JSON.stringify(flashcards));
  }, [flashcards]);

  useEffect(() => {
    if (timeLeft === 0) {
      nextCard();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const flipCard = () => {
    setShowAnswer(!showAnswer);
  };

  const nextCard = () => {
    setShowAnswer(false);

    setCurrentCard((prev) =>
      prev === flashcards.length - 1 ? 0 : prev + 1
    );

    setTimeLeft(10);
  };

  const prevCard = () => {
    setShowAnswer(false);

    setCurrentCard((prev) =>
      prev === 0 ? flashcards.length - 1 : prev - 1
    );

    setTimeLeft(10);
  };

  const addFlashcard = () => {
    if (newQuestion.trim() === "" || newAnswer.trim() === "") {
      return;
    }

    const newCard = {
      question: newQuestion,
      answer: newAnswer,
    };

    setFlashcards([...flashcards, newCard]);

    setNewQuestion("");
    setNewAnswer("");
  };

  // EDIT CARD
  const editCard = () => {
    if (newQuestion.trim() === "" || newAnswer.trim() === "") {
      return;
    }

    const updatedCards = [...flashcards];

    updatedCards[currentCard] = {
      question: newQuestion,
      answer: newAnswer,
    };

    setFlashcards(updatedCards);

    setNewQuestion("");
    setNewAnswer("");
  };

  const deleteCard = () => {
    if (flashcards.length === 1) return;

    const updatedCards = flashcards.filter(
      (_, index) => index !== currentCard
    );

    setFlashcards(updatedCards);

    setCurrentCard(0);
    setShowAnswer(false);
  };

  const shuffleCards = () => {
    const shuffled = [...flashcards].sort(
      () => Math.random() - 0.5
    );

    setFlashcards(shuffled);

    setCurrentCard(0);

    setShowAnswer(false);

    setTimeLeft(10);
  };

  const markCorrect = () => {
    setScore(score + 1);
    nextCard();
  };

  const markWrong = () => {
    nextCard();
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <button
        className="dark-mode-btn"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <h1>Flash Card App</h1>

      <h2>Score: {score}</h2>

      <h3>Time Left: {timeLeft}s</h3>

      <div className="input-container">
        <input
          type="text"
          placeholder="Enter Question"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter Answer"
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
        />

        <button onClick={addFlashcard}>
          Add Flashcard
        </button>

        <button onClick={editCard}>
          Edit Card
        </button>
      </div>

      <div className="flashcard" onClick={flipCard}>
        {showAnswer
          ? flashcards[currentCard].answer
          : flashcards[currentCard].question}
      </div>

      <p>Click to Flip</p>

      <div className="score-buttons">
        <button onClick={markCorrect}>Correct</button>

        <button onClick={markWrong}>Wrong</button>
      </div>

      <div className="navigation-buttons">
        <button onClick={prevCard}>Previous</button>

        <button onClick={nextCard}>Next</button>

        <button onClick={deleteCard}>Delete Card</button>

        <button onClick={shuffleCards}>Shuffle</button>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${((currentCard + 1) / flashcards.length) * 100}%`,
          }}
        ></div>
      </div>

      <p className="progress-text">
        Card {currentCard + 1} of {flashcards.length}
      </p>
    </div>
  );
}

export default App;