const db = require("../database/dbconfig");

module.exports = {
  getPosts,
  getById,
  addPost,
  updatePost,
  deletePost,
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
