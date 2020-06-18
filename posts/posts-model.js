const db = require("../database/dbconfig")

module.exports = {
    getPosts,
    addPost,
    updatePost,
    deletePost
}

function getPosts() {
    return db("posts")
}

function addPost(newPost) {
    return db("posts").insert(newPost)
}

function updatePost(id, updatedPost){
    return db("posts").update()
}

function deletePost(id){
    return db("posts").where({ id }).del()
}