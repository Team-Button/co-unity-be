const express = require("express");
const db = require("./posts-model");
const router = express.Router();
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
  const { id } = req.params;

  db.getById(id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Could not find post with given id." });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to get post" });
    });
});

router.delete("/:id", (req, res) => {
  db.deletePost(req.params.id)
    .then((removed) => {
      res.status(200).json(removed);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to delete post" });
    });
});

router.put("/:id", (req, res) => {
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
