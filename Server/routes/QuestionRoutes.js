const express = require('express')
const {addResult,addQuestion, getQuestion, showResult, availableTests} = require('../Controllers/QuestionsControllers')
const router = express.Router()
const jwtToken = require('../middleware/jwtToken')

router.post('/questions/add', jwtToken, addQuestion)
router.post('/questions/show', getQuestion)
// route to see available tests
router.get('/questions/availableTests', availableTests)
// route to see result
router.post('/questions/addResult', jwtToken, addResult)
router.get('/questions/result', jwtToken, showResult)

module.exports = router 