const express = require("express");
const db = require("./posts-model");
const router = express.Router();
const {
  checkIfPostExists,
  checkIfAuthorizedUser,
  validatePostReq
} = require("../../middlewares/posts-middleware")
router.use(express.json());

router.get("/", (req, res) => {
  db.getPosts()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(500).json({
        message: `Failed to get posts ${error}`
      });
    });
});

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

router.get("/myposts", (req, res) => {

  db.getByUserId(req.user.id)
    .then((posts) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Failed to get posts"
      });
    });
});


//validatePostReq middleware will valiate the req.body to make sure it has all needed
router.post("/", validatePostReq, (req, res) => {

  db.addPost({
      ...req.body,
      reported_by: req.user.id
    })
    .then((addedPost) => {
      res.status(201).json(addedPost);
    })
    .catch((error) => {
      res.render(error);
      res.render.status(500).json({
        message: "There was an error while saving the post to the database",
      });
    });

});

//checkIfPostExists will check if a certain post exists in the database
//checkIfAuthorizedUser will check if the person that was tyring to delete or put is the person that created the post

router.delete("/:id", checkIfPostExists, checkIfAuthorizedUser, (req, res) => {

  db.deletePost(req.params.id)
    .then((removed) => {
      res.status(200).json({
        message: `Post id ${req.params.id} has been deleted`
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Failed to delete post"
      });
    });

});

router.put("/:id", checkIfPostExists, checkIfAuthorizedUser, (req, res) => {

  db.updatePost(req.params.id, req.body)
    .then((edit) => {
      res.status(200).json(edit);
    })
    .catch((error) => {
      res.status(500).json({
        message: `Failed to update post ${error}`
      });
    });
});

//vote mechanism
//"api/posts/:id/vote" , post and delete

router.post("/:id/vote", checkIfPostExists, async (req, res) => {

  try {
    const voteExists = await db.hasVoted(req.params.id, req.user.id)
    if (voteExists) {
      res.status(400).json({
        message: `Cannot vote for post id ${req.params.id} twice!`
      })
    } else {
      const votes = await db.addVote(req.params.id, req.user.id)
      res.status(200).json(votes)
    }

  } catch {
    res.status(500).json({
      message: `Failed to update vote due to ${error}`
    })
  }
})

router.delete("/:id/vote", checkIfPostExists, async (req, res) => {

  try {
    const voteExists = await db.hasVoted(req.params.id, req.user.id)
    if (voteExists) {
      await db.removeVote(req.params.id, req.user.id)
      res.status(200).json({
        message: `Successfully remove your vote from ${req.params.id}`
      })
    } else {
      res.status(400).json({
        message: `You cannot perform this action twice`
      })
    }


  } catch {
    res.status(500).json({
      message: `Failed to update vote due to ${error}`
    })
  }
})

module.exports = router;