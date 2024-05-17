import { Module } from '@nestjs/common';
import { CustomLogger } from './logger.service';
import { CustomQueryLogger } from './logger.query';
import { ServerLogger } from './server.logger.service';

@Module({
  providers: [
    CustomLogger,
    CustomQueryLogger,
    ServerLogger
  ],
  exports: [
    CustomLogger,
    CustomQueryLogger,
    ServerLogger
  ],
})
export class LoggerModule {}