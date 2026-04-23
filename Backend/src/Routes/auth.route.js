const {Router} = require('express')
const Authcontroller = require('../Controllers/auth.controller')


const UserRoute = Router()

UserRoute.post('/register',Authcontroller.register)
UserRoute.post('/login',Authcontroller.login)


module.exports = UserRoute