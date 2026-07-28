let questions = [];
let currentQuestion = 0;
let answers = [];

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");
const resultEl = document.getElementById("result");

// Fetch questions from server
async function loadQuestions() {
  const response = await fetch("/questions");
  questions = await response.json();

  showQuestion();
}

// Display current question
function showQuestion() {
  optionsEl.innerHTML = "";

  const q = questions[currentQuestion];
  questionEl.textContent = q.question;

  q.options.forEach((option) => {
    const btn = document.createElement("button");

    btn.textContent = option;
    btn.className = "option";

    btn.onclick = () => {
      document
        .querySelectorAll(".option")
        .forEach((b) => b.classList.remove("selected"));

      btn.classList.add("selected");

      answers[currentQuestion] = {
        id: q.id,
        selected: option,
      };
    };

    optionsEl.appendChild(btn);
  });
}

// Next Button
nextBtn.addEventListener("click", () => {
  if (!answers[currentQuestion]) {
    alert("Please select an option!");
    return;
  }

  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    nextBtn.style.display = "none";
    submitBtn.style.display = "inline-block";
    questionEl.textContent = "Click Submit to finish the quiz.";
    optionsEl.innerHTML = "";
  }
});

// Submit Button
submitBtn.addEventListener("click", async () => {
  const response = await fetch("/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(answers),
  });

  const data = await response.json();

  resultEl.textContent = `🎉 Your Score: ${data.score} / ${questions.length}`;

  submitBtn.style.display = "none";
});

// Load questions when page opens
loadQuestions();