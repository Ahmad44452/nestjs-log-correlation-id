import { Injectable } from '@nestjs/common';
import { CustomLogger } from './custom-logger/custom-logger';

// { scope: Scope.REQUEST, durable: true }
@Injectable()
export class AppService {
  private readonly logger = new CustomLogger(AppService.name);

  constructor() {}

  getHello(): string {
    this.logger.log('Getting hello world from the service');
    this.logger.error('error lol');
    return 'Hello World!';
  }
}
