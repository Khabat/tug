import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggerService {
  private logger:Logger;
  constructor() {
    this.logger=new Logger();
  }

  logRequest(method: string, url: string, body: any): void {
    this.logger.log(`Incoming Request: ${method} ${url} - Body: ${JSON.stringify(body)}`);
  }

  logResponse(method: string, url: string, statusCode: number): void {
    this.logger.log(`Outgoing Response: ${method} ${url} - Status: ${statusCode}`);
  }
}
