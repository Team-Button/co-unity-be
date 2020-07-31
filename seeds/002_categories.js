exports.seed = async function(knex) {
  
    await knex("categories").insert([
        {
            id: 1,
            category: "Public Safety"
        },
        {
            id: 2,
            category: "Construction"
        },
        {
            id: 3,
            category: "Animal Control"
        },
        {
            id: 4,
            category: "Housing Code"
        },
        {
            id: 5,
            category: "Public Health"
        },
        {
            id: 6,
            category: "Illegal Activities"
        }
    ])
};