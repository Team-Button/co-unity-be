const db = require("../../../database/dbconfig");

module.exports = {
    getComments,
    addComment,
    editComment,
    deleteComment
}

async function addComment(postId, payload) {
    await db("comments").insert(payload).where("post_id", postId)
    return getComments(postId)
}

async function editComment(postId, payload) {
    await db("comments").update(payload).where("post_id", postId)
    return getComments(postId)
}

function deleteComment(postId) {
    return db("comments").where("post_id", postId).del()
}

function getComments(postId){
    return db("comments")
    .join("users", "comments.user_id","users.id")
    .where("post_id", postId)
    .select(
      "comments.user_id",
      "comment",
      "comments.id as comment_id",
      "users.name as commentor",
      "users.avatar as commentor_avatar"
    )
  }