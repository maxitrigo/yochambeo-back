import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateJobDto {


    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    location: string;

    @IsString()
    @IsNotEmpty()
    company: string;

    @IsString()
    @IsNotEmpty()
    salary: string;
    
    @IsString()
    @IsNotEmpty()
    requirements: string;

    @IsString()
    phone: string;

    @IsString()
    email: string;

    @IsString()
    website: string;


    imgUrl: string;


    imgId: string

}