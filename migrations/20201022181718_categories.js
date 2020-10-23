exports.up = async function (knex) {

    await knex.schema.createTable("categories", tbl=> {
        tbl.increments("id")
            .notNullable()
        tbl.string("category")
            .notNullable()
    })
}

exports.down = async function (knex) {
    await knex.schema.dropTableIfExists("categories");
};
  