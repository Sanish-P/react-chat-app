const path = require('path');
module.exports = {
  globals: {
    environment: "test"
  },
  verbose: true,
  moduleDirectories: ["node_modules", path.resolve(__dirname, './')],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  setupFiles: ["./src/setupTest.js"],
  moduleNameMapper: {
    "\\.(css)$": "<rootDir>/__mocks__/styleMock.js"
  }
};
