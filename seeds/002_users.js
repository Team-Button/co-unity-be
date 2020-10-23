const usersSeed = require("../data/users.json")
exports.seed = async function(knex) {

  await knex("users").insert(usersSeed);
  
};