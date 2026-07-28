# Quiz App

#Live working app: https://quiz-app-dev.onrender.com/

A simple full-stack Quiz Application built using **Node.js**, **Express.js**, and **Vanilla JavaScript**. The application presents quiz questions one at a time, records user responses, evaluates answers securely on the server, and displays the final score with an interactive UI.

## ✨ Features

- Displays one question at a time
- Multiple-choice questions
- Next and Submit navigation
- Progress bar to track quiz completion
- Server-side answer validation
- Final score card with feedback message
- Play Again functionality
- Responsive and modern UI

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Communication:** Fetch API (REST APIs)

## 📂 Project Structure

```
quiz-app/
│── public/
│   ├── index.html
│   ├── style.css
│
│── server.js
│── package.json
│── README.md
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/quiz-app.git
```

### 2. Navigate to the project folder

```bash
cd quiz-app
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the server

```bash
node server.js
```

### 5. Open in your browser

```
http://localhost:3000
```

## 📌 API Endpoints

### GET `/questions`

Returns all quiz questions and options without exposing the correct answers.

Example Response:

```json
[
  {
    id:1,
    question: "What does  XML stand for?",
    options: [
        "A. eXtensible Markup Language",
        "B. eXecutable Multiple Language",
        "C. eXtra Multi-Program Language",
        "D. eXamine Multiple Language"
    ]
  }
]
```

---

### POST `/submit`

Accepts user responses, evaluates answers on the server, and returns the final score.

Example Request:

```json
[
  {
    "id": 1,
    "selected": "A"
  },
  {
    "id": 2,
    "selected": "C"
  }
]
```

Example Response:

```json
{
  "score": 4,
  "total": 5
}
```

## 🌟 Future Improvements

## Future Improvements

- Add **Previous** button and question navigation.
- Implement a **question palette** with statuses (Answered, Not Answered, Marked for Review).
- Confetti animation for high scores
- Allow users to review answers before submission with a confirmation popup.
- Display detailed results showing correct/incorrect answers and performance statistics.
- Add a timer, randomized questions, and multiple difficulty levels.
- Store user scores and quiz history using a database.
- Implement user authentication and a leaderboard.

## 👩‍💻 Author

**Shruti Gupta**
