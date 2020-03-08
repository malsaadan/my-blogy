// Require necessary NPM packages
const express = require('express');
const mongoose = require('mongoose');

// Require Route Files
const indexRouter = require('./app/routes/index');

// Require DB Configuration FIle
const db = require('./config/db');

// Establish Database Connection
mongoose.connect(db, {useNewUrlParser: true});
mongoose.connection.once('open', () => {
    console.log('Connected to Mongo', db);
});

// Instantiate Express Application Object
const app = express();

// Define PORT for the API to run on into separate variable (It changes on different env)
const port = process.env.PORT || 5000;  // process.env.PORT define port on the deployed env

/***** Routes *****/

// Mount imported Routers
app.use(indexRouter);

// Start the server to listen for request on a given port
app.listen(port, ()=> {
    console.log(`Blogy is listening on port ${port}`);
});