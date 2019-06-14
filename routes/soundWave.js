const express = require('express')
const router = express.Router()

//const senderMQ = require('../rabbitMQ/sender')
//const receiverMQ = require('../rabbitMQ/receiver')

const amqp = require('amqplib/callback_api')
const fs = require('fs')

const multer = require('multer')
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './uploads/')
  },
  filename: function(req, file, cb){
    console.log(file)
    const ext = file.mimetype.split('/')[1]
    cb(null, new Date().toISOString() + '-' + file.originalname)
  }
})

//polling
//scaling
//status
//ffmpeg
const fileFilter = (req, file, cb) => {
  if(!file){
    cb()
  }
  if(file.mimetype === 'wav'){
    cb(null, true)
  } else {
    cb({message: "File type not supported"}, false)
  }
}

const upload = multer({
  storage: storage
  //fileFilter: fileFilter
})

let finalData

router.get('/', (req, res, next) => {



})

router.post('/', upload.single('musicFile'), (req, res, next) => {
  console.log('received POST request')
  console.log(req.file)
  let audioFilePath = req.file.path
  //data = senderMQ.send(audioFilePath)
  //res.json({"wave-form-data" : data})
  //sender
  amqp.connect('amqp://localhost', (error, connection) => {
    connection.createChannel((error, channel) => {
      const queue = 'firstQueue'
      //const message = { type : '2', content : 'Hello RabbitMQ' }
      channel.assertQueue(queue, {durable: false})
      console.log('audioFilePath', audioFilePath)
      channel.sendToQueue(queue, Buffer.from(audioFilePath))
      console.log('message sent from sender')
    })
    setTimeout(() => {
      connection.close()
      process.exit(0) }, 500)
  })
  //receiver
  amqp.connect('amqp://localhost', (error, connection) => {
    connection.createChannel((error, channel) => {
      const queue = 'firstQueue'

      channel.assertQueue(queue, {durable:false})
      console.log(`waiting for messages in ${queue}`)
      channel.consume(queue, (audioFilePath) => {
      console.log(`Received` + ' ' + audioFilePath.content.toString())
      fs.readFile(audioFilePath.content.toString(), (err, data) => {
        if (err) throw err
        console.log('finalData', data)
        res.statusCode = 200
        res.json({"message": "Success"})
      })
      },{noAck : true})
    })
  })
})

module.exports = router

