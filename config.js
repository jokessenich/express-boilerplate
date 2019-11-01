module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'production',
    DATABASE_URL: process.env.DATABASE_URL || 'postgres://vlyxmrzrjcjwns:225bdde150daf87bf77c7184c67ed44fa6cef90776d93ceee4467b3a189e6452@ec2-174-129-253-28.compute-1.amazonaws.com:5432/db9iht3gfcosr4',
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://dunder_mifflin:a@localhost/blogful-test'
  }