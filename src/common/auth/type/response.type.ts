import { HttpStatus } from "@nestjs/common";
import { BaseControllerResponseType } from "@utils-types/base-controller-response.type";


type AuthRegisterResponseType = {
    user: string;
    email: string;
    payload: string;
}

type AuthRegisterResponseControllerType = BaseControllerResponseType<string> & AuthRegisterResponseType;


type AuthSingInReponseType = {
    payload:string;
}

type AuthSingInReponseControllerType = BaseControllerResponseType<string> & AuthSingInReponseType;


type AuthConfirmAcountResponseType = AuthRegisterResponseType;

type AuthCormirmAcountResponseControllerType = BaseControllerResponseType<string> & AuthConfirmAcountResponseType; 


export type {
    BaseControllerResponseType,
    AuthRegisterResponseType,
    AuthRegisterResponseControllerType,
    AuthSingInReponseType,
    AuthSingInReponseControllerType,
    AuthConfirmAcountResponseType,
    AuthCormirmAcountResponseControllerType
}