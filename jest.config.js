module.exports = {
  roots: ['<rootDir>/__tests__'],
  clearMocks: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/main/**'],
  testMatch: ['**/**.spec.ts', '**/**.test.ts'],
  globals: {
    'ts-jest': {
      compiler: 'ttypescript',
    },
  },
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: {
    '@/tests/(.*)': '<rootDir>/__tests__/$1',
    '@/(.*)': '<rootDir>/src/$1',
  },
}
