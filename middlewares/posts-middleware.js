const db = require("../database/dbconfig")
const { getById } = require("../posts/post-model")

module.exports = {
    checkIfPostExist,
    validatePostReq
}

async function checkIfPostExist(req, res, next) {

    const post = await db.getById(req.params.id)

    if (!post) {
        res.status(404).json({ message: `Could not find post with id ${req.params.id}` })
    } else {
        
        req.user.post = {
            postId: post.id,
            reported_by: porst.reported_by
        }
        next()
    }

}

function validatePostReq(req, res, next){

    const { topic, description } = req.body

    if (!topic) {
        res.status(400).json({ message: `Topic is required` })
    } else if (!description){
        res.status(400).json({ message: `Description is required` })
    } else {
        next()
    }
}