const id3 = require('node-id3');
const { uploadfile } = require('../services/storage.services');
const songmodel = require('../Models/song.model');

async function postsong(req,res){
   const {mood} = req.body
   const tag = id3.read(req.file.buffer)
  console.log(tag.title)
  console.log(tag.image.imageBuffer);
  console.log(req.file.buffer);


//   const songfile = await uploadfile({
//     buffer:req.file.buffer,
//     filename:tag.title +"mp3",
//     folder:'/cohort-2/moodify/songs'
//   })
//   const imgfile = await uploadfile({
//     buffer:tag.image.imageBuffer,
//     filename:tag.title + "jpeg",
//     folder:'/cohort-2/moodify/photos'
//   })

const [songfile,imgfile] = await Promise.all([
 uploadfile({
        buffer:req.file.buffer,
        filename:tag.title +"mp3",
        folder:'/cohort-2/moodify/songs'
    }),
   uploadfile({
        buffer:tag.image.imageBuffer,
        filename:tag.title +"jpeg",
        folder:"/cohort-2/moodify/photos"
    })
])
  
  const song = await songmodel.create({
    posturl:imgfile.url,
    songurl:songfile.url,
    title:tag.title,
    mood:mood,
  })

  return  res.status(200).json({
    msg:"song done",
    song
  })
   
}

async function getsong(req,res){
    const {mood} = req.query

    const song = await songmodel.aggregate([
        {$match:{mood}},
        {$sample:{size:1}}
    ])

    return res.status(200).json({
        msg:"sucessfully fetchced",
        song
    })
}

module.exports = {
    postsong , getsong
}