module.exports = {
  development: {
    username: process.env.DATABASE_ID,
    password: process.env.DATABASE_PASSWORD,
    database: "dallem_dev",
    host: "127.0.0.1",
    dialect: "mysql",
    logging: false,
  },
  test: {
    username: process.env.DATABASE_ID,
    password: process.env.DATABASE_PASSWORD,
    database: "dallem_test",
    host: "127.0.0.1",
    dialect: "mysql",
    logging: false,
  },
  production: {
    username: process.env.DATABASE_ID,
    password: process.env.DATABASE_PASSWORD,
    database: "dallem_produc",
    host: "127.0.0.1",
    dialect: "mysql",
    logging: false,
  },
  secret: {
    jwtKey: process.env.JWT_KEY,
  },
};
