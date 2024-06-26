const cloudinary = require('cloudinary')
require('dotenv').config();


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

exports.uploads = (file, folder) => {
    console.log(file);
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(file, (result) => {
            resolve({
                url: result.url,
                id: result.public_id,
            })
        }, {
            rexource_type: "auto",
            folder: folder
        })
    })
}