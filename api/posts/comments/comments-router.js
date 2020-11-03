const express = require("express");
const db = require("./comments-model");
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const comments = await db.addComment(req.params.id, req.body)
        res.status(200).json(comments)
    } catch (error) {
        res.status(500).json({
        message: `Failed to update vote due to ${error}`
        })
    }
})

router.put("/", async (req, res) => {
    try {
        const comments = await db.editComment(req.params.id, req.body)
        res.status(200).json(comments)
    } catch (error) {
        res.status(500).json({
        message: `Failed to update vote due to ${error}`
        })
    }
})

router.delete("/", async (req, res) => {
    try {
        await db.deleteComment(req.params.id)
        res.status(200).json({ message: `Successfully deleted` })
    } catch (error) {
        res.status(500).json({
        message: `Failed to update vote due to ${error}`
        })
    }
})

module.exports = router;