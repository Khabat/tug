import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsIn, IsInt, IsOptional, IsString } from 'class-validator';
export class CreateProductDto {
  @ApiProperty({ description: 'Name of the product', example: 'Product A' })
  @IsString()
  productName: string;

  @ApiPropertyOptional({ description: 'Barcode of the product', example: '12345' })
  @IsInt()
  @IsOptional()
  barcode?: string;

  @ApiProperty({ description: 'ID of the category', example: 1 })
  @IsInt()
  categoryId: number;

  @ApiPropertyOptional({ description: 'List of subcategory IDs', example: [1, 2, 3] })
  @IsOptional()
  @IsInt({ each: true })
  subcategoryIds?: number[];
}