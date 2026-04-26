const {Router} = require('express')
const songcontroller = require('../Controllers/song.controller')
const upload = require('../Middleware/upload.middleware')


const Songroute = Router()
Songroute.post('/',upload.single('song'),songcontroller.postsong)
Songroute.get('/',songcontroller.getsong)

module.exports = Songroute