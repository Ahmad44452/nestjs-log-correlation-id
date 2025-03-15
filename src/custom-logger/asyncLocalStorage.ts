// src/custom-logger/asyncLocalStorage.ts
import { AsyncLocalStorage } from 'async_hooks';
import { UUID } from 'crypto';

export const asyncStore: AsyncLocalStorage<UUID> = new AsyncLocalStorage();
