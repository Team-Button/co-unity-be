const db = require("../database/dbconfig");

module.exports = {
  getPosts,
  getById,
  addPost,
  updatePost,
  deletePost,
  insert,
};

function getPosts() {
  return db("posts");
}

function getById(id) {
  return db("posts").where({ id }).first();
}

function addPost(newPost) {
  return db("posts").insert(newPost);
}

function updatePost(id, updatedPost) {
  return db("posts").update();
}

function deletePost(id) {
  return db("posts").where({ id }).del();
}

function insert(post) {
  return db("posts")
    .insert(post, "id")
    .then((ids) => ({ id: ids[0] }));
}
