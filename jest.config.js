/** @type {import('jest').Config} */
const config = {
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],

  globals: {
    __DEV__: true,
  },
  testEnvironment: 'node',

  transform: {
    '\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!react-native|@react-native|@react-native-async-storage)',
  ],

  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.history/',
  ],

  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.history/',
  ],

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.[jt]s?(x)',
    '<rootDir>/src/**/?(*.)+(spec|test).[jt]s?(x)',
  ],
};

module.exports = config;