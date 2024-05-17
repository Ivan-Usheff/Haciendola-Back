import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

import { UsersRepository } from '@common/users/users.repository';
import { NewUserDto } from '@common/users/dto/new-user.dto';
import { UsersEntity } from '@common/users/users.entity';
import { AuthRegisterResponseType } from './type/response.type';
import { SingInDto } from './dto/singin.dto';

dotenv.config();
@Injectable()
export class AuthService {

    @Inject()
    private readonly userRepository: UsersRepository;
    @Inject()
    private readonly jwtService: JwtService;


    public async createUser(param: NewUserDto): Promise<AuthRegisterResponseType> {
        const { user, email } = param;
  
        const createdUser = await this.userRepository.createOne(param as UsersEntity);
        const { id } = createdUser;
        
        const emailPayLoad:string = await this.jwtService.signAsync({ sub: id, user: { email, user } })
        
        return {user: user, email, payload:emailPayLoad}
    }

    public async singIn(param: SingInDto): Promise<AuthRegisterResponseType> {
        const { email, password:paramPassword } = param;

        const userExist = await this.userRepository.getUserforLogin({email});
        
        const { id, password, user } = userExist;
        const compare = bcrypt.compare(paramPassword, password);
        if(!compare)
            throw new BadRequestException("La informacion proporcionada no es correcta.");

        const payload:string = await this.jwtService.signAsync({ sub: id, user: { email, user } })

        return {user: user, email, payload}
    }

    /*
    public async confirAcount(param: ConfirmAcountDto): Promise<AuthConfirmAcountResponseType> {
        const { id:paramId, user:{email:paramEmail} } = param;
        
        const user = await this.userRepository.findOne({id:paramId});
        if(!user)
            throw new BadRequestException("AHubo un error con su solicitud, enviamos un nuevo correo para validad su identidad.");

        const { id, email, profile:{name} } = user;
        if(paramEmail !== email)
            throw new BadRequestException("BHubo un error con su solicitud, enviamos un nuevo correo para validad su identidad.");

        const confirmedAcount = await this.userRepository.update({id},{status:UsersState.CONFIRMED});
        if(!confirmedAcount)
            throw new BadRequestException("Ups! Tuvimos un erro interno, por favor intentelo mas tarde.");
        
        const { status, profile } = confirmedAcount;
        const formatProfile = this.formatProfile(profile);
        const payload = { sub: id, user: { email, status, profile: formatProfile } };
        
        return {email, name, payload: await this.jwtService.signAsync(payload)};
    }
    */
}
