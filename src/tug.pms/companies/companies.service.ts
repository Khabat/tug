import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Company } from '../schema/company.entity';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from '../products/products.service';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { Product } from '../schema/product.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company) private companyRepository: Repository<Company>,
    private productService: ProductsService,
  ) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const company = await this.dtoToCompany(createCompanyDto);

    return this.companyRepository.save(company);
  }

  findAll(): Promise<Company[]> {
    return this.companyRepository.find();
  }

  async findOne(id: number): Promise<Company | null> {
    return this.companyRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<Boolean> {
    return (await this.companyRepository.delete(id)).affected > 0;
  }

  async update(
    id: number,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company | null> {
    const currentCompany = await this.companyRepository.findOneBy({ id });
    if (!currentCompany) {
      throw new NotFoundException(`Company with id ${id} does not exists`);
    }


    if (updateCompanyDto.productId) {
        const product = await this.getProduct(
        updateCompanyDto.productId,
      );
      if(!product){
        throw new NotFoundException(
          `Product with ID ${updateCompanyDto.productId} not found.`,
        );
      }
      currentCompany.product = product;
    }

    Object.assign(currentCompany, updateCompanyDto);
    
    return this.companyRepository.save(currentCompany);
  }

  async dtoToCompany(
    companyDto: CreateCompanyDto | UpdateCompanyDto,
  ): Promise<Partial<Company>> {
    const { productId, ...rest } = companyDto;
    let result = { ...rest, product: null };

    if (productId) {
      const product = await this.productService.findOne(productId);
      if (!product) {
        throw new NotFoundException(`Product with ID ${productId} not found.`);
      }
      result.product = product;
    }

    return result;
  }

  async getProduct(productId: number): Promise<Product> {
    const product = await this.productService.findOne(productId);
    if (!product) {
      throw new BadRequestException(
        `Category with id ${productId} does not exists.`,
      );
    }

    return product;
  }
}
