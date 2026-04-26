const mongoose = require('mongoose')

const songSchema = mongoose.Schema({
    songurl:{
        type:String,
        required:true
    },
    posturl:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    mood:{
        type:String,
        enum:{
            values:["happy","sad","surprised","natural"],
            message:"invalid mood"
        }
    }
})

const songmodel = mongoose.model('songs',songSchema)

module.exports = songmodel

