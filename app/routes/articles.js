// Require necessary NPM packages
const express = require("express");

// Require Mongoose Model for Article
const Article = require("../models/article");

// Instantiate a Router (mini app that only handles routes)
const router = express.Router();

/*
 * Action:   INDEX
 * Method:   GET
 * URI:      /api/articles
 * Description:  Get All Articles
 */

router.get("/api/articles", (req, res) => {
  Article.find()    // find() talks to the DB
    // Return all Articles as an Array
    .then((AllArticles) => {
      res.status(200).json({ articles: AllArticles });
    })
    // Catch any error that might occur
    .catch(error => {
      res.status(500).json({
        error: error
      });
    });
});

// Export the Router so we can use it in the server.js file
module.exports = router;
