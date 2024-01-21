import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

cloudinary.config({
  cloud_name: process.env.COULDINARY_CLOUD_NAME,
  api_key: process.env.COULDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null

    // upload file on cloudinary server
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto',
    })

    // file uploaded successfully, log success
    console.log('response', response)
    
    return response
  } catch (error) {
    // remove temp locally uploaded file as the operation failed
    fs.unlinkSync(localFilePath)
  }
}

export { uploadOnCloudinary }