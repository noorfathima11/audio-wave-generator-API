const mongodb = require('mongodb')
const assert = require('assert')

const url = 'mongodb://localhost:27017/soundWaveDB'


//Connect mongo driver to mongodb
let db
// specifying the connection URL and connecting the database
mongoClient.connect(url, (err, database) =>{
  assert.equal(null, err)
  db = database
})


