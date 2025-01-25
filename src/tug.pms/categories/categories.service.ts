import { Injectable, OnModuleInit } from '@nestjs/common';
import { Category } from '../schema/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

@Injectable()
export class CategoriesService implements OnModuleInit {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  

  findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  findOne(id: number){
    return this.categoryRepository.findOneBy({id});
  }

  //FIXME 
  //This must be removed before deplying
  async onModuleInit() {
    const exists = (await this.categoryRepository.find()).length > 0;

    if (!exists) {
      const fakeCategories = faker.helpers
        .uniqueArray(faker.commerce.department, 10)
        .map((cat) => {
          return { categoryName: cat };
        });

      await this.categoryRepository.save(fakeCategories);

      console.log('Fake data populated');
    }
  }
}
