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
    ...postgres,
    connection: process.env.DATABASE_URL,
    ssl: true
  },
  development: {
    ...postgres,
    connection: {
      database: "co-make-db",
      host: "127.0.0.1",
      password: process.env.DB_PASS,
      user: 'postgres'
    }
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
