import { logger } from './logger';

describe('logger', () => {

  test('should work', () => {
    logger.info('Hi');
    expect(true).toBe(true);
  });
});
