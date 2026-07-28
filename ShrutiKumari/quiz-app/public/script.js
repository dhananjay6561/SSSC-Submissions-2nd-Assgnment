let questions = [];
let currentQuestion = 0;
let answers = {};
let user = {
    name: "",
    email: ""
};

const loginForm = document.getElementById("loginForm");
const loginPage = document.getElementById("loginPage");
const quizPage = document.getElementById("quizPage");
const resultPage = document.getElementById("resultPage");
const username = document.getElementById("username");
const questionNumber = document.getElementById("questionNumber");
const questionText = document.getElementById("questionText");
const options = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const previousBtn = document.getElementById("previousBtn");
const submitBtn = document.getElementById("submitBtn");

loginForm.addEventListener("submit", function(e){
    e.preventDefault();
    user.name = document.getElementById("name").value;
    user.email = document.getElementById("email").value;
    if(user.name === "" || user.email === "" || !user.email.includes("@gmail.com")){
        alert("Please fill the details correctly");
        return;
    }
    fetch("/questions")
    .then(res => res.json())
    .then(data => {
        questions = data;
        loginPage.style.display = "none";
        quizPage.style.display = "block";
        username.innerText = user.name;
        showQuestion();
    });
});

function showQuestion(){
    let q = questions[currentQuestion];
    questionNumber.innerText =
    "Question " + (currentQuestion + 1) + " / " + questions.length;
    questionText.innerText = q.question;
    options.innerHTML = "";
    q.options.forEach(option => {
        let div = document.createElement("div");
        let radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "answer";
        radio.value = option;
        if(answers[q.id] === option){
            radio.checked = true;
        }
        radio.addEventListener("change",function(){
            answers[q.id] = option;
        });
        div.appendChild(radio);
        div.append(option);
        options.appendChild(div);
    });
}
nextBtn.addEventListener("click",function(){
    if(currentQuestion < questions.length - 1){
        currentQuestion++;
        showQuestion();
    }
});
previousBtn.addEventListener("click",function(){
    if(currentQuestion > 0){
        currentQuestion--;
        showQuestion();
    }
});
submitBtn.addEventListener("click",function(){
    fetch("/submit",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            answers:answers
        })
    })
    .then(res=>res.json())
    .then(data=>{
        quizPage.style.display="none";
        resultPage.style.display="block";
        document.getElementById("resultName").innerText =
        "Name: " + user.name;
        document.getElementById("resultEmail").innerText =
        "Email: " + user.email;
        document.getElementById("score").innerText =
        "Score: " + data.score + "/" + data.total;

    });
});
