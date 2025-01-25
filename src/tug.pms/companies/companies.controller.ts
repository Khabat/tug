import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';

@Controller('companies')
export class CompaniesController {

    constructor(private companyService: CompaniesService){}

    @Post()
    create(@Body() createCompanyDto: CreateCompanyDto) {
      return this.companyService.create(createCompanyDto);
    }
  
    @Get()
    findAll() {
      return this.companyService.findAll();
    }
    
    @Get(':id')
    async findOne(@Param('id') id: number) {
      return this.companyService.findOne(id);
      
    }
  
    @Put(':id')
    update(@Param('id') id: number, @Body() updateCompanyDto: UpdateCompanyDto) {
      return this.companyService.update(id, updateCompanyDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: number) {
      return this.companyService.remove(id);
    }
}
