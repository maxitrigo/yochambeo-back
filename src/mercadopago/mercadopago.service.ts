import { Injectable } from '@nestjs/common';
import { MercadoPagoConfig, Payment, Preference, } from 'mercadopago'
import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class MercadoPagoService {
    constructor(
    ) {}

    async createOrder() {

        const client = new MercadoPagoConfig({
            accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN
        })

        const preference = new Preference(client)

        const result = await preference.create({
            body: {
                items: [
                    {
                        id: '1',
                        title: 'Job Post',
                        description: 'Job Posting',
                        quantity: 1,
                        currency_id: 'UYU',
                        unit_price: 100
                    }
                ],
                payment_methods: {
                    excluded_payment_types: [
                        {
                            id: 'ticket'
                        }
                    ],
                    installments: 1
                },
                back_urls: {
                    success: 'https://yochambeo.com/success',
                    failure: 'http://localhost:3000/failure',
                    pending: 'http://localhost:3000/pending'
                },
                auto_return: 'approved',
                
            }
        })

        

        const init_point = result.init_point;

        const token = jwt.sign({ init_point, auth: true }, process.env.JWT_SECRET, {expiresIn: '1h'});
        
        return { init_point: init_point, token: token };
    }


}
