
exports.seed = async function(knex) {
  
  await knex("votes").insert([
    {
      post_id: 1,
      voter_id: 1
    },
    {
      post_id: 1,
      voter_id: 2
    },
    {
      post_id: 2,
      voter_id: 1
    }
  ]);
  
};