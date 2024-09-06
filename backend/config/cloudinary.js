import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

// Upload file to Cloudinary using buffer
const uploadOnCloudinary = async (fileBuffer) => {
    try {
        if (!fileBuffer) return null;

        // Uploading file from buffer
        const response = await cloudinary.uploader.upload_stream(
            { resource_type: 'auto' },
            (error, result) => {
                if (error) {
                    throw error;
                }
                return result;
            }
        ).end(fileBuffer); // End the stream with the file buffer

        // File has been uploaded
        console.log("File is uploaded", response.url);
        return response;
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        return null;
    }
}

export { uploadOnCloudinary };
export default cloudinary;
