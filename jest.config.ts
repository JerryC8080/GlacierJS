import type { Config } from '@jest/types';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './test/tsconfig.test.json';

const config: Config.InitialOptions = {
  injectGlobals: true,
  rootDir: '.',
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['**/?(*.)+(spec|test).[t]s?(x)'],
  coverageDirectory: `${__dirname}/docs/coverage`,
  globals: {
    'ts-jest': {
      tsconfig: './test/tsconfig.test.json',
    }
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
};

export default config;