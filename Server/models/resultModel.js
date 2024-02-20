const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
    score: {
        type: Number,
        required: [true, "score is required"],
    },
    user: {
        default: null,
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }
})

module.exports = mongoose.model('Result', ResultSchema);