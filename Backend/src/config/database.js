const mongoose = require('mongoose')


const contectDB=()=>{
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log('DATABASE CONNECTED'); 
    })
}

module.exports = contectDB