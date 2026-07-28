# Quiz App
A simple Quiz Application built using **Node.js, Express, HTML, CSS, and JavaScript**.
## Features
* Fetches quiz questions from the backend
* Prevents moving to the next question without selecting an answer
* Displays one question at a time
* Highlights the selected option
* Correct answers are **not visible** in the browser, even if the user opens **Inspect** or **View Page Source**
* Calculates the score on the server
* Displays the final score after quiz submission

## Technologies Used

* HTML
* CSS
* JavaScript
* Node.js
* Express.js

## Project Structure

```text
quiz-app/
├── public/
│   ├── index.html
│   ├── script.js
│   └── style.css
├── package-lock.json
├── package.json
├──README.md
└──server.js
```

## How to Run

Install the dependencies:

```bash
npm install
```

Start the server:

```bash
node server.js
```

Open the app in your browser:

```text
http://localhost:3000
```

## API Endpoints

### GET /questions
Returns all quiz questions with their options. The correct answers are not sent to the frontend.

### Example 
```json
[
  {
    "id": 1,
    "question": "What does JSX stand for?",
    "options": [
      "A. Java Syntax Extension",
      "B. JavaScript XML",
      "C. JavaScript Extension",
      "D. JSON Syntax Extension"
    ]
  }
]
```

### POST /submit
Accepts an array of user answers and returns the final score.
### Example

```json
[
  { "id": 1, "selected": "B" },
  { "id": 2, "selected": "C" }
]
```
### Score shown

```json
{
  "score": 2
}
```
## Author

**Dristi Agarwal**

