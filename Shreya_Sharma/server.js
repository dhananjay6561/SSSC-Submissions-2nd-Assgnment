const express = require('express');
const path = require('path');

const app = express();
const cors = require('cors');
app.use(cors());
const PORT = 3000;


app.use(express.json()); 
app.use(express.static(path.join(__dirname, 'public'))); 

const questions = [
    {
        id: 1,
        question: "What does HTML stand for?",
        options: [
            "A. Hyper Text Markup Language",
            "B. High Tech Modern Language",
            "C. Hyper Transfer Markup Logic",
            "D. None of the above"
        ],
        answer: "A"
    },
    {
        id: 2,
        question: "Which language is primarily used for web browser interactivity?",
        options: [
            "A. Python",
            "B. Java",
            "C. JavaScript",
            "D. C++"
        ],
        answer: "C"
    },
    {
        id: 3,
        question: "What does CSS stand for?",
        options: [
            "A. Computer Style Sheets",
            "B. Cascading Style Sheets",
            "C. Creative Style Sheets",
            "D. Colorful Style Sheets"
        ],
        answer: "B"
    },
    {
        id: 4,
        question: "What is a correct way to declare a variable in JavaScript?",
        options: [
            "A. variable myVar;",
            "B. v myVar;",
            "C. let myVar;",
            "D. declare myVar;"
        ],
        answer: "C"
    },
    {
        id: 5,
        question: "Which of the following is NOT a JavaScript framework/library?",
        options: [
            "A. React",
            "B. Angular",
            "C. Django",
            "D. Vue"
        ],
        answer: "C"
    }
];


app.get('/questions', (req, res) => {
    const questionsWithoutAnswers = questions.map(q => ({
        id: q.id,
        question: q.question,
        options: q.options
    }));
    res.json(questionsWithoutAnswers);
});


app.post('/submit', (req, res) => {
    const userAnswers = req.body; 
    let score = 0;

    userAnswers.forEach(userAns => {
       
        const realQuestion = questions.find(q => q.id === userAns.id);
        
        
        if (realQuestion && realQuestion.answer === userAns.selected) {
            score++;
        }
    });

    res.json({ score: score, total: questions.length });
});


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});