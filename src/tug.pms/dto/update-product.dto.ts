import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateProductDto{

    @IsString()
    @IsOptional()
    productName?: string;

    @IsString()
    @IsOptional()
    barcode?: string; 
    
 
    @IsOptional()
    @IsInt()
    @IsNotEmpty({ message: 'categoryId must not be null or undefined if provided' }) 
    categoryId?: number;

    @IsOptional()
    @IsInt({each:true})
    subcategoryIds?: number[];
}