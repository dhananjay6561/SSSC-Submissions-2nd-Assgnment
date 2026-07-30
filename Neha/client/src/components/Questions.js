import React, { useState } from "react";

export default function Questions({ question, onAnswer }) {
  const [selected, setSelected] = useState("");

  const handleChange = (option) => {
    setSelected(option);
    onAnswer(option);
  };

  return (
    <div className="questions">
      <h2 className="text-light">{question.question}</h2>

      <ul>
        {question.options.map((option, index) => (
          <li key={index}>
            <input
              type="radio"
              id={`option-${index}`}
              name="answer"
              value={option}
              checked={selected === option}
              onChange={() => handleChange(option)}
            />

            <label htmlFor={`option-${index}`}>
              {option}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}