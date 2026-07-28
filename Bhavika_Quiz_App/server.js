const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

// Quiz Questions
const questions = [
    {
        id: 1,
        question: "What does HTML stand for?",
        options: [
            "A. Hyper Text Markup Language",
            "B. Hyper Tool Multi Language",
            "C. High Text Machine Language",
            "D. None of these"
        ],
        answer: "A"
    },
    {
        id: 2,
        question: "Which language is used for styling web pages?",
        options: [
            "A. HTML",
            "B. CSS",
            "C. Java",
            "D. Python"
        ],
        answer: "B"
    },
    {
        id: 3,
        question: "Which language is mainly used for web development?",
        options: [
            "A. C",
            "B. JavaScript",
            "C. C++",
            "D. Python"
        ],
        answer: "B"
    },
    {
        id: 4,
        question: "Which company created JavaScript?",
        options: [
            "A. Google",
            "B. Microsoft",
            "C. Netscape",
            "D. Apple"
        ],
        answer: "C"
    },
    {
        id: 5,
        question: "Which HTML tag is used to create a link?",
        options: [
            "A. <a>",
            "B. <link>",
            "C. <href>",
            "D. <url>"
        ],
        answer: "A"
    }
];

// Send questions to frontend without answers
app.get("/questions", (req, res) => {

    let quiz = [];

    questions.forEach((q) => {
        quiz.push({
            id: q.id,
            question: q.question,
            options: q.options
        });
    });

    res.json(quiz);

});

// Check answers
app.post("/submit", (req, res) => {

    const userAnswers = req.body;

    let score = 0;

    userAnswers.forEach((item) => {

        const question = questions.find((q) => q.id === item.id);

        if (question.answer === item.selected) {
            score++;
        }

    });

    res.json({
        score: score,
        total: questions.length
    });

});

app.listen(PORT, () => {
    console.log("Server is running on http://localhost:3000");
});