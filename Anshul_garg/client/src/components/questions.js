import React from "react";
import '../styles/questions.css';
import { useSelector } from "react-redux"; 
import { useFetchQuestion } from "../hooks/fetch_question.js"; 

export default function Questions({ onChecked, selectedAnswers = {} }) {
   const { queue, trace } = useSelector(state => state.questions);
   
   // Destructure the custom hook safely
   const [fetchData] = useFetchQuestion();
   const isLoading = fetchData?.isLoading;
   const serverError = fetchData?.serverError;

   const currentQuestion = queue ? queue[trace] : undefined;
   const optionLetters = ["A", "B", "C", "D"];

   function onSelect(i) {
       const selectedLetter = optionLetters[i];
       onChecked(selectedLetter);
   }

   if (isLoading) return <h3 className="ques">Loading Questions...</h3>;
   if (serverError) return <h3 className="ques">{serverError.message || "Unknown error"}</h3>;
   if (!currentQuestion) return <h3 className="ques">No Question Available</h3>;

   const currentSelection = selectedAnswers[trace];

   return (
       <div className="questions">
           <h2 className="ques">{currentQuestion?.question}</h2>
           <ul key={currentQuestion?.id}>
               {
                   currentQuestion?.options.map((q, i) => {
                       const letter = optionLetters[i];
                       const isChecked = currentSelection === letter;

                       return (
                           <li key={i}>
                               <input 
                                   type="radio"
                                   name="options"
                                   id={`q${i}-option`}
                                   checked={isChecked}
                                   onChange={() => onSelect(i)}
                               />
                               <label className="text" htmlFor={`q${i}-option`}>
                                   {q}
                               </label>
                               <div className={`check ${isChecked ? "checked" : ""}`}></div>
                           </li>
                       );
                   })
               }
           </ul>
       </div>
   );
}