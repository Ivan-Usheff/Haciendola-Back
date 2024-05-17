/* eslint-disable prettier/prettier */
import { Inject, HttpException, HttpStatus } from "@nestjs/common";
import { CustomLogger } from "utils/logger/logger.service";
import { BaseHttpException } from "utils/errors/error.type";

export function HandlerRepository(){
    
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
            this.logger.setContext(target.constructor.name);
            
            try {
                
                logger.log(`${propertyKey}() start ...`);
                const response = await originalMethod.apply(this, args);
                logger.log(`${propertyKey}() ends.`);
                return response;
                
            } catch (Error ) {
                const error:BaseHttpException = Error as BaseHttpException;
                logger.error(`${propertyKey}() fail. Reason: [\n\t${error}\n]`);

                // throw new HttpException({...error}, error.status);
                return Error;
            }
        };
        Promise
        return propertyDescriptor;

    }

}