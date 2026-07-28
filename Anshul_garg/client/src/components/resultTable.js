import React from 'react';
import '../styles/result.css'

export default function ResultTable({ score = 0, total = 5, isPassed = false }) {
    return (
        <div>
            <table>
                <thead className='table-header'>
                    <tr className='table-row'>
                        <th>Total Questions</th>
                        <th>Score</th>
                        <th>Result</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='table-body'>
                        <td>{total}</td>
                        <td>{score}</td>
                        <td>{isPassed ? "Passed" : "Failed"}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
