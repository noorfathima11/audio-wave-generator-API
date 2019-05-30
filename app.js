const createError = require('http-errors')
const express = require('express')
const path = require('path')
const logger = require('morgan')
const bodyParser = require('body-parser')
const multer = require('multer')


const mongodb = require('mongodb')
const assert = require('assert')

const url = 'mongodb://localhost:27017/test'
//using the mongo driver
const mongoClient = require('mongodb').MongoClient
const objectId = require('mongodb').ObjectID

const {Readable} = require('stream')

const aboutRouter = require('./routes/about')
const soundWaveRouter = require('./routes/soundWave')

var app = express()


//Connect mongo driver to mongodb
let db
// specifying the connection URL and connecting the database
mongoClient.connect(url, (err, database) =>{
  if(err) {
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running.')
    process.exit(1)
  }
  db = database
})


// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use('*.js', (req, res, next) => {
  res.set('Content-Type', 'text/javascript')
  next();
})

app.use(bodyParser.urlencoded({extended: false}))
// parse json bodies
app.use(bodyParser.json())

/*app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With Content-Type, Accept, Authorization' )

  if(req.method === 'OPTIONS'){
      res.header('Access-Control-Allow-Methods', 'PUT, PATCH, POST, DELETE, GET')
      res.status(200).json({})

  }
  next()
})*/

app.use('/about', aboutRouter);
app.use('/soundwave', soundWaveRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
