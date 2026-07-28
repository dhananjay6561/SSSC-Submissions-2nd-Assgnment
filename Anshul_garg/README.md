# Quiz Application (MERN Stack - Assignment 2)

A simple, full-stack Quiz Application built using Node.js and Express on the backend, and React on the frontend. The application delivers questions one by one, accepts user selections, and evaluates final scores completely on the server side.

---

## 📌 Features

* **Server-Side Grading:** Answer evaluation occurs on the server to prevent exposing correct answers on the client side.
* **No Database Requirement:** Question data is stored and served in-memory directly from the backend server.
* **React Frontend :** Interactive UI created with React and Redux Toolkit for seamless navigation and state management.
* **Option Mapping:** Client maps option selections ("A", "B", "C", "D") dynamically before submitting to the backend.

---

## 📁 Project Structure

quiz-app/
├── server/                     # Backend Express Server
│   ├── controllers/
│   │   └── controller.js       # Route handlers (Server-side grading & hiding answers)
│   ├── router/
│   │   └── route.js            # Express API routes (/questions, /submit)     
│   ├── package.json
│   └── server.js               # Entry point (Runs on port 8080)
│
└── client/                     # Frontend React Application
    ├── src/
    │   ├── components/         # React components (Quiz, Questions, Result, etc.)
    │   ├── hooks/              # Custom hooks for API communication
    │   ├── redux/              # Redux store and slices
    │   └── App.js
    ├── package.json
    └── public/

---

## 🚀 Getting Started

### Prerequisites

Ensure you have Node.js (v16 or higher) and npm installed on your system.

---

### 1. Backend Setup (`server`)

1. Navigate into the backend directory:
   cd server

2. Install dependencies:
   npm install

3. Start the Express server:
   npm start

   The backend will run on http://localhost:8080.

---

### 2. Frontend Setup (`client`)

1. Open a new terminal tab and navigate into the frontend directory:
   cd client

2. Install dependencies:
   npm install

3. Start the React development server:
   npm start

   The React application will launch at http://localhost:3000.

---

## 📡 API Endpoints

### 1. GET /questions
* **Description:** Retrieves all questions and options. Strips out correct answers before responding to prevent frontend inspection.
* **Response:**
  [
    {
      "id": 1,
      "question": "What does HTML stand for?",
      "options": [
        "A. Hyper Text Markup Language",
        "B. High Tech Modern Language",
        "C. Hyper Transfer Markup Logic",
        "D. None of the above"
      ]
    }
  ]

### 2. POST /submit
* **Description:** Accepts user answers, evaluates score on the server side, and returns final results.
* **Request Body:**
  [
    { "id": 1, "selected": "A" },
    { "id": 2, "selected": "D" }
  ]
* **Response:**
  {
    "score": 5,
    "total": 5,
    "percentage": 100
  }

---

## 🛠️ Tech Stack

* **Frontend:** React, Redux Toolkit, React Router, CSS
* **Backend:** Node.js, Express.js, Cors, Morgan