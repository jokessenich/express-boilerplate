module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL || 'postgres://zrwvolqkgzrpfb:709b819f9a8fbefd372b127712acd9aa567739ca9bd1b14f4c318c10d40515c7@ec2-54-235-250-38.compute-1.amazonaws.com:5432/dhn9ucgfee4r9',
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://dunder_mifflin:a@localhost/blogful-test'

  }