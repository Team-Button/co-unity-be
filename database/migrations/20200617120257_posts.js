const moment = require("moment")

exports.up = async function (knex) {
    await knex.schema.createTable("posts", tbl => {
        tbl.increments("id")
            .notNullable()
        tbl.string("topic")
            .notNullable()
        tbl.text("description")
            .notNullable()
        tbl.timestamp("posted_date")
            .defaultTo(moment().format())
            .notNullable()     
        tbl.integer("reported_by")
            .notNullable()
            .references("id")
            .inTable("users")
        tbl.string("photo")
            .notNullable()
    })  
};

exports.down = async function (knex) {
    await knex.schema.dropTableIfExists("posts")
};
