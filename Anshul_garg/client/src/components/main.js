import React, { useRef } from "react";
import {Link} from "react-router-dom";
import Quiz from "./quiz";
import '../styles/main.css' ;
import { useDispatch } from "react-redux";
import { setUserId } from "../redux/result_reducer";

export default function Main(){

    const inputRef= useRef(null)
    const dispatch= useDispatch()

    function startQuiz(){
        if(inputRef.current?.value){
            dispatch(setUserId(inputRef.current?.value))
        }
    }

    return(
        <div className="container">
            <h1 className="title">Quiz App</h1>

            <ol>
                <li>You will be asked 5 questions one after other</li>
                <li>1 points is awarded for each correct answer</li>
                <li>Each question will have 4 options out of which You can choose only one</li>
                <li>You can review and change answers before submitting the</li>
                <li>Your score will be declared at the end of the quiz</li>
            </ol>

            <form id="form">
                <input ref={inputRef} type="text " placeholder="Enter your Name"/>
            </form>

            <div className="start">
                <Link className="btn" to={'Quiz'} onClick={startQuiz}>Start Quiz</Link>
            </div>
        </div>
    )
}