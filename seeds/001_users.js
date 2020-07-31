const bcrypt = require('bcryptjs')


exports.seed = async function(knex) {
  
  await knex("users").insert([
    {
      password: bcrypt.hashSync("testing1234", 10),
      email: "test@counity.com",
      name: "Test User",
      username: "counity-test"
    },
    {
      password: bcrypt.hashSync("testing00", 10),
      email: "mb@counity.com",
      name: "Mashima Button",
      username: "zimashima"
    },
    {
      password: bcrypt.hashSync("testing1", 10),
      email: "jg@counity.com",
      name: "Joshua Gray",
      username: "squashgray"
    },
    {
      password: bcrypt.hashSync("karenina123", 10),
      email: "karen@karen.com",
      name: "Karen Karenina",
      username: "karenina"
    },
    {
      password: bcrypt.hashSync("notcarolebaskin", 10),
      email: "haroldbaskin@gmail.com",
      name: "Harold Baskin",
      username: "haroldbaskin"
    },
    {
      password: bcrypt.hashSync("joel", 10),
      email: "joelexotic@je.com",
      name: "Joel Exotic",
      username: "joelexotic"
    },
    {
      password: bcrypt.hashSync("derperina", 10),
      email: "derapinamcgee@gmail.com",
      name: "Dera Pina",
      username: "derapina"
    },
    {
      password: bcrypt.hashSync("theofficeforever", 10),
      email: "michaelscott@dundlemuffin.com",
      name: "Michael Scott",
      username: "michaeltheoffice"
    }
  ]);
  
};