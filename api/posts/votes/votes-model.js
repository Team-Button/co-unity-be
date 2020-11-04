const db = require("../../../database/dbconfig");

module.exports = {
    getVotes,
    addVote,
    removeVote,
    hasVoted
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