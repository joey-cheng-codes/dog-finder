module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx,ts, tsx}'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: ['**/test/*.+(ts|tsx|js|jsx)'],
  transform: {
    '^.+\\.(ts|js)x?$': 'ts-jest',
  },
}
