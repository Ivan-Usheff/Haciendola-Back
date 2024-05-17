import { HttpStatus } from "@nestjs/common";


type BaseErrorProps = {
    status: HttpStatus;
    clientMessage: string;
    serverMessage: string;
    code: string;
}

type BaseHttpException = {
    readonly [K in keyof BaseErrorProps]: BaseErrorProps[K]
}

type BasicErrorObjct = {
    readonly [K: string]: BaseHttpException
}

type ReposirotyErrors = BasicErrorObjct;

type ServiceErrors = BasicErrorObjct;

type ControllerErrors = BasicErrorObjct;


export type { BaseHttpException, BasicErrorObjct, ReposirotyErrors, ServiceErrors, ControllerErrors }