import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesService } from './companies.service';
import { Repository } from 'typeorm';
import { Company } from '../schema/company.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductsService } from '../products/products.service';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { SubCategory } from '../schema/subcategory.entity';

describe('CompaniesService', () => {
  let service: CompaniesService;
  let repository: Repository<Company>;
  let productsService: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompaniesService,
        {
          provide: getRepositoryToken(Company),
          useClass: Repository,
        },
        {
          provide: ProductsService,
          useValue: {
            findOne: jest.fn().mockResolvedValue({ id: 1 }),
          },
        },
      ],
    }).compile();

    service = module.get<CompaniesService>(CompaniesService);
    repository = module.get<Repository<Company>>(getRepositoryToken(Company));
    productsService = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new company', async () => {
      const dto: CreateCompanyDto = { companyName: 'Company Name1', productId: 1 };
      const product = {
        id: 1,
        productName: 'Product Name',
        barcode: '1212',
        category: { id: 1, categoryName: 'Category Name' },
        subCategories: []
      };
      const company = {
        id: 1,
        companyName: 'Company Name1',
        product: product,
      };
      const {id, ...companyWithoutId} = company;
      jest.spyOn(repository, 'save').mockResolvedValue(company);
      jest.spyOn(productsService, 'findOne').mockResolvedValue(product);

      const result = await service.create(dto);

      expect(repository.save).toHaveBeenCalledWith(companyWithoutId);
      expect(result).toEqual(company);
    });
  });

  describe('findAll', () => {
    it('should return an array of companies', async () => {
      const companies = [
        {
          id: 1,
          companyName: 'Company1',
          product: {
            id: 1,
            barcode: '3434',
            productName: 'Product Name',
            category: {id:1, categoryName:'Category1'},
            subCategories:[]
          },
        },
      ];
      jest.spyOn(repository, 'find').mockResolvedValue(companies);

      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual(companies);
    });
  });

  describe('findOne', () => {
    it('should return a single company', async () => {
      const company = {
        id: 1,
        companyName: 'Company1',
        product: {
          id: 1,
          barcode: '3434',
          productName: 'Product Name',
          category: {id:1, categoryName:'Category1'},
          subCategories:[]
        },
      };
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(company);

      const result = await service.findOne(1);

      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual(company);
    });
  });

  describe('remove', () => {
    it('should remove a company', async () => {
      jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 1 }as any);

      const result = await service.remove(1);

      expect(repository.delete).toHaveBeenCalledWith(1);
      expect(result).toBe(true);
    });
  });

  describe('update', () => {
    it('should update a company', async () => {
      const dto: UpdateCompanyDto = { companyName: 'Updated Company', productId: 1 };
      const company = {
        id: 1,
        companyName: 'Updated Company',
        product: {
          id: 1,
          barcode: '3434',
          productName: 'Product Name',
          category: {id:1, categoryName:'Category1'},
          subCategories:[]
        },
      }

      jest.spyOn(repository, 'findOneBy').mockResolvedValue(company);
      jest.spyOn(repository, 'save').mockResolvedValue(company);

      const result = await service.update(1, dto);

      expect(repository.save).toHaveBeenCalledWith(company);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual(company);
    });
  });
});
