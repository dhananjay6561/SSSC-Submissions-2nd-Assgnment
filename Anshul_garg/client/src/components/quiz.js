import React, { useState } from "react";
import '../styles/quiz.css';
import Questions from '../components/questions.js';
import { moveNextQuestion, movePrevQuestion } from "../hooks/fetch_question.js";
import { useSelector, useDispatch } from 'react-redux';
import { postServerData } from "../hooks/setResult.js";
import { Navigate } from "react-router-dom";

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const { queue = [], trace = 0 } = useSelector(state => state.questions) || {};
    const dispatch = useDispatch();

    function onChecked(selectedLetter) {
        setUserAnswers(prev => ({
            ...prev,
            [trace]: selectedLetter
        }));
    }

    function onNext() {
        if (trace < queue.length - 1) {
            dispatch(moveNextQuestion());
        } else {
            onSubmit();
        }
    }

    function onPrev() {
        if (trace > 0) {
            dispatch(movePrevQuestion());
        }  
    }

    function onSubmit() {
        const payload = queue.map((q, index) => ({
            id: q.id,
            selected: userAnswers[index] || ""
        }));

        dispatch(postServerData(payload));
        setSubmitted(true);
    }

    if (submitted) {
        return <Navigate to={'/result'} replace={true} />;
    }

    

    return (
        <div className="container">
            <h1 className="title">Quiz App</h1>

            <Questions onChecked={onChecked} selectedAnswers={userAnswers} />

            <div className="grid">
                {trace > 0 ? (
                    <button className="prev btn" onClick={onPrev}>Prev</button>
                ) : <div />}
                
                <button className="next btn" onClick={onNext}>
                    {trace === queue.length - 1 ? "Submit" : "Next"}
                </button>
            </div>
        </div>
    );
}