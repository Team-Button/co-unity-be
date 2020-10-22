const moment = require("moment")

exports.up = async function (knex) {

    await knex.schema.createTable("categories", tbl=> {
        tbl.increments("id")
            .notNullable()
        tbl.string("category")
            .notNullable()
    })

    await knex.schema.createTable("posts", tbl => {
        tbl.increments("id")
            .notNullable()
        tbl.string("topic")
            .notNullable()
        tbl.text("description")
            .notNullable()
        tbl.integer("category_id")
            .references("id")
            .inTable("categories")
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
        tbl.boolean("is_archived")
            .defaultTo(false)
    })
    await knex.schema.createTable("comments", tbl=> {
        tbl.increments("id")
            .notNullable()
        tbl.string("comment")
            .notNullable()
        tbl.integer("user_id")
            .notNullable()
            .references("id")
            .inTable("users")
    })
};

exports.down = async function (knex) {
    await knex.schema.dropTableIfExists("comments")
    await knex.schema.dropTableIfExists("posts")
    await knex.schema.dropTableIfExists("categories")
    
};
