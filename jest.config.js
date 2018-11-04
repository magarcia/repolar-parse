module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  watchPathIgnorePatterns: [
    "<rootDir>/dist/",
    "<rootDir>/coverage/",
    "<rootDir>/example/",
    "<rootDir>/node_modules/"
  ],
  moduleFileExtensions: ["ts", "js"],
  testRegex: "^.+\\.spec\\.ts$",
  collectCoverage: false,
  coveragePathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/dist/",
    "<rootDir>/coverage/",
    "<rootDir>/example/"
  ],
  coverageReporters: ["json", "lcov", "text", "html"],
  coverageDirectory: "coverage",
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
