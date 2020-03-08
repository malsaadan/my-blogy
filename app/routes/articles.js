// Require necessary NPM packages
const express = require("express");

// Require Mongoose Model for Article
const Article = require("../models/article");

// Instantiate a Router (mini app that only handles routes)
const router = express.Router();

/*
 * Action:      INDEX
 * Method:      GET
 * URI:         /api/articles
 * Description: Get All Articles
 */

router.get("/api/articles", (req, res) => {
  Article.find() // find() talks to the DB
    // Return all Articles as an Array
    .then(AllArticles => {
      res.status(200).json({ articles: AllArticles });
    })
    // Catch any error that might occur
    .catch(error => {
      res.status(500).json({
        error: error
      });
    });
});

/*
 * Action:       SHOW
 * Method:       GET
 * URI:          /api/article/9b9ceb63c8e8
 * Description:  Get an Article by Article ID
 */

/*
 * Action:       CREATE
 * Method:       POST
 * URI:          /api/articles
 * Description:  Create a new Article
 */
router.post("/api/articles", (req, res) => {
  Article.create(req.body.article)
    // On a successful `create` action, respond with 201
    // HTTP status and the content of the new article
    .then(newArticle => {
      res.status(201).json({
        article: newArticle
      });
    })
    // Catch any errors that might occur
    .catch(error => {
      res.status(500).json({
        error: error
      });
    });
});

// PUT updates whole document, PATCH doing some process then update
/*
 * Action:       UPDATE
 * Method:       PATCH
 * URI:          /api/articles/9b9ceb63c8e8
 * Description:  Update an Article by Article ID
 */

/*
 * Action:       DESTROY
 * Method:       DELETE
 * URI:          /api/articles/9b9ceb63c8e8
 * Description:  Delete an Article by Article ID
 */

// Export the Router so we can use it in the server.js file
module.exports = router;
