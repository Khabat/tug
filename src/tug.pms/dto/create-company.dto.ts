import { IsNumber, IsOptional, IsString, IsNotEmpty } from "class-validator";

export class CreateCompanyDto {

    @IsString()
    @IsNotEmpty()
    companyName: string;

    @IsNumber()
    @IsOptional()
    productId?: number;
  }

  