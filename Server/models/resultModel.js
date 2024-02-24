const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
    score: {
        type: Number,
        required: [true, "score is required"],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'usermodels'
    }
}, { timestamps: true })

module.exports = mongoose.model('Result', ResultSchema);