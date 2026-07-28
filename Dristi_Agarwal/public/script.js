let questions = [];
let currentQuestion = 0;
let answers = [];
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("nextButton");
const submitButton = document.getElementById("submitButton");
async function loadQuestions() {
    const response = await fetch("/questions");
    questions = await response.json();
    console.log(questions);
    showQuestion();
}
//show question
function showQuestion() {
    const current = questions[currentQuestion];
    questionElement.textContent = current.question;
    optionsElement.innerHTML = "";
    current.options.forEach((option) => {
        const button = document.createElement("button");
        button.textContent = option;
       button.addEventListener("click", () => {
    const buttons = optionsElement.children;
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.background = "#f7f3ff";
        buttons[i].style.color = "#333";
    }
    // Selected option
    button.style.background = "#26ce21";
    button.style.color = "white";
    answers[currentQuestion] = {
        id: current.id,
        selected: option.charAt(0)
    };
    console.log(answers);
});
optionsElement.appendChild(button);
    });
    //Last question
    if(currentQuestion === questions.length-1){
    nextButton.style.display="none";
    submitButton.style.display="block";
}
else{
    nextButton.style.display="block";
    submitButton.style.display="none";
}
}
//Next button
nextButton.addEventListener("click", () => {
    if(!answers[currentQuestion]){
    alert("Please select an answer");
    return;
}
    if(currentQuestion < questions.length-1){
        currentQuestion++;
        showQuestion();
    }
});
//submit button
submitButton.addEventListener("click", async()=>{
    const response = await fetch("/submit",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(answers)
    });
    const data = await response.json();
    document.getElementById("result").textContent =
    `Your Score: ${data.score}/${questions.length}`;
    submitButton.style.display="none";
});
loadQuestions();