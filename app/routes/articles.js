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

router.get("/api/articles/:id", (req, res) => {
  Article.findById(req.params.id)
    .then(article => {
      if (article) {
        res.status(200).json({ article: article });
      } else {
        // If we couldn't find a document with the matching ID
        res.status(404).json({
          error: {
            name: "DocumentNotFoundError",
            message: "The provided ID doesn't match any documents"
          }
        });
      }
    })
    // Catch any errors that might occur
    .catch(error => {
      res.status(500).json({ error: error });
    });
});

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
router.delete("/api/articles/:id", (req, res) => {
  Article.findById(req.params.id)
    .then(article => {
      if (article) {
        // Pass the result of Mongoose's `.delete` method to the next `.then`
        return article.remove();
      } else {
        // If we couldn't find a document with the matching ID
        res.status(404).json({
          error: {
            name: "DocumentNotFoundError",
            message: "The provided ID Doesn't match any documents"
          }
        });
      }
    })
    .then(() => {
      // If the deletion succeeded, return 204 and no JSON
      res.status(204).end();
    })
    // Catch any errors that might occur
    .catch(article => {
      res.status(500).json({ error: error });
    });
});

// Export the Router so we can use it in the server.js file
module.exports = router;
