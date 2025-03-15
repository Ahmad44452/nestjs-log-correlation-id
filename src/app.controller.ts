import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CustomLogger } from './custom-logger/custom-logger';

@Controller()
export class AppController {
  private readonly logger = new CustomLogger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    this.logger.log('Getting hello world from the controller');
    return this.appService.getHello();
  }
}
