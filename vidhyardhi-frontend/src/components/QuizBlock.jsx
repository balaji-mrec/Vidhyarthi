import { useState, useEffect } from "react";
import "./QuizBlock.css";

export default function QuizBlock({ quiz }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const currentQuestion = quiz[currentIndex];

  // Reset when question changes
  useEffect(() => {
    setShowFeedback(false);
  }, [currentIndex]);

  const handleOptionSelect = (option) => {
    if (isAnswered) return;
    setSelected(option);
  };

  const handleSubmit = () => {
    if (selected === null) {
      alert("Please select an answer!");
      return;
    }

    setIsAnswered(true);
    setShowFeedback(true);

    if (selected === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setIsAnswered(false);
    setSelected(null);
    setShowFeedback(false);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelected(null);
    setIsAnswered(false);
    setScore(0);
    setShowFeedback(false);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Quiz completed
  if (currentIndex >= quiz.length) {
    const percentage = Math.round((score / quiz.length) * 100);
    
    return (
      <div className={`quiz-container ${isFullscreen ? 'fullscreen' : ''}`}>
        <div className="quiz-box">
          <div className="quiz-header">
            <h2>Quiz Complete!</h2>
            <div className="score-badge">{currentIndex}/{quiz.length}</div>
          </div>

          <div className="result-section">
            <div className="score-circle">
              <span className="score-text">{score}/{quiz.length}</span>
              <span className="percentage">{percentage}%</span>
            </div>
            
            <div className="result-message">
              {percentage >= 80 ? "Excellent work!" : 
               percentage >= 60 ? "Good job!" : "Keep practicing!"}
            </div>
          </div>

          <div className="button-row">
            <button onClick={handleRestart} className="btn restart">
              Restart
            </button>
            <button onClick={() => window.location.reload()} className="btn home">
              Home
            </button>
            <button onClick={toggleFullscreen} className="btn fullscreen">
              {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`quiz-container ${isFullscreen ? 'fullscreen' : ''}`}>
      <div className="quiz-box">
        {/* Header */}
        <div className="quiz-header">
          <h2>Quiz Time</h2>
          <div className="score-badge">Question {currentIndex + 1}/{quiz.length}</div>
        </div>

        {/* Question */}
        <div className="question-section">
          <h3>Q{currentIndex + 1}. {currentQuestion.question}</h3>
        </div>

        {/* Options */}
        <div className="options-section">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selected === option;
            const isCorrect = option === currentQuestion.correctAnswer;
            const isWrong = isAnswered && isSelected && !isCorrect;
            const showCorrect = isAnswered && isCorrect;

            return (
              <div
                key={index}
                className={`option-box ${isSelected ? 'selected' : ''} ${
                  showCorrect ? 'correct' : ''
                } ${isWrong ? 'wrong' : ''}`}
                onClick={() => handleOptionSelect(option)}
              >
                <div className="option-indicator">
                  {isSelected && !isAnswered && <span className="dot"></span>}
                  {showCorrect && <span className="check">✓</span>}
                  {isWrong && <span className="cross">✗</span>}
                </div>
                <span className="option-text">{option}</span>
              </div>
            );
          })}
        </div>

        {/* Buttons Row */}
        <div className="button-row">
          <button onClick={handleRestart} className="btn restart">
            Restart
          </button>

          {!isAnswered ? (
            <button 
              onClick={handleSubmit} 
              className={`btn submit ${selected === null ? 'disabled' : ''}`}
              disabled={selected === null}
            >
              {selected === null ? 'Select Answer' : 'Submit Answer'}
            </button>
          ) : (
            currentIndex < quiz.length - 1 ? (
              <button onClick={handleNext} className="btn next">
                Next Question
              </button>
            ) : (
              <button onClick={handleNext} className="btn next">
                Finish Quiz
              </button>
            )
          )}

          <button onClick={toggleFullscreen} className="btn fullscreen">
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div className="feedback-section">
            {selected === currentQuestion.correctAnswer ? (
              <div className="feedback correct">
                <span className="feedback-icon">✓</span>
                Correct! Well done!
              </div>
            ) : (
              <div className="feedback wrong">
                <span className="feedback-icon">✗</span>
                Incorrect. The correct answer is: <strong>{currentQuestion.correctAnswer}</strong>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}