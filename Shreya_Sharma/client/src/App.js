import React, { useState, useEffect } from 'react';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [currentSelection, setCurrentSelection] = useState(null);
  const [scoreData, setScoreData] = useState(null);

  // Fetch questions when the component mounts
  useEffect(() => {
    fetch('http://localhost:3000/questions')
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error('Error fetching questions:', err));
  }, []);

  const handleSelect = (optionText, questionId) => {
    // Extract the letter (A, B, C, or D)
    const letter = optionText.charAt(0);
    setCurrentSelection({ id: questionId, selected: letter });
  };

  const handleNext = () => {
    if (currentSelection) {
      setUserAnswers([...userAnswers, currentSelection]);
      setCurrentIndex(currentIndex + 1);
      setCurrentSelection(null); // Reset selection for the next question
    }
  };

  const handleSubmit = () => {
    if (currentSelection) {
      const finalAnswers = [...userAnswers, currentSelection];
      
      // Post all answers to the Express backend
      fetch('http://localhost:3000/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalAnswers),
      })
        .then((res) => res.json())
        .then((data) => setScoreData(data))
        .catch((err) => console.error('Error submitting quiz:', err));
    }
  };

  // 1. Render the Score Screen if quiz is complete
  if (scoreData) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={{ color: '#28a745' }}>Quiz Complete!</h2>
          <p style={{ fontSize: '20px' }}>
            You scored <strong>{scoreData.score}</strong> out of {scoreData.total}!
          </p>
        </div>
      </div>
    );
  }

  // 2. Render a loading state if questions haven't arrived yet
  if (questions.length === 0) {
    return <div style={styles.container}>Loading questions...</div>;
  }

  // 3. Render the Quiz Questions
  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h3 style={{ textAlign: 'left' }}>
          {currentIndex + 1}. {currentQuestion.question}
        </h3>
        
        <div>
          {currentQuestion.options.map((opt, index) => {
            const isSelected = currentSelection && currentSelection.selected === opt.charAt(0);
            return (
              <div
                key={index}
                onClick={() => handleSelect(opt, currentQuestion.id)}
                style={{
                  ...styles.option,
                  ...(isSelected ? styles.selectedOption : {}),
                }}
              >
                {opt}
              </div>
            );
          })}
        </div>
        
        {isLastQuestion ? (
          <button
            onClick={handleSubmit}
            disabled={!currentSelection}
            style={{
              ...styles.button,
              ...( !currentSelection ? styles.buttonDisabled : {} )
            }}
          >
            Submit Quiz
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={!currentSelection}
            style={{
              ...styles.button,
              ...( !currentSelection ? styles.buttonDisabled : {} )
            }}
          >
            Next Question
          </button>
        )}
      </div>
    </div>
  );
}

// Inline CSS for easy copy-pasting
const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f4f4f9', fontFamily: 'Arial, sans-serif' },
  card: { background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', width: '100%', maxWidth: '500px', textAlign: 'center' },
  option: { display: 'block', padding: '12px', margin: '10px 0', background: '#eef2f5', border: '2px solid transparent', borderRadius: '5px', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s ease' },
  selectedOption: { borderColor: '#007bff', background: '#e0f0ff', fontWeight: 'bold' },
  button: { marginTop: '20px', padding: '10px 20px', border: 'none', borderRadius: '5px', background: '#007bff', color: 'white', fontSize: '16px', cursor: 'pointer', width: '100%', transition: 'all 0.2s ease' },
  buttonDisabled: { background: '#ccc', cursor: 'not-allowed' }
};

export default App;