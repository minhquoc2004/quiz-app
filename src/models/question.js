const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const Question = new Schema({
    text: {
        type: String,
        required: true
    },
    answers: {
        type: Array,
        required: true
    },
    correctAnswer: {
        type: Number,
        required: true
    }
});

Question.index({text: 'text'})

module.exports = mongoose.model("Question", Question);