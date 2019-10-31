const app = require('./app')
const {PORT, DATABASE_URL} = require('./config')
const knex = require('knex')

const db = knex({
  client: 'pg',
  connection: DATABASE_URL,
})

app.set('db', db)


if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})