import { HttpStatus } from "@nestjs/common";

type BaseControllerResponseType<T> = {
    status: HttpStatus;
    response: T
}



export type { BaseControllerResponseType }