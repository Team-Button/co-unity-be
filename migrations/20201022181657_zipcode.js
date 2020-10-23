exports.up = async function (knex) {
    await knex.schema.createTable("zipcodes", (tbl) => {
        tbl.increments("id");
        tbl.string("zipcode").unique();
    });
  };
  
  exports.down = async function (knex) {
    await knex.schema.dropTableIfExists("zipcodes");
  };
  