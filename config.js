module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL || 'postgres://cdhjkykzawzvup:5a5a4b5260d9fba2096f67a2e71829be31f9e2e55e4fb747e3c96e02951169f2@ec2-174-129-231-100.compute-1.amazonaws.com:5432/d6uihs695i7ugr',
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://dunder_mifflin:a@localhost/blogful-test'
  }