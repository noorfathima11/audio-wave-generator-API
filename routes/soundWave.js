const express = require('express')
const router = express.Router()

//const readAudioData = require('../analysis/read-audio-data')
//const mongodb = require('mongodb')
const mongoClient = require('mongodb').MongoClient
const assert = require('assert')
// const objectId = require('mongodb').ObjectID

const multer = require('multer')
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './uploads/')
  },
  filename: function(req, file, cb){
    cb(null, new Date().toISOString() + '-' + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'audio/wav'){
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const upload = multer({
  storage: storage,
  //fileFilter: fileFilter
})

//const {Readable} = require('stream')

const url = 'mongodb://localhost:27017/soundWaveDB'

//const soundWaveDBOperations = require('../database-operations/soundWave-DBoperations')
//const aboutDBOperations = require('assert')

//const soundWaveModel = require('../models/soundWave-model')

router.get('/', (req, res, next) => {
    let resultArray = []
    let db
    mongoClient.connect(url, function(err, database){
      assert.equal(null, err)
      db = database.db('soundWaveDB')
     /*const findAudioFile = db.collection('audioFile').find({}, {musicFile: 1, _id: 0}).toArray(function(err, docs){
        console.log(docs)
      })
      console.log('here', Object.keys(findAudioFile).length)
      console.log('findAudioFile', findAudioFile)*/

      const pointer = db.collection('audioFile').find()
      pointer.forEach(function(doc, err){
        assert.equal(null,err)
        console.log('dochere', typeof(doc))
        //readAudioData.readData(doc)
        resultArray.push(doc)
      }, function(){
        database.close()
        res.status(200).json({
          message : "Waveform data was fetched",
          resultArray : resultArray
      })
      })
    })
})

router.post('/', upload.single('musicFile'), (req, res, next) => {
    console.log(req.file)
    const itemToInsert = {
        filename: req.body.filename,
        format: req.body.format,
        musicFile: req.file.path
    }
    let db
    mongoClient.connect(url, function(err, database){
      assert.equal(null, err)
      db = database.db('soundWaveDB')
      db.collection('audioFile').insertOne(itemToInsert, function(err, result){
        assert.equal(null, err)
        console.log('item inserted')
        database.close()
      })

    })
    res.status(201).json({
        message: "This DB is designed and data fetched from the DB",
        itemInserted : itemToInsert
    })
})

module.exports = router

