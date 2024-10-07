import { Controller, Post, Body, Get, Req, Res, Query } from '@nestjs/common';
import { MercadoPagoService } from './mercadopago.service';

@Controller('mercadopago')
export class MercadoPagoController {
    constructor(private readonly mercadoPagoService: MercadoPagoService) {}

    @Post('create-preference')
    async createPreference() {
        return this.mercadoPagoService.createOrder();
    }

    // @Post('webhook')
    // async recieveWebhook(@Query() query, @Res() res) {
    //     // Llama al servicio y guarda el resultado.
    //     const result = await this.mercadoPagoService.recieveWebhook(query);
        
    //     // Devuelve el resultado y un código de estado 200.
    //     return res.status(200).send(result); // Envía el resultado obtenido del servicio
    // }
}
