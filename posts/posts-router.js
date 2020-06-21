const express = require("express");
const db = require("./posts-model");
const router = express.Router();
const { checkIfPostExists, checkIfAuthorizedUser ,validatePostReq } = require("../middlewares")
router.use(express.json());

router.get("/", (req, res) => {
  db.getPosts()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to get posts" });
    });
});

router.get("/:id", (req, res) => {

  db.getById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Could not find post with given id." });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to get posts" });
    });
});

router.get("/myposts", (req, res) => {

  db.getByUserId(req.user.id)
    .then((posts) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to get posts" });
    });
});

router.post("/", validatePostReq, (req, res) => {

  db.addPost({ ...req.body, reported_by: req.user.id })
    .then((addedPost) => {
      res.status(201).json(addedPost);
    })
    .catch((error) => {
      res.render(error);
      res.render.status(500).json({
        error: "There was an error while saving the post to the database",
      });
    });
    
});

router.delete("/:id", checkIfPostExists, checkIfAuthorizedUser, (req, res) => {

  db.deletePost(req.params.id)
    .then((removed) => {
      res.status(200).json(removed);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to delete post" });
    });
});

router.put("/:id", checkIfPostExists, checkIfAuthorizedUser, (req, res) => {

  const { description, topic } = req.body;

  const newContent = { description, topic };

  db.updatePost(req.params.id, newContent)
    .then((edit) => {
      res.status(200).json(edit);
    })
    .catch((error) => {
      res.status(500).json({ message: "Failed to update post" });
    });
});

module.exports = router;
