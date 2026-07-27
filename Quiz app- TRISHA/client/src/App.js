import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionsIndex, setCurrentQuestionsIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch('http://localhost:3001/questions');
      const data = await response.json();
      setQuestions(data);
      setUserAnswers(new Array(data.length).fill(null));
    } catch (err) {
      console.error('Failed to fetch questions', err);
    }
  };

  const handleOptionSelect = (option) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionsIndex] = option;
    setUserAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionsIndex < questions.length - 1) {
      setCurrentQuestionsIndex(currentQuestionsIndex + 1);
    }
  };

const handleSubmit = async () => {
  const formatteduserAnswers = questions.map((q, index) => ({
    id: q.id,
    selected: userAnswers[index] ? userAnswers[index].charAt(0) : null  // ← Extract JUST the letter!
  }));

  try {
    const response = await fetch('http://localhost:3001/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formatteduserAnswers)
    });
    const result = await response.json();
    setScore(result.score);
    setSubmitted(true);
  } catch (err) {
    console.error('Submit failed', err);
  }
};

  if (submitted) {
    return (
      <div className="app result-screen">
        <h1>🎉 Quiz Complete!</h1>
        <div className="score">
          {score} / {questions.length}
        </div>
      </div>
    );
  }

  const currentQuestions = questions[currentQuestionsIndex];
  const isLast = currentQuestionsIndex === questions.length - 1;

  return (
    <div className="app">
      <div className="progress">
        Question {currentQuestionsIndex + 1} of {questions.length}
      </div>

      <h2 className="question">{currentQuestions?.question}</h2>

      <div className="options">
        {currentQuestions?.options?.map((option) => (
          <button
            key={option}
            className={`option-btn ${userAnswers[currentQuestionsIndex] === option ? 'selected' : ''}`}
            onClick={() => handleOptionSelect(option)}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="nav-buttons">
        {!isLast ? (
          <button onClick={handleNext} disabled={!userAnswers[currentQuestionsIndex]}>
            Next →
          </button>
        ) : (
          <button className="submit-btn" onClick={handleSubmit} disabled={!userAnswers[currentQuestionsIndex]}>
            📤 Submit Quiz
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
