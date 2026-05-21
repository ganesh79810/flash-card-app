import { useState, useEffect } from "react";

function App() {

  // LOAD FLASHCARDS FROM LOCAL STORAGE
  const [flashcards, setFlashcards] = useState(() => {

    const savedCards = localStorage.getItem("flashcards");

    return savedCards
      ? JSON.parse(savedCards)
      : [
          {
            question: "What is JavaScript?",
            answer: "JavaScript is a programming language."
          },
          {
            question: "What is React?",
            answer: "React is a JavaScript library for UI."
          },
          {
            question: "What is JSX?",
            answer: "JSX allows HTML inside JavaScript."
          }
        ];
  });

  const [currentCard, setCurrentCard] = useState(0);

  const [isFlipped, setIsFlipped] = useState(false);

  const [score, setScore] = useState(0);

  const [timeLeft, setTimeLeft] = useState(10);

  const [quizFinished, setQuizFinished] = useState(false);

  // LOAD DARK MODE FROM STORAGE
  const [darkMode, setDarkMode] = useState(() => {

    const savedTheme = localStorage.getItem("darkMode");

    return savedTheme === "true";
  });

  const [newQuestion, setNewQuestion] = useState("");

  const [newAnswer, setNewAnswer] = useState("");

  // SAVE FLASHCARDS
  useEffect(() => {

    localStorage.setItem(
      "flashcards",
      JSON.stringify(flashcards)
    );

  }, [flashcards]);

  // SAVE DARK MODE
  useEffect(() => {

    localStorage.setItem(
      "darkMode",
      darkMode
    );

  }, [darkMode]);

  // TIMER
  useEffect(() => {

    if (quizFinished) return;

    if (timeLeft === 0) {

      nextCard();

      return;
    }

    const timer = setTimeout(() => {

      setTimeLeft(timeLeft - 1);

    }, 1000);

    return () => clearTimeout(timer);

  }, [timeLeft]);

  // FLIP CARD
  const flipCard = () => {

    setIsFlipped(!isFlipped);
  };

  // CORRECT
  const handleCorrect = () => {

    setScore(score + 1);

    nextCard();
  };

  // WRONG
  const handleWrong = () => {

    nextCard();
  };

  // NEXT CARD
  const nextCard = () => {

    if (currentCard < flashcards.length - 1) {

      setCurrentCard(currentCard + 1);

      setIsFlipped(false);

      setTimeLeft(10);

    } else {

      setQuizFinished(true);
    }
  };

  // PREVIOUS CARD
  const previousCard = () => {

    if (currentCard > 0) {

      setCurrentCard(currentCard - 1);

      setIsFlipped(false);

      setTimeLeft(10);
    }
  };

  // RESTART
  const restartQuiz = () => {

    setCurrentCard(0);

    setScore(0);

    setTimeLeft(10);

    setIsFlipped(false);

    setQuizFinished(false);
  };

  // DARK MODE
  const toggleDarkMode = () => {

    setDarkMode(!darkMode);
  };

  // ADD CARD
  const addFlashcard = () => {

    if (
      newQuestion.trim() === "" ||
      newAnswer.trim() === ""
    ) {

      return;
    }

    const newCard = {

      question: newQuestion,

      answer: newAnswer
    };

    setFlashcards([...flashcards, newCard]);

    setNewQuestion("");

    setNewAnswer("");
  };

  // DELETE CARD
  const deleteFlashcard = () => {

    if (flashcards.length === 1) {

      return;
    }

    const updatedCards = flashcards.filter(
      (_, index) => index !== currentCard
    );

    setFlashcards(updatedCards);

    setCurrentCard(0);

    setIsFlipped(false);
  };

  // FINAL SCREEN
  if (quizFinished) {

    return (

      <div className={`app ${darkMode ? "dark" : ""}`}>

        <h1>Quiz Finished 🎉</h1>

        <h2>
          Your Score: {score} / {flashcards.length}
        </h2>

        <button onClick={restartQuiz}>
          Restart Quiz
        </button>

        <button onClick={toggleDarkMode}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>

      </div>
    );
  }

  return (

    <div className={`app ${darkMode ? "dark" : ""}`}>

      <button onClick={toggleDarkMode}>
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <h1>Flash Card App</h1>

      <h2>Score: {score}</h2>

      <h3>Time Left: {timeLeft}s</h3>

      {/* ADD CARD */}
      <div className="add-card">

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

      </div>

      {/* FLASH CARD */}
      <div
        className={`flip-card ${isFlipped ? "flipped" : ""}`}
        onClick={flipCard}
      >

        <div className="flip-card-inner">

          <div className="flip-card-front">

            <h2>
              {flashcards[currentCard].question}
            </h2>

            <p>Click to Flip</p>

          </div>

          <div className="flip-card-back">

            <h2>
              {flashcards[currentCard].answer}
            </h2>

          </div>

        </div>

      </div>

      {/* SCORE BUTTONS */}
      <div>

        <button onClick={handleCorrect}>
          Correct
        </button>

        <button onClick={handleWrong}>
          Wrong
        </button>

      </div>

      {/* NAVIGATION */}
      <div>

        <button onClick={previousCard}>
          Previous
        </button>

        <button onClick={nextCard}>
          Next
        </button>

        <button onClick={deleteFlashcard}>
          Delete Card
        </button>

      </div>

      {/* PROGRESS BAR */}
      <div className="progress-container">

        <div
          className="progress-bar"
          style={{
            width: `${((currentCard + 1) / flashcards.length) * 100}%`
          }}
        >

        </div>

      </div>

      <p className="progress-text">
        Card {currentCard + 1} of {flashcards.length}
      </p>

    </div>
  );
}

export default App;