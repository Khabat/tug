import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from './logger.service';

@Injectable()
export class RestLoggerMiddleware implements NestMiddleware {
  constructor(private readonly loggerService: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction): void {
    const { method, originalUrl, body } = req;
    this.loggerService.logRequest(method, originalUrl, body);

    res.on('finish', () => {
      this.loggerService.logResponse(method, originalUrl, res.statusCode);
    });

    next();
  }
}
