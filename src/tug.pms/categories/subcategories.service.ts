import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { SubCategory } from '../schema/subcategory.entity';

@Injectable()
export class SubCategoriesService implements OnModuleInit {
  constructor(
    @InjectRepository(SubCategory)
    private subCategoryRepository: Repository<SubCategory>,
  ) {}
  

  findAll(): Promise<SubCategory[]> {
    return this.subCategoryRepository.find();
  }

  findOne(id: number){
    return this.subCategoryRepository.findOneBy({id});
  }

  //FIXME 
  //This must be removed before deplying
  async onModuleInit() {
    const exists = (await this.subCategoryRepository.find()).length > 0;

    if (!exists) {
      const fakeCategories = faker.helpers
        .uniqueArray(faker.commerce.department, 100)
        .map((cat) => {
          return { categoryName: cat };
        });

      await this.subCategoryRepository.save(fakeCategories);

      console.log('Fake data populated');
    }
  }
}
