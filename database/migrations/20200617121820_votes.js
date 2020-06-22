
exports.up = async function(knex) {
    await knex.schema.createTable("votes", tbl => {
        tbl.increments("id")
            .notNullable()
        tbl.integer("post_id")
            .references("id")
            .inTable("posts")
            .notNullable()
        tbl.integer("voter_id")
            .references("id")
            .inTable("voters")
            .notNullable()
    })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("votes")
};
