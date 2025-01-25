import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductsService } from './products.service';
import { UpdateProductDto } from '../dto/update-product.dto';

@Controller('products')
export class ProductsController {

    constructor(private productService: ProductsService){}

    @Post()
    create(@Body() createProductDto: CreateProductDto) {
      return this.productService.create(createProductDto);
    }
  
    @Get()
    findAll() {
      return this.productService.findAll();
    }
    
    @Get(':id')
    async findOne(@Param('id') id: number) {
      return this.productService.findOne(id);
      
    }

    @Get('search')
    async findByBarcode(@Query('barcode') barcode: string) {
      return this.productService.findOneByBarcode(barcode);
      
    }
  
    @Put(':id')
    update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
      return this.productService.update(id, updateProductDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: number) {
      return this.productService.remove(id);
    }
}
