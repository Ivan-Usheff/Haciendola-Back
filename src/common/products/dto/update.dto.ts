import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { IsNumber, IsObject, IsOptional, IsString } from "class-validator";
import { ProductDto } from "./products.dto";

// PartialType

export class ProductFilterDto extends PartialType(ProductDto)  {} 
export class UpdatedProductDto extends OmitType(ProductFilterDto, ['sku'] as const)  {}

export class UpdateProductDto {
  
  @IsNumber()
  sku: number;
  
  @IsObject()
  product: UpdatedProductDto;

}