const Redis = require('ioredis').default


const redis = new Redis({
    host:process.env.REDIS_HOST,
    port:process.env.REDIS_PORT,
    password:process.env.REDIS_PASSWORD
})


redis.on('connect',()=>{
    console.log("REDIS connect sucessfully");
})
redis.on('error',(error)=>{
    console.log(error);
    
})
module.exports = redis