const commentsSeed = require("../data/comments.json")
exports.seed = async function(knex) {
  
  await knex("comments").insert(commentsSeed);
  
};