const postsSeed = require("../data/posts.json")
exports.seed = async function(knex) {
  
  await knex("posts").insert(postsSeed);
  
};