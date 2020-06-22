const bcrypt = require('bcryptjs')


exports.seed = async function(knex) {
  
  await knex("users").insert([
    {
      password: bcrypt.hashSync("12345678", 10),
      email: "test-admin@counity.com",
      name: "Test Admin",
      username: "testadmin000"
    },
    {
      password: bcrypt.hashSync("testing1", 10),
      email: "jg@counity.com",
      name: "Joshua Gray",
      username: "squashgray"
    },
    {
      password: bcrypt.hashSync("testing2", 10),
      email: "mb@counity.com",
      name: "Mashima Button",
      username: "zimashima"
    }
  ]);
  
};