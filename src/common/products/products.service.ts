import { Inject, Injectable } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import { ProductsEntity } from "./products.entity";


@Injectable()
export class ProductsService {
  
  @Inject()
  private readonly repository: ProductsRepository;


  public async getAllProducts(limit:number): Promise<ProductsEntity[]> {
    return await this.repository.getAll(limit);
  }
  
  public async updateProduct(param: number, option: Partial<ProductsEntity>): Promise<ProductsEntity> {
    return await this.repository.update({sku: param}, option);
  }
  
  public async getOne(sku: number): Promise<ProductsEntity> {
    return await this.repository.findOne({sku:sku});
  }
  
  public async deleteOne(sku: number): Promise<ProductsEntity> {
    return await this.repository.delete({sku:sku});
  }
}