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
    connection: `postgresql://postgres:${process.env.POSTGRES_PASSWORD}@localhost:5432/postgres`
  },
  testing: {
    ...sqlite,
    connection: {
      filename: "./database/comake-test.db3",
    },
    migrations: {
      directory: './database/migrations',
    },
  }
};
