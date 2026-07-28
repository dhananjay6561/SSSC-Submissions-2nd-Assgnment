const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Serve frontend files
app.use(express.static(path.join(__dirname, "public")));

// Questions array
const questions = [
  {
    id: 1,
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Hyper Transfer Markup Logic",
      "Home Tool Markup Language"
    ],
    answer: "Hyper Text Markup Language"
  },

  {
    id: 2,
    question: "Which tag is used to create a hyperlink?",
    options: [
      "<link>",
      "<a>",
      "<href>",
      "<url>"
    ],
    answer: "<a>"
  },

  {
    id: 3,
    question: "Which language is used for styling web pages?",
    options: [
      "HTML",
      "CSS",
      "Java",
      "Python"
    ],
    answer: "CSS"
  },

  {
    id: 4,
    question: "Which language runs in the browser?",
    options: [
      "Java",
      "C++",
      "JavaScript",
      "Python"
    ],
    answer: "JavaScript"
  },

  {
    id: 5,
    question: "Which module is used to create a server in this assignment?",
    options: [
      "React",
      "Express",
      "Angular",
      "Vue"
    ],
    answer: "Express"
  }
];

app.get("/questions", (req, res) => {
  const safeQuestions = questions.map((q) => ({
    id: q.id,
    question: q.question,
    options: q.options,
  }));

  res.json(safeQuestions);
});

app.post("/submit", (req, res) => {
  const userAnswers = req.body;

  let score = 0;

  userAnswers.forEach((ans) => {
    const question = questions.find((q) => q.id === ans.id);

    if (question && question.answer === ans.selected) {
      score++;
    }
  });

  res.json({ score });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});