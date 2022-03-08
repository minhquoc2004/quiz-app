const express = require("express");
const router = express.Router();

const questionController = require("../controllers/question.controller");
const validator = require("../middleware/validate");

router.get("/list-questions", questionController.getListQuestions); // run this router first
//http://localhost:3001/question/list-questions
router.get("/add-question-form", questionController.addQuestionForm);
router.post("/add-question", validator, questionController.addQuestion);
router.get("/edit-question-form:id", questionController.getDetailQuestion);
router.put("/edit-question/:id", validator, questionController.editQuestion);
router.post("/search-question", questionController.searchQuestion);
router.delete("/delete-question/:id", questionController.deleteQuestion);

module.exports = router;