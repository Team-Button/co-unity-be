const posts = require("../posts/posts-model")

module.exports = {
    checkIfPostExists,
    validatePostReq,
    checkIfAuthorizedUser
}

async function checkIfPostExists(req, res, next) {

    const post = await posts.getPosts(req.params.id)

    if (!post) {
        res.status(404).json({ message: `Could not find post with id ${req.params.id}` })
    } else {

        req.user.post = {
            reporter_id: post.reporter_id
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

function checkIfAuthorizedUser(req, res, next){
    console.log(req.user.post.reporter_id)
    console.log(req.user.id)
    if(req.user.post.reporter_id === req.user.id){
      next();
    } else {
      res.status(403).json({ message: `This user id is not authorized to perform this action` })    
    }
 
 }
