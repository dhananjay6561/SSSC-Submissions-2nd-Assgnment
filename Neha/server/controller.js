// Temporary storage 
let questions = [];
let results = [];


// Get questions
export async function getQuestions(req, res) {
    res.json({
        message: "Question API GET Request",
        data: questions
    });
}


// Store questions
export async function insertQuestions(req, res) {
    try {
        const { question, answers } = req.body;

        if (!question || !answers) {
            return res.status(400).json({
                message: "Question and answers are required"
            });
        }

        const newQuestion = {
            id: questions.length + 1,
            question,
            answers
        };

        questions.push(newQuestion);

        res.json({
            message: "Question saved successfully",
            data: newQuestion
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}


// Delete all questions
export async function dropQuestions(req, res) {
    try {
        questions = [];

        res.json({
            message: "Questions deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}


// Get results
export async function getResult(req, res) {
    try {
        res.json(results);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}


// Store result
export async function storeResult(req, res) {
    try {
        const { username, result, attempts, score } = req.body;

        const newResult = {
            id: results.length + 1,
            username,
            result,
            attempts,
            score
        };

        results.push(newResult);

        res.json({
            message: "Result saved successfully",
            data: newResult
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}


// Delete all results
export async function dropResult(req, res) {
    try {
        results = [];

        res.json({
            message: "Results deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}
