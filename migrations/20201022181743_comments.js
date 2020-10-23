const moment = require("moment")

exports.up = async function (knex) {
    await knex.schema.createTable("comments", tbl=> {
        tbl.increments("id")
            .notNullable()
        tbl.string("comment")
            .notNullable()
        tbl.integer("post_id")
            .notNullable()
            .references("id")
            .inTable("posts")
        tbl.integer("user_id")
            .notNullable()
            .references("id")
            .inTable("users")
        tbl.timestamp("timestamp")
            .defaultTo(moment().format())
            .notNullable() 
    })
};
  
exports.down = async function (knex) {
    await knex.schema.dropTableIfExists("comments");
};
  