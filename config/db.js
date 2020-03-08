// Creating a base name for the MongoDB
const mongooseBaseName = "blogy";

// There are different versions of the db
// blogy-development
// blogy-test
// blogy-staging
// blogy-production
// blogy

// Create the MongoDB URI for Development and Test
const database = {
  development: `mongodb://localhost/${mongooseBaseName}-development`,
  test: `mongodb://localhost/${mongooseBaseName}-test`
};

// Identify if development environment is Test or Development
// Select DB based on wether a test file was executed before `server.js`
const localDB = process.env.TESTENV ? database.test : database.development;

// Environment variable MONGODB_URI will be available in
// Heroku production environment, otherwise use Test or Development DB
const currentDB = process.env.MONGODB_URI || localDB;

// Export the appropriate database based on the current environment
module.exports = currentDB;
