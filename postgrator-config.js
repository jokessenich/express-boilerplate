require('dotenv').config();

module.exports = {
  "migrationsDirectory": "migrations",
  "driver": "pg",
  "connectionString": ("postgresql://dunder_mifflin:a@localhost/noteful")
  ? process.env.TEST_DATABASE_URL
     : process.env.DATABASE_URL,
     "ssl": !!process.env.SSL,
}