import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import '../style/Main.css'
 

export default function Main(){

    const inputRef = useRef(null); 
    return(
        <div className='container'>
            <h1 className='titel text-light'>Quiz Application</h1>

            <ol>
                <li>There are 8 Questions in continuous manner (One after one).</li>
                <li>10 point is awarded for cooorect answer.</li>
                <li>Each question has three option.you can choose only one option.</li>
                <li>The result will be shown at the end.</li>
            </ol>

            <form id ="form">
                <input ref={inputRef} type='text' placeholder='Username'/>
            </form>

            <div className='start'></div>
            <Link className='btn' to={'Quiz'}>Start Quiz</Link>
        </div>
    );
}