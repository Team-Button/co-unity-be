const express = require("express");
const db = require("./votes-model");
const router = express.Router();

router.post("/", async (req, res) => {
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
  
router.delete("/", async (req, res) => {
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