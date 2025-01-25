import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { QueryFailedError } from 'typeorm';
  //Base Exception Filter
  @Catch()
  export class BaseExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();
  
      const timestamp = new Date().toISOString();
      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      let message = 'Internal server error';
  
      if (exception instanceof HttpException) {
        status = exception.getStatus();
        
        message = (exception.getResponse()as any).message;
      } else if (exception instanceof QueryFailedError) {
        // Handle database-related exceptions globally, if needed.
        message = 'Database error occurred';
      } else if (typeof exception === 'object' && exception !== null) {
        message = (exception as any).message || message;
      }
  
      response.status(status).json({
        statusCode: status,
        timestamp,
        path: request.url,
        message,
      });
    }
  }