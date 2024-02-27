const Question = require('../models/questionModel');
const Result = require('../models/resultModel');
const UserSchema = require('../models/usermodels');


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
            createdBy: req.user.id
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

const availableTests = async (req, res) => {
    try{
        const tests = await UserSchema.find({profileType: 'teacher'});

        const teachers = tests.map(test => {
            return {
                name: test.name,
                testId: test._id
            }
        });

        res.status(200).json({
            teachers,
            success: true
        });
    }catch(err){
        res.status(500).json({
            message: err.message,
            success: false
        })
    }
}

const getQuestion = async (req, res) => {

    const {testId} = req.body;
    console.log(req.body);
    try {
        const questions = await Question.find({createdBy: testId});

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
    const {score, maxScore} = req.body;

    if(!(req.user)){
        throw new Error('Login to add result');
    }

    try {
        if (!score || !maxScore) {
            throw new Error('All fields are required');
        }

        const result = new Result({
            score,
            maxScore,
            user:{
                name: req.user.name,
                email: req.user.email
            }
        });

        await result.save();

        res.status(201).json({
            message: 'Result created successfully',
            success: true,
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
    availableTests,
    addResult,
    showResult
}