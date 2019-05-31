const mongodb = require('mongodb')
const assert = require('assert')

const url = 'mongodb://localhost:27017/test'
//using the mongo driver
const mongoClient = require('mongodb').MongoClient
const objectId = require('mongodb').ObjectID

const {Readable} = require('stream')

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

exports.POSToperation = function () {
  
}
