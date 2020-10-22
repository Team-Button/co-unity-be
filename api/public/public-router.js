const express = require("express");
const router = express.Router()
const db = require("./public-model")

router.get("/", (req, res) => {
    db.getPublicPosts()
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



module.exports = router;