import { Body, Controller, Get, Param, Patch, Delete, Res, Put } from "@nestjs/common";
import { Response } from 'express';
import { ProductsService } from "./products.service";
import { UpdateProductDto } from "./dto/update.dto";



@Controller('products')
export class ProductsController {
  
  constructor(private readonly service: ProductsService){}

  @Get('/:limit?')
  public async getAll(@Param() param: {limit: number}, @Res() res: Response): Promise<Response> {
    const response = await this.service.getAllProducts(param.limit);
    return res
      .status(200)
      .json(response);
  }
  
  @Put('update')
  public async update(@Body() updatedProduct: UpdateProductDto, @Res() res: Response): Promise<Response> {
    const {sku, product} = updatedProduct;
    const response = await this.service.updateProduct(sku, product);
    return res
      .status(200)
      .json(response);
  }
  
  @Get('get/:sku')
  public async getOne(@Param() param: {sku: number}, @Res() res: Response): Promise<Response> {
    const response = await this.service.getOne(param.sku);
    return res
      .status(200)
      .json(response);
  }
  
  @Delete('/:sku')
  public async delete(@Param() param: {sku: number}, @Res() res: Response): Promise<Response> {
    const response = await this.service.deleteOne(param.sku);
    return res
      .status(204)
      .json(response);
  }
}