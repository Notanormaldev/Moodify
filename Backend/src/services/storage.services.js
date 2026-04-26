const { toFile } = require('@imagekit/nodejs')

const Imagekit = require('@imagekit/nodejs').default

const client = new Imagekit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY
})


async function uploadfile({buffer,filename,folder}){
    const file = await client.files.upload({
         file :await Imagekit.toFile(Buffer.from(buffer)),
         fileName:filename,
         folder:folder
    })
    return file
}

module.exports = {
    uploadfile
}