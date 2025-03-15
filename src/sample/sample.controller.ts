import { Controller, Get } from '@nestjs/common';
import { SampleService } from './sample.service';
import { CustomLogger } from 'src/custom-logger/custom-logger';

@Controller('sample')
export class SampleController {
  private readonly logger = new CustomLogger(SampleController.name);

  constructor(private readonly sampleSerivce: SampleService) {}

  @Get()
  getHello(): string {
    this.logger.log('LOG TEST');
    this.logger.debug('DEBUG TEST');
    this.logger.error('ERROR TEST', new Error('Error test').stack);
    this.logger.fatal('FATAL TEST');
    this.logger.warn('WARN TEST');
    this.logger.verbose('VERBOSE TEST');

    return this.sampleSerivce.getHello();
  }
}
