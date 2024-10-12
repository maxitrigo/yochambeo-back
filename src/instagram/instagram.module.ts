import { Module } from '@nestjs/common';
import { InstagramService } from './instagram.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';


@Module({
    imports: [CloudinaryModule],
    controllers: [],
    providers: [InstagramService],
    exports: [InstagramService]
})
export class InstagramModule {};