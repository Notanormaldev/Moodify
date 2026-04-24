const usermodel = require("../Models/auth.model")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const blacklistmodel = require("../Models/blacklist.model")
const redis = require("../config/cache")


async function register(req,res){
      const {username,email,password}=req.body
      
      const alreadyexist = await usermodel.findOne({
        $or:[
            {email},
            {username}
        ]
      })
      

      if(alreadyexist){
        return res.status(400).json({
            msg:"user already exist"
        })
      }
     
    const hash = await bcrypt.hash(password,10)


     const user = await usermodel.create({
        username,
        email,
        password:hash
     })  


     const token = jwt.sign({
        id:user._id,
        username:user.username
     },process.env.JWT,{expiresIn:'1h'})


    res.cookie('token',token)

    return res.status(200).json({
        msg:'user created',
        username:user.username,
        email:user.email
    })
}
async function login(req,res){
  const {username,email,password}=req.body

  const user = await usermodel.findOne({
    $or:[
        {email},
        {username}
    ]
  }).select("+password")

  if(!user){
    return res.status(400).json({
        msg:"Invalid creditnals"
    })
  }

  const checkpass = await bcrypt.compare(password,user.password)

  if(!checkpass){
    return res.status(400).json({
        msg:"Invlaid creditnals"
    })
  }
  

  const token = jwt.sign({
    id:user._id,
    username:user.username
  },process.env.JWt,{
    expiresIn:"1h"
  })
  res.cookie('token',token)

  return res.status(200).json(
    {
        msg:"login sucess",
        username:user.username,
        email:user.email
    }
  )

}
async function getme(req,res){
    const userid = req.user.id

    const user = await usermodel.findById(userid)
   return res.status(200).json({
    msg:"get me sucess",
    user
   })
}
async function logout(req,res){
  const token = req.cookies.token
  
  res.clearCookie('token')

  // await blacklistmodel.create({
    // token
  // })

  await redis.set(token,Date.now().toString(),'EX',60*60)
  

  return res.status(200).json({
    msg:"Logout sucess fully"
  })
}


module.exports = {
    register,login,getme,logout
}