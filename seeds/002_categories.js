exports.seed = async function(knex) {
  
    await knex("categories").insert([
        {
            category: "Public Safety"
        },
        {
            category: "Construction"
        },
        {
            category: "Animal Control"
        },
        {
            category: "Housing Code"
        }
    ])
};