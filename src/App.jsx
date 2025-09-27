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
  const [cardHistory, setCardHistory] = useState([0]); // Track card history
  const [historyIndex, setHistoryIndex] = useState(0); // Current position in history

  // Function to flip the card
  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  // Function to get next random card
  const getNextCard = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * cardData.length);
    } while (newIndex === currentCardIndex && cardData.length > 1);
    
    setCurrentCardIndex(newIndex);
    setIsFlipped(false); // Reset to show question side
    
    // Update history
    const newHistory = cardHistory.slice(0, historyIndex + 1);
    newHistory.push(newIndex);
    setCardHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  // Function to go to previous card
  const getPreviousCard = () => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      setHistoryIndex(prevIndex);
      setCurrentCardIndex(cardHistory[prevIndex]);
      setIsFlipped(false);
    }
  };

  const currentCard = cardData[currentCardIndex];

  return (
    <div className="App">
      <div className="background-overlay"></div>
      
      <div className="header">
        <h1>Soccer Trivia</h1>
        <h2>Test your ball knowledge</h2>
        <p>Number of cards: {cardData.length}</p>
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

      <div className="button-container">
        <button 
          className="nav-button prev-button" 
          onClick={getPreviousCard}
          disabled={historyIndex === 0}
        >
          ← Previous Card
        </button>
        <button className="nav-button next-button" onClick={getNextCard}>
          Next Card →
        </button>
      </div>
    </div>
  );
};

export default App;