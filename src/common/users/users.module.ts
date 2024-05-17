import { DatabaseModule } from "@common/database/database.module";
import { Module } from "@nestjs/common";
import { LoggerModule } from "@utils-logger/logger.module";
import { UsersRepository } from "./users.repository";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";

@Module({
  imports:[
    DatabaseModule,
    LoggerModule
  ],
  providers: [
    UsersService, 
    UsersRepository,
  ],
  controllers: [UsersController],
  exports: [UsersRepository]
})
export class UsersModule {}