import React, { useId } from "react";
import { Link } from "react-router-dom";
import ResultTable from "./ResultTable";
import "../style/Result.css";

export default function Result() {
  const username = localStorage.getItem("username") || "Guest";
  const score = Number(localStorage.getItem("score")) || 0;
  const correct = Number(localStorage.getItem("correct")) || 0;
  const wrong = Number(localStorage.getItem("wrong")) || 0;

  const status = score >= 50 ? "Passed" : "Failed";

  const attempts = correct + wrong;
  console.log({username,attempts,score,status});

  return (
    <div className="container">

  <h1 className="title text-light"> Quiz Result</h1>

  <div className="result-card">

    <div className="result-row">
      <span> Username</span>
      <span>{username}</span>
    </div>

    <div className="result-row">
      <span> Total Questions</span>
      <span>8</span>
    </div>

    <div className="result-row">
      <span> Correct Answers</span>
      <span>{correct}</span>
    </div>

    <div className="result-row">
      <span> Wrong Answers</span>
      <span>{wrong}</span>
    </div>

    <div className="result-row">
      <span> Accuracy</span>
      <span>{((correct / 8) * 100).toFixed(0)}%</span>
    </div>

    <div className="result-row">
      <span>Total Score</span>
      <span>{score} / 80</span>
    </div>

    <div className="result-row">
      <span> Status</span>

      <span className={score >= 50 ? "pass" : "fail"}>
        {status}
      </span>
    </div>

  </div>

  <div className="start">
    <Link to="/" className="btn">
      Restart Quiz
    </Link>
  </div>

</div>
  );
}