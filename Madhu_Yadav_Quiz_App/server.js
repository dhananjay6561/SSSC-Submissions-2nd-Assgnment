const express = require("express");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.static("public"));

const questions = [
  {
    id: 1,
    question: "What does HTML stand for?",
    options: [
      "A. Hyper Text Markup Language",
      "B. High Tech Modern Language",
      "C. Hyper Transfer Markup Logic",
      "D. Home Tool Markup Language"
    ],
    answer: "A"
  },
  {
    id: 2,
    question: "Which HTML tag is used to create a hyperlink?",
    options: [
      "A. <link>",
      "B. <a>",
      "C. <href>",
      "D. <url>"
    ],
    answer: "B"
  },
  {
    id: 3,
    question: "Which CSS property changes the text color?",
    options: [
      "A. font-color",
      "B. color",
      "C. text-style",
      "D. background-color"
    ],
    answer: "B"
  },
  {
    id: 4,
    question: "Which symbol is used for single-line comments in JavaScript?",
    options: [
      "A. <!-- -->",
      "B. //",
      "C. ##",
      "D. **"
    ],
    answer: "B"
  },
  {
    id: 5,
    question: "Which keyword is used to declare a constant in JavaScript?",
    options: [
      "A. var",
      "B. let",
      "C. const",
      "D. static"
    ],
    answer: "C"
  },
  {
    id: 6,
    question: "Which method prints output to the browser console?",
    options: [
      "A. print()",
      "B. console.log()",
      "C. document.write()",
      "D. alert()"
    ],
    answer: "B"
  },
  {
    id: 7,
    question: "Which CSS property is used to make text bold?",
    options: [
      "A. font-weight",
      "B. text-weight",
      "C. bold",
      "D. font-style"
    ],
    answer: "A"
  },
  {
    id: 8,
    question: "Which HTML element is used to display an image?",
    options: [
      "A. <image>",
      "B. <img>",
      "C. <picture>",
      "D. <src>"
    ],
    answer: "B"
  },
  {
    id: 9,
    question: "Which JavaScript function displays a popup message?",
    options: [
      "A. prompt()",
      "B. console.log()",
      "C. alert()",
      "D. message()"
    ],
    answer: "C"
  },
  {
    id: 10,
    question: "Which HTML tag is used to insert a line break?",
    options: [
      "A. <break>",
      "B. <br>",
      "C. <lb>",
      "D. <hr>"
    ],
    answer: "B"
  }
];

app.get("/questions", (req, res) => {
  const quizQuestions = questions.map(({ id, question, options }) => ({
    id,
    question,
    options
  }));

  res.json(quizQuestions);
});

app.post("/submit", (req, res) => {

    const userAnswers = req.body.answers;

    let score = 0;

    userAnswers.forEach(userAnswer => {

        const question = questions.find(
            q => q.id === userAnswer.id
        );

        if (question && question.answer === userAnswer.answer) {
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