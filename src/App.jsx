import React, { useState } from 'react';
import './App.css';

const App = () => {
  
  const cardData = [
    // Easy cards (green)
    { question: "Which country won the 2018 FIFA World Cup?", answer: "France", difficulty: "easy" },
    { question: "What color card does a referee show to send a player off?", answer: "Red card", difficulty: "easy" },
    { question: "How many players does a team start with on the field in a standard soccer match?", answer: "11", difficulty: "easy" },
    
    // Medium cards (yellow)
    { question: "Who has the most UEFA Champions League goals?", answer: "Cristiano Ronaldo", difficulty: "medium" },
    { question: "Who has the most red cards for Real Madrid", answer: "Sergio Ramos", difficulty: "medium" },
    { question: "Which English Premier League club has the nickname \"The Red Devils\"?", answer: "Manchester United", difficulty: "medium" },
    { question: "In which year did Lionel Messi win his first Ballon d'Or?", answer: "2009", difficulty: "medium" },
    
    // Hard cards (red)
    { question: "Which country was the first to win the FIFA World Cup in 1930?", answer: "Uruguay", difficulty: "hard" },
    { question: "What was the fastest goal ever scored in a World Cup match (time in seconds)?", answer: "11 seconds (Hakan Şükür, Turkey, 2002)", difficulty: "hard" },
    { question: "Which African nation was the first to reach the quarterfinals of a World Cup?", answer: "Cameroon (1990)", difficulty: "hard" }
  ];

  // State variables
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cards, setCards] = useState(cardData); // Mutable list for shuffle
  const [userGuess, setUserGuess] = useState('');
  const [guessResult, setGuessResult] = useState(''); // 'correct', 'incorrect', or ''
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  // Function to flip the card
  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  // Function to handle guess submission
  const handleSubmitGuess = () => {
    const currentCard = cards[currentCardIndex];
    const correctAnswer = currentCard.answer.toLowerCase().trim();
    const userAnswer = userGuess.toLowerCase().trim();
    
    // Check if answer is correct (case-insensitive)
    if (userAnswer === correctAnswer) {
      setGuessResult('correct');
      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      if (newStreak > longestStreak) {
        setLongestStreak(newStreak);
      }
    } else {
      setGuessResult('incorrect');
      setCurrentStreak(0);
    }
  };

  // Function to go to next card
  const getNextCard = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
      setUserGuess('');
      setGuessResult('');
    }
  };

  // Function to go to previous card
  const getPreviousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
      setUserGuess('');
      setGuessResult('');
    }
  };

  // Function to shuffle cards
  const shuffleCards = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setUserGuess('');
    setGuessResult('');
  };

  const currentCard = cards[currentCardIndex];

  return (
    <div className="App">
      <div className="background-overlay"></div>
      
      <div className="header">
        <h1>Soccer Trivia</h1>
        <h2>Test your ball knowledge</h2>
        <p>Number of cards: {cards.length}</p>
        <p className="streak-info">
          Current Streak: {currentStreak} | Longest Streak: {longestStreak}
        </p>
      </div>

      <div className="card-container">
        <div 
          className={`flip-card ${currentCard.difficulty}`}
          onClick={flipCard}
        >
          <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
            <div className="flip-card-front">
              <div className="card-content">
                <h3>Question</h3>
                <p>{currentCard.question}</p>
              </div>
            </div>
            <div className="flip-card-back">
              <div className="card-content">
                <h3>Answer</h3>
                <p>{currentCard.answer}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="guess-section">
        <label htmlFor="guess-input">Guess the answer:</label>
        <input
          id="guess-input"
          type="text"
          value={userGuess}
          onChange={(e) => setUserGuess(e.target.value)}
          placeholder="Type your answer here..."
          className={`guess-input ${guessResult}`}
        />
        <button onClick={handleSubmitGuess} className="submit-button">
          Submit Guess
        </button>
        {guessResult && (
          <p className={`result-message ${guessResult}`}>
            {guessResult === 'correct' ? '✓ Correct!' : '✗ Incorrect, try again!'}
          </p>
        )}
      </div>

      <div className="button-container">
        <button 
          className="nav-button prev-button" 
          onClick={getPreviousCard}
          disabled={currentCardIndex === 0}
        >
          ← Previous Card
        </button>
        <button 
          className="nav-button shuffle-button" 
          onClick={shuffleCards}
        >
          🔀 Shuffle
        </button>
        <button 
          className="nav-button next-button" 
          onClick={getNextCard}
          disabled={currentCardIndex === cards.length - 1}
        >
          Next Card →
        </button>
      </div>
    </div>
  );
};

export default App;