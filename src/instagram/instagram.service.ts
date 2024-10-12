import { Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import axios from 'axios';


@Injectable()
export class InstagramService {

    private readonly ig_user = process.env.IG_USER_ID
    private readonly access_token = process.env.IG_ACCESS_TOKEN

    private getRandomDelay(){
        return Math.floor(Math.random() * (10000 - 2000 + 1)) + 2000; //Delay entre 2 y 10 segundos
    }

    private async sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

    constructor( 
        private readonly cloudinary: CloudinaryService,
    ){}

    async postToInstagram(image: Express.Multer.File, caption: string) {
        try{

            const cloudinaryImage = await this.cloudinary.uploadImage(image); // Subir la imagen al Cloudinary
            const imageId = cloudinaryImage.public_id; // Guardamos el id de la imagen
            const imageLink = cloudinaryImage.secure_url; // Guardamos la url de la imagen
            

            //aca va la logica de envio a instagram
            //creamos el media container para subir la imagen
            const mediaContainer = await axios.post(`https://graph.facebook.com/${this.ig_user}/media`, {}, {
                params: {
                    image_url: imageLink, // URL de la imagen, debe ser publica 
                    caption: caption, // Texto de la imagen que se va a publicar
                    access_token: this.access_token // Token de acceso de la api de instagram
                },
            });

            //guardamos el id de la imagen que nos mandaron
            const creationId = mediaContainer.data.id;

            //subimos la imagen a la publicacion
            await axios.post(`https://graph.facebook.com/${this.ig_user}/media_publish`, {}, {
                params: {
                    creation_id: creationId,
                    access_token: this.access_token
                },
            });
            //aca termina la logica de instagram

            if(imageId){
                await this.cloudinary.deleteImage(imageId); // Eliminar la imagen del Cloudinary
            }


        } catch (error) {
            console.error('No se pudo subir la imagen:', error);
        }
    }

}