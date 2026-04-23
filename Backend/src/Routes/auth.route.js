const {Router} = require('express')
const Authcontroller = require('../Controllers/auth.controller')
const authuser = require('../Middleware/auth.middleware')


const UserRoute = Router()

UserRoute.post('/register',Authcontroller.register)
UserRoute.post('/login',Authcontroller.login)
UserRoute.get('/get-me',authuser,Authcontroller.getme)
UserRoute.get('/logout',authuser,Authcontroller.logout)
module.exports = UserRoute