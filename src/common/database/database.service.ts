import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";

import { ProductsEntity } from "@common/products/products.entity";
import { HandlerService } from "@utils-decorators/index";

import { readFileSync } from "fs";
const papa = require('papaparse');


@Injectable()
export class DataBaseService {

  @Inject('PRODUCTS_REPOSITORY')
  protected readonly repositoryProducts: Repository<ProductsEntity>;

  @HandlerService()
  public async seedDataBase(): Promise<void> {
    const csvFile = readFileSync('./seeds/seed_products.csv');
    const csvData = csvFile.toString();
    const productsList:ProductsEntity[] = [];
    
    const parceData = papa.parse(csvData, { header:false })
    
    parceData.data.shift()
    parceData.data.pop()
    
    parceData.data.map((pd) => {
      productsList.push(
        {
          handle: pd[0], 
          title: pd[1], 
          description: pd[2], 
          sku: +pd[3], 
          grams: +pd[4], 
          stock: +pd[5], 
          price: +pd[6], 
          comparePrice: +pd[7], 
          barCode: +pd[8]
        }
      )
    });

    this.repositoryProducts.save(productsList)
  }
}