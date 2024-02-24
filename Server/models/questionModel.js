const mongoose = require('mongoose')
const QuestionSchema = new mongoose.Schema({
    questionText: String, 
    option: [String],
    correctOption: Number,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usermodels'
    },
})

module.exports = mongoose.model('Question', QuestionSchema)