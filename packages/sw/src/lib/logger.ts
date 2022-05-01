import { logger as coreLogger } from '@glacierjs/core';

export const logger = coreLogger.extends({ prefix: 'sw' });
