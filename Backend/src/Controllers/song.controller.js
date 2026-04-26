const id3 = require('node-id3')

async function postsong(req,res){
   console.log(req.file);
   const tag = id3.read(req.file.buffer)
   console.log(tag);
   
}



module.exports = {
    postsong
}