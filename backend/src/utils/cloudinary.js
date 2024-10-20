import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// Function to upload a large PDF using streams
const uploadLargePDF = (filePath, cloudPath) => {
return new Promise((resolve, reject) => {
    const fileStream = fs.createReadStream(filePath);  // Read the file as a stream

    cloudinary.uploader.upload_stream(
    { resource_type: 'raw', folder: cloudPath },  // Ensure resource_type is 'raw' for non-image files
    (error, result) => {
        if (error) {
        reject(error);
        } else {
        resolve(result);
        }
    }
    ).end(fileStream);  // Pipe the stream directly to Cloudinary
});
};


const uploadOnCloudinary = async(localFilePath, cloudPath) => {
    try {
        if(!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'raw', folder: cloudPath
        })

        fs.unlinkSync(localFilePath)
        return response;
    } catch (error) {
        // console.log("controll react here", error);
        fs.unlinkSync(localFilePath)
        return null;
    }
}

export { 
    uploadOnCloudinary,
    uploadLargePDF
}