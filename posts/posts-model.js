const db = require("../database/dbconfig");

module.exports = {
  getPosts,
  addPost,
  updatePost,
  deletePost,
  getVotes,
  addVote,
  removeVote,
  hasVoted
};

function getPosts(id) {

  let posts = db("posts")
  .leftJoin("users", "posts.reported_by","users.id")
  .leftJoin("categories", "posts.category_id", "categories.id")
  .leftJoin("votes", "posts.id", "votes.post_id")
  .select(
    "posts.id", 
    "topic", 
    "description", 
    "posted_date",
    "users.id as reporter_id",
    "users.name as reporter", 
    "categories.category as category", 
    "photo");
  
    if (id){
      return posts.where("posts.id", id).first().then(async (post) => {
        const postVotes = await getVotes(id)
        return {
          ...post,
          votes: postVotes
        }
      })
    } else {
      return posts.then( posts => {
        const promise = posts.map( post => {
          return getVotes(post.id).then(postVotes => {
            return {
              ...post,
              votes: postVotes
              }
          })
        })
        return Promise.all(promise)
      })
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


//voting mechanisms

function getVotes(postId){
  return db("votes").where("post_id", postId).select("id","voter_id")
}

async function addVote(postId, userId){
  await db("votes").insert({ post_id: postId, voter_id: userId })
  return getVotes(postId)
}

async function removeVote(postId, userId){
  await db("votes").where({ post_id: postId, voter_id: userId }).del()
  return getVotes(postId)
}

function hasVoted(postId, userId){
  return db("votes").where({ post_id: postId, voter_id: userId }).first()
}