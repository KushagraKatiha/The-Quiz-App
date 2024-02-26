const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
    score: {
        type: Number,
        required: [true, "score is required"],
    },
    maxScore: {
        type: Number,
        required: [true, "full score is required"],
    },
    user: {
        name: String,
        email: String
    }
}, { timestamps: true })

module.exports = mongoose.model('Result', ResultSchema);