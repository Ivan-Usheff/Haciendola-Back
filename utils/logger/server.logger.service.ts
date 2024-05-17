import { ConsoleLoggerOptions, Injectable, Scope } from "@nestjs/common";
import { CustomLogger } from "./logger.service";


@Injectable({ scope: Scope.TRANSIENT })
export class ServerLogger extends CustomLogger {
    
    
    constructor(context: string, options?: ConsoleLoggerOptions){
        super(context, options);
        this.baseColor = this.COLORS.BLUE;
    }
    
}