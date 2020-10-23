const zipcodes = require("../data/zipcodes.json")

exports.seed = async function(knex) {
  

  await knex("zipcodes").insert(zipcodes);
  
};