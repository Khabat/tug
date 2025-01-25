import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { QueryFailedError } from 'typeorm';
  
  @Catch(QueryFailedError)
export class DatabaseExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const timestamp = new Date().toISOString();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if ((exception as any).code === 'ER_DUP_ENTRY') { 
      message = 'A record with the same unique field already exists.';
      status = HttpStatus.CONFLICT;
    }

    response.status(status).json({
      statusCode: status,
      timestamp,
      path: request.url,
      message,
    });
  }
}
  