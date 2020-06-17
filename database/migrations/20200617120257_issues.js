const moment = require('moment')

exports.up = async function (knex) {
    await knex.schema.createTable("issues", tbl => {
        tbl.increments("id")
            .notNullable()
        tbl.string("topic")
            .notNullable()
        tbl.text("description")
            .notNullable()
        tbl.string("posted_date")
            .defaultTo(moment().format("YYYY-MM-DD HH:mm:ss"))
            .notNullable()
            .unique()       
        tbl.integer("reported_by")
            .reference("id")
            .inTable("users")
            .notNullalbe()
        tbl.photo("string")
            .notNullable()
    })  
};

exports.down = async function (knex) {
    await knex.schema.dropTableIfExists("issues")
};
