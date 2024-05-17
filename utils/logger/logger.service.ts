import { ConsoleLogger, ConsoleLoggerOptions, Injectable, LogLevel, Scope } from '@nestjs/common';
import * as dotenv from 'dotenv';


enum ColorEnum {
    RED = '31',
    GREEN = '32',
    YELLOW = '33',
    BLUE = '34',
    CONTEXT = '35',
    CYAN = '36',
    WHITE = '37',
}
type MessageType = 'LOG'|'WARN'|'ERROR'|'DEBUG'|'FATAL'

type MessageColorType = {
    [prop in MessageType]: ColorEnum;
};

dotenv.config();
@Injectable({ scope: Scope.TRANSIENT })
export class CustomLogger extends ConsoleLogger { 
    
    protected readonly SERVER_NAME = process.env.SERVERLES_APP_NAME
    protected readonly COLORS = ColorEnum;
    protected readonly CONTEXT_COLORS = ColorEnum.CONTEXT;
    protected baseColor = this.COLORS.BLUE;
    protected readonly messageColor: MessageColorType = {
        LOG: ColorEnum.GREEN,
        WARN: ColorEnum.YELLOW,
        ERROR: ColorEnum.RED,
        DEBUG: ColorEnum.CYAN,
        FATAL: ColorEnum.WHITE
    }

    constructor(context: string, options?: ConsoleLoggerOptions){
        super(context);
        if(options)
            this.options = options;
        this.setLogLevels(['warn'])
    }
    

    log(message:string): void {
        console.log(this.customMessage(message,'LOG'))
    }
    
    debug(message: any): void {
        console.log(this.customMessage(message, 'DEBUG'))
    }
    
    warn(message): void {
        console.log(this.customMessage(message, 'WARN'))
    }
    
    error(message): void {
        console.log(this.customMessage(message, 'ERROR'))
        // console.trace(`\u001b[${this.messageColor.FATAL}m${message}`)
    }
    
    errorMessage(message): void {
        console.log(this.customMessage(message, 'ERROR'))
    }
    
    fatal(message): void {
        console.log(this.customMessage(message, 'FATAL'))
        console.trace(message)
    }

    protected customMessage(message: string, type: MessageType): string {
        return `${this.getHeadMessage(type)} ${this.getContexMessage()} ${this.getBoddyMessage(message, type)}`;
    }
    
    private getHeadMessage(type: MessageType): string {
        const name = this.SERVER_NAME;
        const timestamp = this.getTimestamp();
        return `\u001b[${this.baseColor}m[${name}] ~ ${timestamp} ~ ${type}`;
    }
    
    private getContexMessage():string {
        const context = this.context;
        return `\u001b[${this.CONTEXT_COLORS}m[${context}] `
    }
    
    private getBoddyMessage(message:string, type: keyof MessageColorType): string {
        const difTime = this.updateAndGetTimestampDiff();
        return `\u001b[${this.messageColor[type]}m${message} ${difTime} \u001b[${this.messageColor.FATAL}m`;
    }
}