import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductsService } from './products.service';
import { UpdateProductDto } from '../dto/update-product.dto';

@ApiTags('products') 
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'Product created' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all products' })
  @ApiResponse({ status: 200, description: 'List of retieved products' })
  async findAll() {
    return (await this.productService.findAll())||[];
  }

  @Get('search')
  @ApiOperation({ summary: 'Search for a product by barcode' })
  @ApiQuery({ name: 'barcode', type: String, description: 'The barcode of the product' })
  @ApiResponse({ status: 200, description: 'Product retrieved' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async findByBarcode(@Query('barcode') barcode: string) {
    const result = await this.productService.findOneByBarcode(barcode);
    return result || {};
  }


  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a product by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'The ID of the product' })
  @ApiResponse({ status: 200, description: 'Product retrieved' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async findOne(@Param('id') id: number) {
    return (await this.productService.findOne(id)) || {};
  }



  @Put(':id')
  @ApiOperation({ summary: 'Update a product by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'The ID of the product' })
  @ApiResponse({ status: 200, description: 'Product updated' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'The ID of the product' })
  @ApiResponse({ status: 200, description: 'Product deleted' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  remove(@Param('id') id: number) {
    return this.productService.remove(id);
  }
}
