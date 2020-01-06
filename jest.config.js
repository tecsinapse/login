module.exports = {
  roots: ['./__tests__'],
  displayName: 'login-tests',
  testMatch: ['**/__tests__/**/*.test.js'],
  testURL: 'http://localhost',
  transformIgnorePatterns: ['/node_modules/(?!@tecsinapse/ui-kit).+\\.js$'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};
