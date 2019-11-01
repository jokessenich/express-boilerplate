require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('../config')
const notesRouter = require('./notes-route')
const foldersRouter = require('./folders-route')
const FoldersService = require('./folders-service')
const NotesService = require('./notes-service')
const bodyParser = require('body-parser')

const app = express()



  
const morganSetting = process.env.NODE_ENV === 'production' ? 'tiny' : 'common'

app.use(morgan(morganSetting))
app.use(helmet())
app.use(cors())
app.use(bodyParser.json())



app.use('/folders', foldersRouter)
app.use('/notes', notesRouter)

app.use((error, req, res, next) => {
  let response
  if (process.env.NODE_ENV === 'production') {
    response = { error: { message: 'server error' }}
  } else {
    response = { error }
  }
  res.status(500).json(response)
})



app.get('/', (req, res)=> {
    res.send('Hello, world!')
})



module.exports = app