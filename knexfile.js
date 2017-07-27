module.exports = {
    development: {
    client: "pg",
    connection: {
      user: "muzwyokj",
      password: "b7M5v1UWrWF-6HtdUF8jMkHGJwWhAOup",
      database: "muzwyokj",
      host: "horton.elephantsql.com",
      port: "5432"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
}