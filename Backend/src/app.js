const express = require('express')
const UserRoute = require('./Routes/auth.route')


const app = express()
app.use(express.json())
app.use('/api/auth',UserRoute)
module.exports = app

