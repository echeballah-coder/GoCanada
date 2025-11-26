export default {
    testEnvironment: 'jsdom',
    transform: {},
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    collectCoverageFrom: [
        'src/js/modules/**/*.js',
        '!src/js/modules/**/*.test.js',
    ],
    testMatch: [
        '**/__tests__/**/*.js',
        '**/?(*.)+(spec|test).js'
    ],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
};
