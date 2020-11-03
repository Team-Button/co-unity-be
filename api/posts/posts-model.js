const db = require("../../database/dbconfig");
const { getVotes } = require("./votes/votes-model")

module.exports = {
  getPosts,
  addPost,
  updatePost,
  deletePost,
  getPostsByUserId
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
    "posts.zipcode as zipcode",
    "categories.category as category", 
    "photo");
  
    if (id){
      return posts.where("posts.id", id).first().then(async (post) => {
        const postVotes = await getVotes(id)
        const postComments = await getComments(id)
        return {
          ...post,
          votes: postVotes,
          comments: postComments
        }
      })
    } else {
      return posts.then( resolvedPosts => {
        //getting a vote from each post
        const proms = resolvedPosts.map(async (post) => {
            const postVotes = await getVotes(post.id)
                return {
                    ...post,
                    votes: postVotes
                }
            })
        return Promise.all(proms)
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




