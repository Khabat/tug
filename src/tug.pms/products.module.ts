import { Module } from '@nestjs/common';
import { ProductsService } from './products/products.service';
import { ProductsController } from './products/products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './schema/product.entity';
import { CompaniesService } from './companies/companies.service';
import { CompaniesController } from './companies/companies.controller';
import { Company } from './schema/company.entity';
import { Category } from './schema/category.entity';
import { CategoriesService } from './categories/categories.service';
import { SubCategoriesService } from './categories/subcategories.service';
import { SubCategory } from './schema/subcategory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Company, Category, SubCategory])],
  providers: [ProductsService, CompaniesService, CategoriesService,  SubCategoriesService],
  controllers: [ProductsController, CompaniesController]
})
export class tug_pms {}
