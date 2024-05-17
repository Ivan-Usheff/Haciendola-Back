/* eslint-disable prettier/prettier */
import { Inject, HttpException, HttpStatus } from "@nestjs/common";
import { CustomLogger } from "utils/logger/logger.service";
import { BaseHttpException } from "utils/errors/error.type";

export function HandlerController(){
    
    const injectLogger = Inject(CustomLogger);
    
    // target: AppService,
    return (
        target: any,
        propertyKey: string,
        propertyDescriptor: PropertyDescriptor,
    ) => {
        
        injectLogger(target, 'logger');

        const originalMethod = propertyDescriptor.value;

       propertyDescriptor.value = async function (...args: any[]) {

            const logger: CustomLogger = this.logger;
            const initTime = new Date();
            const init = initTime.getSeconds();
            this.logger.setContext(target.constructor.name);
            
            try {
                
                logger.log(`${propertyKey}() start ...`);
                const response = await originalMethod.apply(this, args);
                const endTime = new Date();
                const end = init - endTime.getSeconds()
                logger.log(`${propertyKey}() ends, time take ${end}s`);
                return response;
                
            } catch (Error: unknown) {
                const error:BaseHttpException = Error as BaseHttpException;
                logger.error(`${propertyKey}() fail. Reason: [\n${JSON.stringify(error)}\n]`);

                // const { clientMessage, status, serverMessage, code } = error;
                // throw new HttpException(clientMessage, status, {cause: code, description: serverMessage});
                return error;
            }
        };

        return propertyDescriptor;

    }

}
