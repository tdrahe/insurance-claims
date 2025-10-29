import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/tests'],
    moduleFileExtensions: ['ts', 'js', 'json'],
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.ts', '!src/tests/**'],
    coverageDirectory: 'coverage',
    clearMocks: true,
};

export = config;