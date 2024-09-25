import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateJobDto {

    @IsString()
    @IsNotEmpty()
    imgUrl: string;

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

    @IsNumber()
    @IsNotEmpty()
    salary: number;
    
    @IsString()
    @IsNotEmpty()
    jobType: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    website: string;

}