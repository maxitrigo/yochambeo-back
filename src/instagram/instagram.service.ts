import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { IgApiClient } from 'instagram-private-api';
import * as fs from 'fs';

dotenv.config();

@Injectable()
export class InstagramService {
    private ig: IgApiClient;

    constructor() {
        this.ig = new IgApiClient();
    }

    async postToInstagram(file: Express.Multer.File, caption: string) {
        await this.loadSession(); // Cargar sesión antes de iniciar la publicación

        let attempts = 10; // Número de intentos permitidos

        while (attempts > 0) {
            console.log('Iniciando sesión...');

            try {
                // Verifica si el usuario está logueado
                await this.ig.account.currentUser();
                console.log('Sesión activa, publicando imagen...');

                const imageBuffer = file.buffer;
                
                const imageUpload = await this.ig.publish.photo({
                    file: imageBuffer,
                    caption: `${caption} entra a nuestra web, (https://yochambeo.com) para ver mas publicaciones como esta`,
                });

                return imageUpload; // Retorna el resultado si se publica correctamente
            } catch (error) {
                console.error('Error en la subida de la imagen:', error);

                if (error.name === 'IgCheckpointError') {
                    console.log('Checkpoint requerido. Resuelve el desafío manualmente.');
                    await this.handleCheckpoint();
                } else {
                    attempts--; // Disminuir el número de intentos
                    console.log(`Intentando de nuevo... (${10 - attempts})`);
        
                    // Lanzar excepción si ya no quedan más intentos
                    if (attempts === 0) {
                        throw new InternalServerErrorException('No se pudo publicar la imagen después de varios intentos.');
                    }
                }
            }
        }
    }

    private async loadSession() {
        try {
            // Genera un dispositivo
            this.ig.state.generateDevice(process.env.IG_USERNAME);
        
            // Carga la sesión desde el archivo
            const sessionData = fs.readFileSync('session.json', 'utf8');
            this.ig.state.deserialize(JSON.parse(sessionData));
        
            // Verifica si la sesión es válida
            await this.ig.account.currentUser();
            console.log('Sesión cargada correctamente.');
        } catch (error) {
            console.error('Error al cargar la sesión:', error);
            // Opcional: Puedes intentar iniciar sesión nuevamente si la carga falla
            await this.login();
        }
    }

    private async login() {
        try {
            await this.ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
            // Guardar cookies después de iniciar sesión exitosamente
            fs.writeFileSync('session.json', JSON.stringify(this.ig.state.serialize()));
            console.log('Sesión guardada.');
        } catch (error) {
            console.error('Error de autenticación con Instagram:', error);
        }
    }

    private async handleCheckpoint() {
        const challengeState = await this.ig.challenge.state();
        console.log('Estado del desafío (Challenge State):', challengeState);

        // Verificar si el desafío está cerrado
        if (challengeState.action === 'close' && challengeState.status === 'ok') {
            console.log('El desafío ha sido cerrado o ya está resuelto. Continuando sin errores.');
            return; // Salir sin lanzar ningún error
        }

        // Intentar resolver automáticamente si es posible
        const { step_name } = await this.ig.challenge.auto(true);

        if (step_name === 'verify_code') {
            console.log('Envía el código de verificación.');
        } else {
            console.log('Otro tipo de desafío:', step_name);
        }
    }
}
