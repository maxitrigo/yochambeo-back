import { Injectable } from "@nestjs/common";
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { Readable } from 'stream'
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class CloudinaryService {
    constructor() {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });
    }

    bufferToStream(buffer: Buffer): Readable {
        const readable = new Readable();
        readable.push(buffer);
        readable.push(null); // Señal de que no hay más datos
        return readable;
    }

    async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
        return new Promise((resolve, reject) => {
            const upload = cloudinary.uploader.upload_stream(
                { resource_type: 'auto' },
                (error, result) => {
                    if (error) {
                        console.error('Cloudinary upload error:', error); // Log del error
                        return reject(new Error(`Error uploading image: ${error.message}`));
                    }
                    resolve(result);
                }
            );
    
            this.bufferToStream(file.buffer).pipe(upload);
        });
    }

    async deleteImage(publicId: string): Promise<void> {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.destroy(publicId, (error, result) => {
                if (error) {
                    return reject(new Error(`Error deleting image: ${error.message}`));
                }
                resolve();
            });
        });
    }
}
