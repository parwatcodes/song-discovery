export default {
  testEnvironment: 'jsdom',  // Necessary for React components
  transform: {
    '^.+\\.jsx?$': 'babel-jest',  // Transform JSX files using Babel
    '^.+\\.tsx?$': 'babel-jest',  // Transform TSX files using Babel
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleNameMapper: {
    // Mock static assets like images and CSS files
    '\\.(css|scss|less)$': 'identity-obj-proxy',
  },
  testMatch: ['**/__tests__/**/*.(spec|test).[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],  // Define test file patterns
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"]
}
