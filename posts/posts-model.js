const db = require("../database/dbconfig");

module.exports = {
  getPosts,
  addPost,
  updatePost,
  deletePost,
};

function getPosts(id) {
  let posts = db("posts")
  .leftJoin("users", "posts.reported_by","users.id")
  .leftJoin("categories", "posts.category_id", "categories.id")
  .select(
    "posts.id", 
    "topic", 
    "description", 
    "posted_date",
    "users.id as reporter_id",
    "users.name as reporter", 
    "categories.category as category", 
    "photo");

  if (id) {
    return posts.where("posts.id", id).first()
  } else {
    return posts
  }
}

async function addPost(newPost) {
  const [ id ]= await db("posts").insert(newPost);
  return getPosts(id)
}

async function updatePost(id, updatedPost) {
  await db("posts").update(updatedPost).where({ id });
  return getPosts(id)
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
