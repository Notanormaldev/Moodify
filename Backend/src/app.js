const express = require('express')
const UserRoute = require('./Routes/auth.route')
const cookie = require('cookie-parser')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cookie())
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
app.use('/api/auth',UserRoute)
module.exports = app

