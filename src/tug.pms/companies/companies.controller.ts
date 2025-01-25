import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';

@ApiTags('companies')
@Controller('companies')
export class CompaniesController {
  constructor(private companyService: CompaniesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new company' })
  @ApiResponse({ status: 201, description: 'Company successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all companies' })
  @ApiResponse({ status: 200, description: 'List of companies retrieved successfully.' })
  findAll() {
    return this.companyService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a company by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the company to retrieve' })
  @ApiResponse({ status: 200, description: 'Company retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Company not found.' })
  async findOne(@Param('id') id: number) {
    return this.companyService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a company by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the company to update' })
  @ApiResponse({ status: 200, description: 'Company successfully updated.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'Company not found.' })
  update(@Param('id') id: number, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a company by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the company to delete' })
  @ApiResponse({ status: 200, description: 'Company successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Company not found.' })
  remove(@Param('id') id: number) {
    return this.companyService.remove(id);
  }
}
