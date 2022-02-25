import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  injectGlobals: true,
  rootDir: 'packages',
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['**/?(*.)+(spec|test).[t]s?(x)'],
  coverageDirectory: `${__dirname}/docs/coverage`
};

export default config;