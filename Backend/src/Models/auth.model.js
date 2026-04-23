const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,'username required'],
        unique:[true,'username unique']
    },
    email:{
        type:String,
        required:[true,"email required"],
        unique:[true,"email unique"]
    },
    password:{
        type:String,
        required:[true,"password required"],
        select:false
    }

})

const usermodel = mongoose.model('users',userSchema)

module.exports = usermodel