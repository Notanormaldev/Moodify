const express = require('express')
const UserRoute = require('./Routes/auth.route')
const cookie = require('cookie-parser')
const cors = require('cors')
const Songroute = require('./Routes/song.route')

const app = express()
app.use(express.json())
app.use(cookie())
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
app.use('/api/auth',UserRoute)
app.use('/api/songs',Songroute)
module.exports = app

