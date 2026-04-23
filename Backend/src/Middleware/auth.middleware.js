const jwt = require('jsonwebtoken')
const blacklistmodel = require('../Models/blacklist.model')

async function authuser(req,res,next){
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            msg:" token not provided"
        })
    }
   
    const istokenblacklist = await blacklistmodel.findOne({
        token
    })

    if(istokenblacklist){
        return res.status(400).json({
            msg:"acesss deined"
        })
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT)
        req.user = decoded
        next()
    } catch (error) {
        throw error
    }
}

module.exports = authuser