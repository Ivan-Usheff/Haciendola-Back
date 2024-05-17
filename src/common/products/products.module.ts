import { DatabaseModule } from "@common/database/database.module";
import { Module } from "@nestjs/common";
import { LoggerModule } from "@utils-logger/logger.module";
import { ProductsController } from "./products.controller";
import { ProductsRepository } from "./products.repository";
import { ProductsService } from "./products.service";

@Module({
  imports:[
    DatabaseModule,
    LoggerModule
  ],
  providers: [
    ProductsService,
    ProductsRepository
  ],
  controllers: [ProductsController],
  exports: [ProductsRepository]
})
export class ProductsModule {}