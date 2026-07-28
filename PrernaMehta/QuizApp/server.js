const express = require("express");
const app = express();
const PORT = 3000;

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
      "D. None of the above"
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
    question: "Which language runs in the browser?",
    options: [
      "A. Java",
      "B. C++",
      "C. JavaScript",
      "D. Python"
    ],
    answer: "C"
  },
  {
    id: 4,
    question: "Node.js is mainly used for?",
    options: [
      "A. Backend",
      "B. Database",
      "C. CSS",
      "D. Browser"
    ],
    answer: "A"
  },
  {
    id: 5,
    question: "Express is a?",
    options: [
      "A. Database",
      "B. Framework",
      "C. Browser",
      "D. Compiler"
    ],
    answer: "B"
  }
];

// GET /questions
app.get("/questions", (req, res) => {
  const data = questions.map(({ id, question, options }) => ({
    id,
    question,
    options
  }));

  res.json(data);
});

// POST /submit
app.post("/submit", (req, res) => {
  const answers = req.body;

  let score = 0;

  answers.forEach(ans => {
    const q = questions.find(item => item.id === ans.id);

    if (q && q.answer === ans.selected) {
      score++;
    }
  });

  res.json({
    score,
    total: questions.length
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});