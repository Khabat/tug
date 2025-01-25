import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '../schema/product.entity';
import { Repository } from 'typeorm';
import { CategoriesService } from '../categories/categories.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Category } from '../schema/category.entity';
import { BadRequestException } from '@nestjs/common';
import { SubCategoriesService } from '../categories/subcategories.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let productRepository: Repository<Product>;
  let categoriesService: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useClass: Repository,
        },
        {
          provide: CategoriesService,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: SubCategoriesService,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    productRepository = module.get<Repository<Product>>(
      getRepositoryToken(Product),
    );
    categoriesService = module.get<CategoriesService>(CategoriesService);
  });

  describe('create', () => {
    it('should create a new product', async () => {
      //an input
      const createProductDto: CreateProductDto = {
        productName: 'Product1',
        barcode: '123456',
        categoryId: 1,
      };
      //assumed in db
      const category = new Category();
      category.id = 1;
      category.categoryName = 'Category1';
      //target output
      const savedProduct = new Product();
      savedProduct.id = 1;
      savedProduct.productName = createProductDto.productName;
      savedProduct.barcode = createProductDto.barcode;
      savedProduct.category = category;
      //mock external depenedencies
      jest.spyOn(categoriesService, 'findOne').mockResolvedValue(category);
      jest.spyOn(productRepository, 'save').mockResolvedValue(savedProduct);
      jest.spyOn(productRepository, 'findOneBy').mockResolvedValue(null);
      jest.spyOn(productRepository, 'save').mockResolvedValue(savedProduct);
      jest.spyOn(productRepository, 'create').mockReturnValue(null);

      const result = await service.create(createProductDto);

      expect(result).toEqual(savedProduct);
      expect(productRepository.save).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const products = [new Product(), new Product()];
      jest.spyOn(productRepository, 'find').mockResolvedValue(products);

      await expect(service.findAll()).resolves.toEqual(products);
    });
  });

  describe('findOne', () => {
    it('should return a product if found', async () => {
      const product = new Product();
      product.id = 1;
      jest.spyOn(productRepository, 'findOneBy').mockResolvedValue(product);

      await expect(service.findOne(1)).resolves.toEqual(product);
    });

    it('should return null if no product is found', async () => {
      jest.spyOn(productRepository, 'findOneBy').mockResolvedValue(null);

      await expect(service.findOne(1)).resolves.toBeNull();
    });
  });

  describe('findOneByBarcode', () => {
    it('should return a product if found', async () => {
      const product = new Product();
      product.barcode = '2356';
      jest.spyOn(productRepository, 'findOneBy').mockResolvedValue(product);

      await expect(service.findOneByBarcode('2356')).resolves.toEqual(product);
    });

    it('should return null if no product is found', async () => {
      jest.spyOn(productRepository, 'findOneBy').mockResolvedValue(null);

      await expect(service.findOneByBarcode('1111')).resolves.toBeNull();
    });
  });

  describe('remove', () => {
    it('should return true if product is removed', async () => {
      jest
        .spyOn(productRepository, 'delete')
        .mockResolvedValue({ affected: 1 } as any);

      await expect(service.remove(1)).resolves.toBe(true);
    });

    it('should return false if no product was removed', async () => {
      jest
        .spyOn(productRepository, 'delete')
        .mockResolvedValue({ affected: 0 } as any);

      await expect(service.remove(1)).resolves.toBe(false);
    });
  });

  describe('update', () => {
    it('should update a product successfully', async () => {
      const updateProductDto: UpdateProductDto = {
        productName: 'Updated product',
        categoryId: 1,
      };
      const currentProduct = new Product();
      const category = new Category();
      const updatedProduct = currentProduct;
      updatedProduct.category = category;

      jest
        .spyOn(productRepository, 'findOneBy')
        .mockResolvedValueOnce(currentProduct)
        .mockResolvedValueOnce(updatedProduct);
      jest.spyOn(productRepository, 'save').mockResolvedValue(updatedProduct);
      jest.spyOn(categoriesService, 'findOne').mockResolvedValue(category);

      const result = await service.update(1, updateProductDto);
      expect(result).toEqual(updatedProduct);
      expect(productRepository.save).toHaveBeenCalledWith(
        updatedProduct,
      );
    });

    it('should throw BadRequestException if a product with the same barcode exists', async () => {
      const currentProduct = new Product();
      const anotherProduct = new Product();
      anotherProduct.id=2;
      jest
        .spyOn(productRepository, 'findOneBy')
        .mockResolvedValueOnce(currentProduct)
        .mockResolvedValueOnce(anotherProduct)

      const updateProductDto: UpdateProductDto = { barcode: '12345' };

      // expect(result).toBeDefined();
      await expect(service.update(1, updateProductDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
