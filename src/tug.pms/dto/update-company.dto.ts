import { IsInt, IsOptional, IsString } from "class-validator";

export class UpdateCompanyDto {

    @IsString()
    @IsOptional()
    companyName?: string;

    @IsInt()
    @IsOptional()
    productId?: number;
  }