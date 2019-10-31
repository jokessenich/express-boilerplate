const app = require('./app')
const {PORT, DATABASE_URL} = require('./config')
const knex = require('knex')

const db = knex({
  client: 'pg',
  connection: DATABASE_URL,
})

if (process.env.NODE_ENV === 'production') {
  // Exprees will serve up production assets
  app.use(express.static('client/build'));

  // Express serve up index.html file if it doesn't recognize route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.set('db', db)


app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})