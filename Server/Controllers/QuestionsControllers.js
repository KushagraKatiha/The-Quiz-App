const Question = require('../models/questionModel');
const Result = require('../models/resultModel');

const addQuestion = async (req, res) => {
    const {questionText, option, correctOption} = req.body;

    try {
        if (!questionText || !option || !correctOption) {
            throw new Error('All fields are required, something is missing');
        }

        const question = new Question({
            questionText,
            option,
            correctOption,
            createdBy: req.user._id
        });

        await question.save();

        res.status(201).json({
            message: 'Question created successfully',
            success: true
        });

    } catch (err) {
        res.status(400).json({
            message: err.message,
            success: false
        });
    }
}

const getQuestion = async (req, res) => {
    try {
        const questions = await Question.find({});

        res.status(200).json({
            questions,
            success: true
        });

    } catch (err) {
        res.status(500).json({
            message: err.message,
            success: false
        });
    }
}

// Result Schema Controllers

const addResult = async (req, res) => {
    const {score} = req.body;

    try {
        if (!score) {
            throw new Error('All fields are required');
        }

        const result = new Result({
            score,
            user: req.user._id
        });

        await result.save();

        res.status(201).json({
            message: 'Result created successfully',
            success: true
        });

    } catch (err) {
        res.status(400).json({
            message: err.message,
            success: false
        });
    }
}

const showResult = async (req, res) => {
    try {
        const results = await Result.find({});

        res.status(200).json({
            results,
            success: true
        });

    } catch (err) {
        res.status(500).json({
            message: err.message,
            success: false
        });
    }
}

module.exports = {
    addQuestion,
    getQuestion,
    addResult,
    showResult
}