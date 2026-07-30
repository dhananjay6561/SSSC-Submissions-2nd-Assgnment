import express from "express";
import cors from "cors";
import morgan from "morgan";
import { config } from "dotenv";
import router from "./route.js";

config();

const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server Working");
});

app.get("/api", (req, res) => {
    res.send("API Working");
});

app.use("/api", router);

console.log("Router loaded");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});