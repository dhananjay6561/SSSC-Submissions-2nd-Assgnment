const express=require("express");
const app=express();
const PORT = process.env.PORT ||3000;
app.use(express.json());
app.use(express.static("public"));

const questions=[{
    id:1,
    question: "What does  XML stand for?",
    options: [
        "A. eXtensible Markup Language",
        "B. eXecutable Multiple Language",
        "C. eXtra Multi-Program Language",
        "D. eXamine Multiple Language"
    ],
    answer: "A"
},
{ 
    id: 2,
    question: "Which of these is a javascript runtime?",
    options: [
        "A. Node.js",
        "B. React.js",
        "C. Next.js",
        "D. Express.js"
    ],
    answer: "A"
},
{
    id: 3,
    question: "Which one is the framework and not the library?",
    options: [
        "A. node.js",
        "B. React.js",
        "C. Next.js",
        "D. HTML"
    ],
    answer: "C"
},
{
    id: 4,
    question: "What does SSR stand for?",
    options: [
        "A. Server Side Rendering",
        "B. Server Side React",
        "C. Server Side Routing",
        "D. Server Side Request"
    ],
    answer: "A"
},
{
    id: 5,
    question: "What is the main difference between SSR and CSR?",
    options: [
        "A. SSR is faster than CSR",
        "B. SSR renders on the server, CSR renders on the client",
        "C. CSR is more secure than SSR",
        "D. SSR uses less memory than CSR"
    ],
    answer: "B"
}
];

app.get("/questions",(req,res)=>{
    const questionWithoutAnswers=questions.map((q)=>{
        return{
            id: q.id,
            question:q.question,
            options:q.options
        };
    });
    res.json(questionWithoutAnswers);
});

app.post("/submit",(req,res)=>{
    const userAnswers=req.body;

    console.log("user answers:",userAnswers);
    let score=0;
    userAnswers.forEach((userAnswer)=>{
        const question=questions.find(
            q=>q.id===Number(userAnswer.id)
        );

        console.log("Question:", question);
        console.log("Selected:", userAnswer.selected);


        if (question&&question.answer===userAnswer.selected){
            score++;
        }
    });
    res.json({
        score: score,
        total: questions.length
    });
    
})

app.listen(PORT,()=>{
    console.log(`server running at http://localhost:${PORT}`);
});