const db = require("../database/dbconfig");

module.exports = {
  getPosts,
  getById,
  addPost,
  updatePost,
  deletePost,
  // insert,
};

function getPosts() {
  return db("posts");
}

function getById(id) {
  return db("posts").where({ id }).first();
}

async function addPost(newPost) {
  const [ id ]= await db("posts").insert(newPost);
  return getById(id)
}

async function updatePost(id, updatedPost) {
  await db("posts").update(updatedPost).where({ id });
  return getById(id)
}

function deletePost(id) {
  return db("posts").where({ id }).del();
}

function getPostsByUserId(userId){
  return db("posts").where({ reported_by: userId })
}

// function insert(post) {
//   return db("posts")
//     .insert(post, "id")
//     .then((ids) => ({ id: ids[0] }));
// }
