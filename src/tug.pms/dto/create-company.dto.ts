import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateCompanyDto {
  @ApiProperty({ description: 'Name of the company', example: 'Tech Corp' })
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @ApiPropertyOptional({ description: 'ID of the associated product', example: 1 })
  @IsNumber()
  @IsOptional()
  productId?: number;
}