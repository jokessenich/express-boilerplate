module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL || 'postgres://mzpypmbnhxtoxw:4f71a69e58597e8ce28212fad64c74fe78627153675142a82db79e97f79a8738@ec2-174-129-253-101.compute-1.amazonaws.com:5432/d8k2597jhq751d',
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://dunder_mifflin:a@localhost/blogful-test'
  }