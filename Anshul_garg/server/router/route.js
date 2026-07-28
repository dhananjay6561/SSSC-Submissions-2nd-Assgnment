import { Router } from "express";
const router= Router()

import * as controller from '../controllers/controller.js';


router.get('/questions', controller.getQuestions);
router.post('/submit', controller.submitAnswers);

export default router;