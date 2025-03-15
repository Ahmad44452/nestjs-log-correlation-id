import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomLoggerModule } from './custom-logger/custom-logger.module';
import { SampleModule } from './sample/sample.module';

@Module({
  imports: [CustomLoggerModule, SampleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
