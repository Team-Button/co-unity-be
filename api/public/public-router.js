const express = require("express");
const router = express.Router()
const db = require("../posts/posts-model")

router.get("/", (req, res) => {
    db.getPosts()
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: "Error fetching post, please try again later"
            })
        })
})


router.get("/:id", (req, res) => {

    db.getPosts(req.params.id)
      .then((post) => {
        if (post) {
          res.status(200).json(post);
        } else {
          res.status(404).json({
            message: "Could not find post with given id."
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          error: "Failed to get posts"
        });
      });
  });


module.exports = router;