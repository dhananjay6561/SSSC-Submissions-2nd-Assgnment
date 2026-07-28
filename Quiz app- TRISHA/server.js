const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3001;

app.use(cors());
app.use(express.json());


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
    question: "Which CSS property changes the background color?",
    options: [
      "A. bgcolor",
      "B. background-color",
      "C. color",
      "D. bg-color"
    ],
    answer: "B"
  },
  {
    id: 3,
    question: "Which JavaScript keyword is used to declare a variable?",
    options: [
      "A. var",
      "B. int",
      "C. string",
      "D. char"
    ],
    answer: "A"
  },
  {
    id: 4,
    question: "What does HTTP stand for?",
    options: [
      "A. Hyper Text Transfer Protocol",
      "B. Hyper Tech Transfer Process",
      "C. High Transfer Text Protocol",
      "D. None of the above"
    ],
    answer: "A"
  },
  {
    id: 5,
    question: "Which HTML tag is used for a hyperlink?",
    options: [
      "A. <link>",
      "B. <a>",
      "C. <href>",
      "D. <url>"
    ],
    answer: "B"
  }
];

app.get ('/questions', (req, res) => {
    const safeQuestions = questions.map (q => ({
        id: q.id,
        question: q.question,
        options: q.options
    }));
    res.json(safeQuestions);
});

app.post('/submit', (req, res) => {
  const userAnswers = req.body;
  let score = 0;

  userAnswers.forEach(function (userAnswer) {
    const question = questions.find(q => q.id === userAnswer.id);
    if (question) {
      // Extract just the letter from the selected option
      const selectedLetter = userAnswer.selected ? userAnswer.selected.charAt(0) : null;
      if (question.answer === selectedLetter) {
        score++;
      }
    }
  });

  res.json({ score: score, total: questions.length });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});