import React from 'react';
import '../styles/result.css';
import { Link } from 'react-router-dom';
import ResultTable from './resultTable';
import { useDispatch, useSelector } from 'react-redux';
import { resetAllAction } from '../redux/question_reducer';
import { resetResultAction } from '../redux/result_reducer';

export default function Result() {
    const dispatch = useDispatch();

    
    const resultData = useSelector(state => state.result.result) || [];
    
    const lastResult = Array.isArray(resultData) && resultData.length > 0 
        ? resultData[resultData.length - 1] 
        : (resultData.score !== undefined ? resultData : {});

    const score = lastResult?.score ?? 0;
    const total = lastResult?.total ?? 5;
    const percentage = lastResult?.percentage ?? (score / total) * 100;
    const isPassed = percentage >= 50;

    function onRestart() {
        dispatch(resetAllAction());
        dispatch(resetResultAction());
    }

    return (
        <div className='container'>
            <h1 className='title'>Quiz App</h1>

            <div className='result flex-center'>
                <div className='flex'>
                    <span>Score Achieved : </span>
                    <span className='bold'>{score} / {total}</span>
                </div>
                <div className='flex'>
                    <span>Percentage : </span>
                    <span className='bold'>{percentage.toFixed(0)}%</span>
                </div>
                <div className='flex'>
                    <span>Quiz Result : </span>
                    <span style={{ color : isPassed ? "#22c55e" : "#ff4a4a" }} className='bold'>
                        {isPassed ? "Passed" : "Failed"}
                    </span>
                </div>
            </div>

            <div className="start">
                <Link className='btn' to={'/'} onClick={onRestart}>Restart</Link>
            </div>

            <div className="container">
                <ResultTable score={score} total={total} isPassed={isPassed} />
            </div>
        </div>
    );
}