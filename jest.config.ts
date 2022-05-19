import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  injectGlobals: true,
  rootDir: '.',
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['**/?(*.)+(spec|test).[t]s?(x)'],
  coverageDirectory: `${__dirname}/docs/coverage`,
  setupFiles: ['./test/fetch-mock.ts'],
  globals: {
    'ts-jest': {
      tsconfig: './test/tsconfig.test.json',
    }
  }
};

export default config;