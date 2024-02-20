const express = require('express')
const {addResult,addQuestion, getQuestion, showResult} = require('../Controllers/QuestionsControllers')
const router = express.Router()

router.post('/questions/add', addQuestion)
router.get('/questions/show', getQuestion)
// route to see result
router.post('/questions/addResult', addResult)
router.get('/questions/result', showResult)

module.exports = router 