import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateProductDto {
    @ApiPropertyOptional({ description: 'Name of the product', example: 'Updated Product A' })
    @IsString()
    @IsOptional()
    productName?: string;
  
    @ApiPropertyOptional({ description: 'Barcode of the product', example: '54321' })
    @IsString()
    @IsOptional()
    barcode?: string;
  
    @ApiPropertyOptional({ description: 'ID of the category', example: 2 })
    @IsOptional()
    @IsInt()
    @IsNotEmpty({ message: 'categoryId must not be null or undefined if provided' })
    categoryId?: number;
  
    @ApiPropertyOptional({ description: 'List of subcategory IDs', example: [2, 4, 5] })
    @IsOptional()
    @IsInt({ each: true })
    subcategoryIds?: number[];
  }
  