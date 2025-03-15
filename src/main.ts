import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomLogger } from './custom-logger/custom-logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const logger = await app.resolve(CustomLogger);
  logger.setContext('Main');
  app.useLogger(logger);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
