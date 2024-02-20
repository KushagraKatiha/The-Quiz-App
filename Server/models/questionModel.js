const mongoose = require('mongoose')
const QuestionSchema = new mongoose.Schema({
    questionText: String, 
    option: [String],
    correctOption: Number,
    createdBy: {
        default: null,
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
})

module.exports = mongoose.model('Question', QuestionSchema)