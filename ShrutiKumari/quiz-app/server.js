const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
const questions = [
    {
        id: 1,
        question: "What is the capital of India?",
        options: ["New Delhi", "Mumbai", "Kolkata", "Chennai"],
        answer: "New Delhi"
    },
    {
        id: 2,
        question: "Which language runs in a web browser?",
        options: ["Python", "Java", "JavaScript", "C++"],
        answer: "JavaScript"
    },
    {
        id: 3,
        question: "HTML stands for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Home Tool Markup Language",
            "Hyperlink Text Management Language"
        ],
        answer: "Hyper Text Markup Language"
    },
    {
        id: 4,
        question: "Which tag is used to define a hyperlink?",
        options: ["<a>", "<link>", "<anchor>", "<hyperlink>"],
        answer: "<a>"
    },
    {
        id: 5,
        question: "CSS stands for?",
        options: [
            "Cascading Style Sheets",
            "Creative Style System",
            "Computer Style Sheets",
            "Colorful Style Sheets"
        ],
        answer: "Cascading Style Sheets"
    }
];
app.get("/questions", (req, res) => {
    const safeQuestions = questions.map(q => ({
        id: q.id,
        question: q.question,
        options: q.options
    }));
    res.json(safeQuestions);
});
app.post("/submit", (req, res) => {
    const answers = req.body.answers || {};
    let score = 0;

    questions.forEach(q => {
        if (answers[q.id] === q.answer) {
            score++;
        }
    });
    res.json({
        score: score,
        total: questions.length
    });
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});