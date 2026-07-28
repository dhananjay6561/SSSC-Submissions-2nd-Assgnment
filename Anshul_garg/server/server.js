import express from "express";
import morgan from "morgan";
import cors from 'cors';
import { config } from "dotenv";
import router from "./router/route.js";

config();
const app=express();

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 8080;

app.use('/',router);

app.get('/', (req,res)=>{
    try {
        res.json("Quiz App Backend Running")
    } catch (error) {
        res.json(error)
    }
})

app.listen(PORT, () => {
    console.log(`Server is running and listening on http://localhost:${PORT}`);
});