import { Injectable } from '@nestjs/common';
import { CustomLogger } from 'src/custom-logger/custom-logger';

@Injectable()
export class SampleService {
  private readonly logger = new CustomLogger(SampleService.name);

  getHello() {
    this.logger.log('log from the sample service');
    this.logger.log('Correlation ID: ' + this.logger.getCorrelationId());
    return 'HOLLA. Sample body here';
  }
}
