import { Module } from '@nestjs/common';
import { InstagramService } from './instagram.service';


@Module({
    controllers: [],
    providers: [InstagramService],
    exports: [InstagramService]
})
export class InstagramModule {};