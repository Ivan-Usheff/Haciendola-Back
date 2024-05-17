import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsObject, IsString } from "class-validator";


export class NewUserDto {
  
  @IsString()
  @IsNotEmpty()
  user: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
  
  @IsString()
  @IsNotEmpty()
  password: string;
  
}