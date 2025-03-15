import {
  ConsoleLogger,
  ConsoleLoggerOptions,
  Injectable,
  LoggerService,
  Scope,
} from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { UUID } from 'crypto';
import { asyncStore } from './asyncLocalStorage';

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLogger extends ConsoleLogger implements LoggerService {
  private readonly als: AsyncLocalStorage<UUID> = asyncStore;

  constructor();
  constructor(context: string);
  constructor(options: ConsoleLoggerOptions);
  constructor(context: string, options: ConsoleLoggerOptions);
  constructor(
    context?: string | ConsoleLoggerOptions,
    options?: ConsoleLoggerOptions,
  ) {
    if (context && options) {
      super(context as string, options);
    } else if (context) {
      super(context as string);
    } else {
      super();
    }
  }

  addCorrelationIdToMessage(message: any): any {
    const correlationId = this.als.getStore();
    return correlationId ? `[CID: ${correlationId}] ${message}` : message;
  }

  log(message: any, context?: string): void;
  log(message: any, ...optionalParams: [...any, string?]): void;
  log(message: any, ...optionalParams: [...any, string?]) {
    super.log(this.addCorrelationIdToMessage(message), ...optionalParams);
  }

  error(message: any, stackOrContext?: string): void;
  error(message: any, stack?: string, context?: string): void;
  error(message: any, ...optionalParams: [...any, string?, string?]): void;
  error(message: any, ...optionalParams: [...any, string?, string?]) {
    super.error(this.addCorrelationIdToMessage(message), ...optionalParams);
  }

  warn(message: any, context?: string): void;
  warn(message: any, ...optionalParams: [...any, string?]): void;
  warn(message: any, ...optionalParams: [...any, string?]) {
    super.warn(this.addCorrelationIdToMessage(message), ...optionalParams);
  }

  debug(message: any, context?: string): void;
  debug(message: any, ...optionalParams: [...any, string?]): void;
  debug(message: any, ...optionalParams: [...any, string?]) {
    super.debug(this.addCorrelationIdToMessage(message), ...optionalParams);
  }

  verbose(message: any, context?: string): void;
  verbose(message: any, ...optionalParams: [...any, string?]): void;
  verbose(message: any, ...optionalParams: [...any, string?]) {
    super.verbose(this.addCorrelationIdToMessage(message), ...optionalParams);
  }

  fatal(message: any, context?: string): void;
  fatal(message: any, ...optionalParams: [...any, string?]): void;
  fatal(message: any, ...optionalParams: [...any, string?]) {
    super.fatal(this.addCorrelationIdToMessage(message), ...optionalParams);
  }
}
