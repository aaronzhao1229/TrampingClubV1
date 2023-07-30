const path = require('path')

module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: 'localhost',
      user: 'root',
      password: 'test1234!',
      database: 'test',
    },
    useNullAsDefault: true,
  },

  test: {
    client: 'mysql2',
    connection: {
      host: 'localhost',
      user: 'root',
      password: 'test1234!',
      database: 'unittest',
    },
    useNullAsDefault: true,
    seeds: {
      directory: path.join(__dirname, 'seeds'),
    },
    migrations: {
      directory: path.join(__dirname, 'migrations'),
    },
  },

  // to be updated
  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
}
