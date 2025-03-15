import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CustomLogger } from './custom-logger';
import { Request, Response, NextFunction } from 'express';
import { randomUUID, UUID } from 'crypto';
import { asyncStore } from './asyncLocalStorage';

@Module({
  providers: [CustomLogger],
})
export class CustomLoggerModule implements NestModule {
  constructor(private readonly logger: CustomLogger) {
    logger.setContext(CustomLoggerModule.name);
  }

  configure(consumer: MiddlewareConsumer) {
    // bind the middleware,
    consumer
      .apply((req: Request, res: Response, next: NextFunction) => {
        let correlationId = req.headers['x-correlation-id'] as UUID;

        if (!correlationId) {
          correlationId = randomUUID();
          this.logger.log(
            `x-correlation-id not found in the request header. Generated a new one: ${correlationId}`,
          );
        }

        asyncStore.run(correlationId, () => next());
      })
      .forRoutes('*');
  }
}
