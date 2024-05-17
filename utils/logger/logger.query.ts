import { BadRequestException, ConsoleLogger, Inject, Injectable, Scope } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { Logger } from 'typeorm/logger/Logger';
import { CustomLogger } from './logger.service';

@Injectable({ scope: Scope.TRANSIENT })
export class CustomQueryLogger extends ConsoleLogger implements Logger {
    
    @Inject()
    readonly logger: CustomLogger;
    
    constructor(){
        super();
        this.logger = new CustomLogger(this.constructor.name);
    }

    logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
        this.logger.log(`
            Query: 
                ${query} 
            Params: 
                ${parameters} 
            QueryRunner: 
                ${{...queryRunner}} `);
    }
    logQueryError(error: string | Error, query: string, parameters?: any[], queryRunner?: QueryRunner) {
        this.logger.error(`
            Error: 
                ${error} 
            Query:  
                ${query} 
            Params:   
                ${parameters} 
            QueryRunner: 
                ${queryRunner} `);
        throw new BadRequestException();
    }
    logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner) {
        this.logger.log(`
            Time: 
                ${time} 
            Query: 
                ${query} 
            Params: 
                ${parameters} 
            QueryRunner: 
                ${queryRunner} `);
    }
    logSchemaBuild(message: string, queryRunner?: QueryRunner) {
        this.logger.log(`
            Message: 
                ${message} 
            QueryRunner: 
                ${queryRunner} `);
    }
    logMigration(message: string, queryRunner?: QueryRunner) {
        this.logger.log(`
            Message: 
                ${message} 
            QueryRunner: 
                ${queryRunner} `);
    }
    log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner) {
        this.logger.log(`
            Level: 
                ${level} 
            Message: 
                ${message} 
            QueryRunner: ${queryRunner} `);
    }
}