import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, IsNumber, isNotEmpty, IsNotEmpty } from "class-validator";


export class ProductDto {
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  handle: string;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;
  
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  sku: number;
  
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  grams: number;
  
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  stock: number;
  
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number;
  
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  compare_price: number;
  
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  bar_code: number;
  
}