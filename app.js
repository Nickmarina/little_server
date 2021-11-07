const express = require('express');
const logger = require('morgan');
const cors = require('cors')

const mainRouter = require('./routes/index');
const {errorHandler} = require('./middlewares/errors')
const app = express();


const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use(express.static('public'))
app.use('/', mainRouter)
app.use(errorHandler)

module.exports = app