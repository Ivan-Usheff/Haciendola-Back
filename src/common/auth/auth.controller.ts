import { Response } from 'express';
import { Controller, Post, Body, Res } from "@nestjs/common";

import { NewUserDto } from "@common/users/dto/new-user.dto";

import { AuthService } from "./auth.service";
import { Public } from "./decorators/public.decorators";
import { SingInDto } from './dto/singin.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @Public()
    @Post('register')
    public async register(@Body() param: NewUserDto, @Res() res: Response): Promise<Response> {
        const response = await this.authService.createUser(param)
        return res
            .status(201)
            .send({...response})
    }
    
    @Public()
    @Post('singIn')
    public async singIn(@Body() param: SingInDto, @Res() res: Response): Promise<Response> {
        const payload = await this.authService.singIn(param);
        return res
            .set('Authorization',`Bearer ${payload}`)
            .status(200)
            .send({token: payload})
    }
}