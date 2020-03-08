// Require necessary NPM packages
const express = require('express');
const mongoose = require('mongoose');

// Require Route Files
const indexRouter = require('./app/routes/index');

// Instantiate Express Application Object
const app = express();

// Define PORT for the API to run on into seperate variable (It changes on different env)
const port = process.env.PORT || 5000;  // process.env.PORT define port on the deployed env

/***** Routes *****/

// Mount imported Routers
app.use(indexRouter);

// Start the server to listen for request on a given port
app.listen(port, ()=> {
    console.log(`Blogy is listening on port ${port}`);
});