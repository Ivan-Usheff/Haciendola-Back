import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsObject, IsString } from "class-validator";


class UserCormirAcount {

    @IsEmail()
    @IsNotEmpty()
    email: string;
    
}

export class ConfirmAcountDto {
    
    @IsString()
    @IsNotEmpty()
    id: string;
    
    @IsObject()
    @IsNotEmpty()
    @Type( () => UserCormirAcount)
    user: UserCormirAcount;

}