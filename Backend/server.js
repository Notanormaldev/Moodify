require('dotenv').config()
const app = require('./src/app');
const contectDB = require('./src/config/database');

contectDB()
app.listen(3000,()=>{
    console.log('Running on 3000 port');
})
