let questions = [];
let currentQuestion = 0;
let answers = [];

fetch("/questions")
.then(response => response.json())
.then(data => {
    questions = data;
    displayQuestion();
});

const nextBtn = document.getElementById("next-btn");

nextBtn.addEventListener("click", () => {

    const selectedOption = document.querySelector(
        'input[name="answer"]:checked'
    );

    if (!selectedOption) {
        alert("Please select an answer.");
        return;
    }

    answers.push({
        id: questions[currentQuestion].id,
        answer: selectedOption.value
    });

    currentQuestion++;

    if (currentQuestion < questions.length) {
        displayQuestion();
    } else {
        nextBtn.style.display = "none";
        document.getElementById("submit-btn").style.display = "inline-block";
    }

});

const submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click", () => {

    fetch("/submit", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            answers: answers
        })

    })

    .then(response => response.json())

    .then(result => {

        document.getElementById("quiz-container").style.display = "none";

        submitBtn.style.display = "none";

       let percentage=((result.score/result.total)*100).toFixed(0);

document.getElementById("score").innerHTML=`
<h1>🎉 Quiz Completed!</h1>

<p>🏆 Score: <b>${result.score}/${result.total}</b></p>

<p>📊 Percentage: <b>${percentage}%</b></p>

<p>${percentage>=80 ? "🌟 Excellent!" :
percentage>=60 ? "👏 Good Job!" :
percentage>=40 ? "👍 Keep Practicing!" :
"📚 Practice More!"}</p>
`;
    });

});


function displayQuestion(){

    const quizContainer = document.getElementById("quiz-container");

    const question = questions[currentQuestion];

   let progress=((currentQuestion+1)/questions.length)*100;

let html=`
<div class="progress">
    <div class="progress-bar" style="width:${progress}%"></div>
</div>

<h3>📖 Question ${currentQuestion+1} of ${questions.length}</h3>

<h2>${question.question}</h2>
`;

    question.options.forEach(option =>{

        html += `
            <label>
                <input
                    type="radio"
                    name="answer"
                    value="${option.charAt(0)}"
                >
              ${option.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
            </label>
            <br><br>
        `;

    });

    quizContainer.innerHTML = html;

}