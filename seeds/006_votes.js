const votesSeed = require("../data/votes.json")
exports.seed = async function(knex) {
  
  await knex("votes").insert(votesSeed);
  
};