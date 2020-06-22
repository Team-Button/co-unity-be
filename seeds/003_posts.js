const moment = require("moment")

exports.seed = async function(knex) {
  
  await knex("posts").insert([
    {
      topic: "Pothole",
      description: "Please fix this pothole in front of my house!",
      reported_by: 1,
      posted_date: moment().format(),
      category_id: 2,
      photo: "xxx"
    },
    {
      topic: "Missing Cat",
      description: "Please help me find my cat",
      reported_by: 3,
      posted_date: moment().format(),
      category_id: 3,
      photo: "xxx"
    },
    {
      topic: "Found a cat, not sure whose",
      description: "I found this one cat and I'm looking for its owner",
      reported_by: 2,
      posted_date: moment().format(),
      category_id: 3,
      photo: "xxx"
    }
  ]);
  
};