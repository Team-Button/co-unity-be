const moment = require("moment")

exports.up = async function (knex) {
    await knex.schema.createTable("users", (tbl) => {
        tbl.increments();
        tbl.string("name").notNullable();
        tbl.string("username").notNullable().unique();
        tbl.string("email").notNullable().unique();
        tbl.string("password").notNullable();
        tbl.timestamp("date_joined")
            .defaultTo(moment().format())
            .notNullable()
        tbl.string("avatar").nullable()
            .defaultTo("https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659650__340.png")
        tbl.string("zipcode")
            .notNullable()
            .references("zipcode")
            .inTable("zipcodes")
    });
  };
  
  exports.down = async function (knex) {
    await knex.schema.dropTableIfExists("users");
  };
  