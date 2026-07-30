import express from "express";
import {getQuestions,insertQuestions,dropQuestions,getResult,storeResult,dropResult} from "./controller.js";

const router = express.Router();

router.get("/questions", getQuestions);
router.post("/questions", insertQuestions);
router.delete("/questions", dropQuestions);

router.get("/result", getResult);
router.post("/result", storeResult);
router.delete("/result", dropResult);

export default router;










