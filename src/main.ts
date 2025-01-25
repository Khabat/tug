import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DatabaseExceptionFilter } from './filters/database-exception.filter';
import { BaseExceptionFilter } from './filters/base-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: false, forbidNonWhitelisted: true, transform:true }),
  );

  app.useGlobalFilters(new BaseExceptionFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
