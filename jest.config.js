/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'react-native',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: ['node_modules', 'lib', 'cli'],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|react-clone-referenced-element|@react-native-community|react-navigation|@react-navigation/.*|@dooboo-ui|@mj-studio|@sentry/react-native|@react-native-seoul/naver-login)',
  ],
  cache: true,
  cacheDirectory: '.jest/cache',
};
