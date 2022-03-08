
const questionService = require("../services/question");

const questionController = {

    getListQuestions: async (req, res, next) => {
        try {
            const questions = await questionService.getListQuestions();
            res.render("index", { questions });
        } catch (err) {
            res.send("Something went wrong");
        }

    },

    addQuestion: async (req, res, next) => {
        try {
            const text = req.body.text;
            const answers = req.body.answers;
            const correctAnswer = req.body.correctAnswer;
            const index = answers.indexOf(correctAnswer);
            await questionService.addQuestion(text, answers, index);
            res.redirect("./list-questions");
        } catch (err) {
            res.send("Something went wrong");
        }
    },

    getDetailQuestion: async (req, res, next) => {
        try {
            const id = req.params.id;
            let question = await questionService.getDetailQuestion(id);
            res.cookie('correctAnswer', question.correctAnswer, {
                expires: new Date(Date.now() + 900000)
            });
            question.answers = question.answers.toObject();
            question = question.toObject();
            res.render("edit", { question });
        } catch (err) {
            res.send("Something went wrong");
        }
    },

    addQuestionForm: async (req, res, next) => {
        try {
            res.render("add");
        } catch (err) {
            res.send("Something went wrong");
        }
    },

    editQuestion: async (req, res, next) => {
        try {
            const id = req.params.id;
            const text = req.body.text;
            const answers = req.body.answers;
            const correctAnswer = req.body.correctAnswer;
            const index = answers.indexOf(correctAnswer);
            const question = await questionService.getDetailQuestion(id);
            if (!question) {
                return res.json("Not found the question");
            }
            await questionService.updateQuestion(id, text, answers, index);
            res.redirect("../list-questions");
        } catch (err) {
            res.send("Something went wrong");
        }
    },

    searchQuestion: async (req, res, next) => {
        try {
            const text = req.body.question;
            const questions = await questionService.searchQuestion(text);
            res.render("index", { questions });
        } catch (err) {
            res.send("Something went wrong");
        }
    },

    deleteQuestion: async (req, res, next) => {
        try {
            const id = req.params.id;
            const question = await questionService.getDetailQuestion(id);
            if(!question){
                return res.send("Not found the question");
            }
            await questionService.deleteQuestion(id);
            res.redirect("back");
        } catch (err) {
            res.send("Something went wrong");
        }
    }
}

module.exports = questionController;