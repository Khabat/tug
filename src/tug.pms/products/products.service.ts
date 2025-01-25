import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../schema/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { CategoriesService } from '../categories/categories.service';
import { Category } from '../schema/category.entity';
import { SubCategory } from '../schema/subcategory.entity';
import { SubCategoriesService } from '../categories/subcategories.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    private categoryService: CategoriesService,
    private subcategoryService: SubCategoriesService
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = await this.dtoToProduct(createProductDto);

    try {
      return await this.productRepository.save(product);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') { // Unique Violation Error
        throw new BadRequestException('A product with the same barcode already exists.');
      }
      throw error; // Let other errors propagate
    }
  }

  findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(id: number): Promise<Product | null> {
    return this.productRepository.findOneBy({ id });
  }

  findOneByBarcode(barcode: string): Promise<Product | null> {
    return this.productRepository.findOneBy({ barcode });
  }

  async remove(id: number): Promise<Boolean> {
    return (await this.productRepository.delete(id)).affected > 0;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product | null> {


    const currentProduct = await this.productRepository.findOneBy({id});
    if(!currentProduct){
      throw new NotFoundException(`Product with id ${id} does not exists`);
    }
    if(updateProductDto.barcode){
      await this.assertBarcodeUnique(updateProductDto.barcode, id);
    }

    if (updateProductDto.categoryId) {
      const category = await this.getCategory(updateProductDto.categoryId);
      if (!category) {
        throw new NotFoundException(
          `Category with ID ${updateProductDto.categoryId} not found.`,
        );
      }
      currentProduct.category = category;
    }    

    Object.assign(currentProduct, updateProductDto);

    return this.productRepository.save(currentProduct);
  }

  //when using for new products, _id is undefined
  async assertBarcodeUnique(barcode: string, _id?: number) {
      const existingProduct = await this.productRepository.findOneBy({
        barcode
      });
      if (existingProduct && existingProduct.id !== _id) {
        throw new BadRequestException(
          `Product with barcode ${barcode} already exists`,
        );
      }
  }

  async getCategory(categoryId: number): Promise<Category> {

    if(!categoryId){
      throw new BadRequestException(`Category id could not be undefined or null`);
    }
    
    return this.categoryService.findOne(categoryId);;
  }

  async getSubCategories(subcategoryIds: number[]): Promise<SubCategory[]> {

    if(!subcategoryIds || subcategoryIds.length===0){
      return null;
    }
    const allSubCategories = await this.subcategoryService.findAll();
  
    const filteredSubCategories = allSubCategories.filter(subCategory =>
      subcategoryIds.includes(subCategory.id),
    );
  
    if (filteredSubCategories.length !== subcategoryIds.length) {
      throw new NotFoundException(
        `One or more SubCategory IDs not found: ${subcategoryIds}`,
      );
    }
  
    return filteredSubCategories;
  }
  
  async dtoToProduct(productDto: CreateProductDto | UpdateProductDto): Promise<Partial<Product>> {
    const { categoryId, subcategoryIds, ...rest } = productDto;
  
    const category = await this.getCategory(categoryId);
    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found.`);
    }

    const subCategories = await this.getSubCategories(subcategoryIds);
  
    return { ...rest, category , subCategories:(subCategories??[])};
  }



}
