require("dotenv").config();

const postgres = {
  client: "pg",
  useNullAsDefault: true,
};

const sqlite = {
  client: "sqlite3",
  useNullAsDefault: true,
};

module.exports = {
  production: {
    ...sqlite,
    connection: {
      filename: "./database/comake.db3",
    },
    migrations: {
      directory: './database/migrations',
    },
  },
  development: {
    ...sqlite,
    connection: {
      filename: "./database/comake.db3",
    },
    migrations: {
      directory: './database/migrations',
    },
  },
  testing: {
    ...sqlite,
    connection: {
      filename: "./database/comake-test.db3",
    },
    migrations: {
      directory: './database/migrations',
    },
  },
  pool: {
    afterCreate: (conn, done) => {
      conn.run("PRAGMA foreign_keys = ON", done);
    },
  },
};
