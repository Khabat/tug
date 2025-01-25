import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './tug.pms/schema/category.entity';

export const typeORMProvider = [
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'product',
    autoLoadEntities:true,
    synchronize: true,
  }),
];
