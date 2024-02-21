require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const questionRouter = require('./routes/QuestionRoutes')
const userRouter = require('./routes/UserRoutes')
const cors = require('cors')
const dbconnection = require('./Config/dbconection')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
dbconnection()
app.use('/',questionRouter)
app.use('/', userRouter)

module.exports = app

