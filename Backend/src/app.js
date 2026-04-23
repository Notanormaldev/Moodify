const express = require('express')
const UserRoute = require('./Routes/auth.route')
const cookie = require('cookie-parser')


const app = express()
app.use(express.json())
app.use(cookie())
app.use('/api/auth',UserRoute)
module.exports = app

