const cloudinary = require('cloudinary').v2
const cloudinaryConfig = require('../config/config').cloudinary
cloudinary.config(cloudinaryConfig)

const uploadImage = async (imagePath, folder) => {
  const imageUploaded = await cloudinary.uploader.upload(imagePath,
    {
      resource_type: 'image',
      folder: folder,
      gravity: 'east',
      crop: 'scale',
      overwrite: true
    })
  return imageUploaded
}

const removeMedia = async (publicId, type) => {
  return await cloudinary.uploader.destroy(publicId, { resource_type: type })
}

module.exports = { cloudinary, uploadImage, removeMedia }