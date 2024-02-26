const mongoose = require('mongoose')
const QuestionSchema = new mongoose.Schema({
    questionText: String,
    option: [String],
    correctOption: Number,
    createdBy: String,
})

module.exports = mongoose.model('Question', QuestionSchema)