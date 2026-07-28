Full-Stack Quiz App
I built this full-stack quiz application using a Node.js and Express backend, paired with a React frontend. The primary goal of this project was to handle all answer validation securely on the server without relying on a database.

-Tech Stack

Backend: Node.js, Express.js, also utilizing express.json() and cors middleware.

Frontend: React.js (located in the client/ folder) and HTML/CSS/JS (served from the public/ folder).

-What I Learned

Full-Stack Integration: How to build a complete application using a Node.js/Express backend paired with a React frontend.


Server-Side Validation: The importance of handling answer checking strictly on the backend Express server, ensuring that correct answers are never exposed to the frontend.


API Routing: Creating custom GET and POST routes to fetch questions and submit data back to the server.


Middleware Configuration: Setting up express.json() to read POST request bodies , and installing cors so the React app can successfully communicate with the backend API.


Using express.static() to serve plain HTML, CSS, and JS files directly from a public folder.


Frontend Data Fetching: Calling backend API routes using the fetch() function to send and receive data.


Running two separate development servers (frontend and backend) simultaneously in the terminal.


Debugging Connections: Troubleshooting URL mismatches (like local network IPs vs. localhost) to ensure proper frontend-to-backend communication.