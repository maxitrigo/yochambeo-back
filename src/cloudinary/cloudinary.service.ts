import { Injectable } from "@nestjs/common";
import { v2, UploadApiResponse } from 'cloudinary';
import * as sharp from 'sharp';
import { Readable } from 'stream'
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class CloudinaryService {
    constructor() {
        v2.config({
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

        const resizedFile = await this.resizeImage(file); // Redimensionar la imagen y convertirla a jpg


        // Subir la imagen al Cloudinary
        return new Promise((resolve, reject) => {
            const upload = v2.uploader.upload_stream(
                { resource_type: 'auto' },
                (error, result) => {
                    if (error) {
                        console.error('Cloudinary upload error:', error); // Log del error
                        return reject(new Error(`Error uploading image: ${error.message}`));
                    }
                    resolve(result);
                }
            );
            
            this.bufferToStream(resizedFile.buffer).pipe(upload);
        });
    }

    async deleteImage(publicId: string): Promise<void> {
        return new Promise((resolve, reject) => {
            v2.uploader.destroy(publicId,(error, result) => {
                if (error) {
                    return reject(new Error(`Error deleting image: ${error.message}`));
                }
                resolve();
            });
        });
    }

    // Redimensionar la imagen y convertirla a jpg, devuelve un objeto Express.Multer.File con el buffer actualizado
    async resizeImage(file: Express.Multer.File): Promise<Express.Multer.File> {
        const buffer = await sharp(file.buffer)
            .resize({ width: 800, height: 800 })
            .jpeg({ quality: 80 })
            .toBuffer();
        return {
            ...file,
            buffer,
            size: buffer.length
        };
    }

    
}
