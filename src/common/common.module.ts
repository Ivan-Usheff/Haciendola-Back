import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { JwtModule } from "@nestjs/jwt";
import { ProductsModule } from "./products/products.module";


const modules = [
  DatabaseModule,
  JwtModule,
  AuthModule,
  UsersModule,
  ProductsModule
]


@Module({
  imports: [ ...modules ],
  exports: [ ...modules ]
})
export class CommonModule {}