import { IsArray, IsIn, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  productName: string;

  @IsInt()
  @IsOptional()
  barcode?: string;

  @IsInt()
  categoryId: number;

  @IsOptional()
  @IsInt({each:true})
  subcategoryIds?: number[];
}
