import { UsersEntity } from "@common/users/users.entity";
import { Injectable, Inject } from "@nestjs/common";
import { IsNull, Repository } from "typeorm";
import { BaseRepository } from "utils/base/repository.base";
import { ProductsEntity } from "./products.entity";
import { HandlerRepository } from "@utils-decorators/index";


@Injectable()
export class ProductsRepository extends BaseRepository<ProductsEntity>{

  @Inject('PRODUCTS_REPOSITORY')
  protected readonly repository: Repository<ProductsEntity>;
  
  @HandlerRepository()
  public async getAll(take:number = 20): Promise<ProductsEntity[]> {
      console.log("🚀 ~ ProductsRepository ~ getAll ~ take:", take)
      const users = await this.repository.find({
        where:{
          deletedAt: IsNull()
        }
        ,take
      });
      return users;
  }

}