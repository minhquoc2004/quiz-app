const Question = require("../models/question");

const questionService = {

    getListQuestions: async () => {
        try {
            let questions = await Question.find();
            questions = questions.map((question) => {
                const obj = {
                    _id: question._id,
                    text: question.text,
                    answer: question.answers[question.correctAnswer]
                };
                return obj;
            });
            return questions;
        } catch (err) {
            return err;
        }
    },

    addQuestion: async (text, answers, correctAnswer) => {
        try {
            await Question.create({ text, answers, correctAnswer });
        } catch (err) {
            return err;
        }
    },

    getDetailQuestion: async (id) => {
        try {
            const question = await Question.findById(id);
            return question;
        } catch (err) {
            return err;
        }
    },

    updateQuestion: async (id, text, answers, index) => {
        try {
            await Question.updateOne({ _id: id }, { text, answers, correctAnswer: index });
        } catch (err) {
            return err;
        }
    },

    searchQuestion: async (text) => {
        try {
            let questions = await Question.find({
                text: {
                    $regex: text,
                    $options: "i"
                }
            });
            questions = questions.map((question) => {
                const obj = {
                    _id: question._id,
                    text: question.text,
                    answer: question.answers[question.correctAnswer]
                };
                return obj;
            });
            return questions;
        } catch (err) {
            return err;
        }
    },

    deleteQuestion: async (id) => {
        try {
            await Question.deleteOne({_id: id});
        }catch(err){
            return err;
        }
    }
}

module.exports = questionService;