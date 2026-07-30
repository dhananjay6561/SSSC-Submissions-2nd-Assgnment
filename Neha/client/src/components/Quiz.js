import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Questions from "./Questions";
import questions from "../database/data";
import { getserverdata } from "../helper";

export default function Quiz() {


  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(
    Array(questions.length).fill("")
  );

  const handleAnswer = (answer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = answer;
    setAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (answers[currentQuestion] === "") {
      alert("Please select an option.");
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      let score = 0;

      questions.forEach((question, index) => {
        if (answers[index] === question.answer) {
          score += 10;
        }
      });

      localStorage.setItem("score", score);
      localStorage.setItem("correct", score / 10);
      localStorage.setItem("wrong", questions.length - score / 10);

      navigate("/result");
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div className="container">
      <h1 className="title text-light">Quiz Application</h1>

      <p className="text-light">
        Question {currentQuestion + 1} of {questions.length}
      </p>

      <Questions
        question={questions[currentQuestion]}
        onAnswer={handleAnswer}
      />

      <div className="grid">
        <button
          className="btn"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          Previous
        </button>

        <button
          className="btn"
          onClick={handleNext}
        >
          {currentQuestion === questions.length - 1
            ? "Finish Quiz"
            : "Next"}
        </button>
      </div>
    </div>
  );
}