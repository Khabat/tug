import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';

import { typeORMProvider } from './typeorm.provider';
import { tug_pms } from './tug.pms/products.module';
import { LoggerService } from './logger/logger.service';
import { RestLoggerMiddleware } from './logger/rest-logger.middleware';
import { APP_FILTER } from '@nestjs/core';
import { DatabaseExceptionFilter } from './filters/database-exception.filter';

@Module({
  imports: [...typeORMProvider, tug_pms],
  controllers: [],
  providers: [
    LoggerService,
    Logger,
    {
      provide: APP_FILTER,
      useClass: DatabaseExceptionFilter,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RestLoggerMiddleware).forRoutes('*');
  }
}
