const mongoose = require('mongoose')


const blacklistschema = mongoose.Schema({
    token:{
        type:String,
        required:[true,"token required"]
    }
},{
    timestamps:true
})


const blacklistmodel = mongoose.model('blacklisttoken',blacklistschema)
module.exports = blacklistmodel