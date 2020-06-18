const db = require("../database/dbconfig");

module.exports = {
  findUsers,
  add,
  findBy,
  findById,
};

function findUsers() {
  return db("users").select("id", "username", "email", "password");
}

function findBy(filter) {
  return db("users")
    .select("id", "username", "password", "email")
    .where(filter);
}

function add(user) {
  return db("users")
    .insert(user, "id")
    .then((ids) => {
      const [id] = ids;
      return findById(id);
    });
}

// function add(user) {
//   return db("users").insert(user);
// }

function findById(id) {
  return db("users").select("id", "username").where({ id }).first();
}
