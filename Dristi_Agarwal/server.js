const express = require("express");
const app = express();
// Middleware
app.use(express.json());
// Serve static files
app.use(express.static("public"));
//Questions
const questions = [
  {
    id: 1,
    question: "What does JSX stand for?",
    options: [
      "A. Java Syntax Extension",
      "B. JavaScript XML",
      "C. JavaScript Extension",
      "D. JSON Syntax Extension"
    ],
    answer: "B"
  },
  {
    id: 2,
    question: "React is primarily a library for building:",
    options: [
      "A. Databases",
      "B. Operating systems",
      "C. User interfaces",
      "D. Web servers"
    ],
    answer: "C"
  },
  {
    id: 3,
    question: "Which company originally created and maintains React?",
    options: [
      "A. Google",
      "B. Microsoft",
      "C. Meta (Facebook)",
      "D. Amazon"
    ],
    answer: "C"
  },
  {
    id: 4,
    question: "A React component's name must start with:",
    options: [
      "A. A lowercase letter",
      "B. An underscore",
      "C. An uppercase letter",
      "D. A number"
    ],
    answer: "C"
  },
  {
    id: 5,
    question: "How do you pass data from a parent component to a child component?",
    options: [
      "A. Through state",
      "B. Through props",
      "C. Through hooks",
      "D. Through the DOM"
    ],
    answer: "B"
  }
];
//Routes
//get route
app.get("/questions",(req,res)=>{

    const quizQuestions = questions.map((q)=>{
        return {
            id:q.id,
            question:q.question,
            options:q.options
        };
    });
    res.json(quizQuestions);
});
//post route
app.post("/submit", (req, res) => {
    const answers = req.body;
    let score = 0;
    answers.forEach((answer) => {
        const question = questions.find(
          (q) => q.id === answer.id
        );
       if (question && question.answer === answer.selected) {
       score++;
}
    });
    res.json({
        score:score
    });
});
// Start Server(http://localhost:3000)
app.listen(3000, () => {
    console.log("Quiz app is running live on port 3000");
});