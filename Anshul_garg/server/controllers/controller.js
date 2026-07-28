
const questions = [
    {
        id: 1,
        question: "What does HTML stand for?",
        options: [
            "A. Hyper Text Markup Language",
            "B. High Tech Modern Language",
            "C. Hyper Transfer Markup Logic",
            "D. None of the above"
        ],
        answer: "A"
    },
    {
        id: 2,
        question: "Which language runs in a web browser?",
        options: [
            "A. Java",
            "B. C",
            "C. Python",
            "D. JavaScript"
        ],
        answer: "D"
    },
    {
        id: 3,
        question: "What does CSS stand for?",
        options: [
            "A. Central Style Sheets",
            "B. Cascading Style Sheets",
            "C. Cascading Simple Sheets",
            "D. Cars SUVs Sailboats"
        ],
        answer: "B"
    },
    {
        id: 4,
        question: "Which HTML tag is used to define an internal style sheet?",
        options: [
            "A. <script>",
            "B. <css>",
            "C. <style>",
            "D. <link>"
        ],
        answer: "C"
    },
    {
        id: 5,
        question: "Which character is used to indicate an end tag in HTML?",
        options: [
            "A. *",
            "B. /",
            "C. <",
            "D. ^"
        ],
        answer: "B"
    }
];


export async function getQuestions(req, res) {
    try {
        const safeQuestions = questions.map(({ answer, ...rest }) => rest);
        res.json(safeQuestions);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch questions" });
    }
}

export async function submitAnswers(req, res) {
    try {
        const userAnswers = req.body; 
        let score = 0;

        if (!Array.isArray(userAnswers)) {
            return res.status(400).json({ error: "Invalid body format. Expected an array." });
        }

        userAnswers.forEach(item => {
            const question = questions.find(q => q.id === item.id);
            if (question && question.answer === item.selected) {
                score += 1;
            }
        });

        res.json({
            score,
            total: questions.length,
            percentage: (score / questions.length) * 100
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to calculate score" });
    }
}