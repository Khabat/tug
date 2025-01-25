import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString } from "class-validator";

export class UpdateCompanyDto {
  @ApiPropertyOptional({ description: 'Updated name of the company', example: 'New Tech Corp' })
  @IsString()
  @IsOptional()
  companyName?: string;

  @ApiPropertyOptional({ description: 'Updated ID of the associated product', example: 2 })
  @IsInt()
  @IsOptional()
  productId?: number;
}