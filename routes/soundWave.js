const express = require('express')
const router = express.Router()
const path = require('path')

//const senderMQ = require('../rabbitMQ/sender')
//const receiverMQ = require('../rabbitMQ/receiver')

const amqp = require('amqplib/callback_api')
const fs = require('fs')

const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
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
  if (!file) {
    cb()
  }
  if (file.mimetype === 'wav') {
    cb(null, true)
  } else {
    cb({
      message: "File type not supported"
    }, false)
  }
}

const upload = multer({
  storage: storage
  //fileFilter: fileFilter
})

let finalData

/*router.post('/', upload.single('musicFile'), (req, res, next) => {
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
      channel.assertQueue(queue, {
        durable: false
      })
      console.log('audioFilePath', audioFilePath)
      channel.sendToQueue(queue, Buffer.from(audioFilePath))
      console.log('message sent from sender')
    })
    setTimeout(() => {
      connection.close()
      process.exit(0)
    }, 500)
  })
  //receiver
  amqp.connect('amqp://localhost', (error, connection) => {
    connection.createChannel((error, channel) => {
      const queue = 'firstQueue'

      channel.assertQueue(queue, {
        durable: false
      })
      console.log(`waiting for messages in ${queue}`)
      channel.consume(queue, (audioFilePath) => {
        console.log(`Received` + ' ' + audioFilePath.content.toString())
        fs.readFile(audioFilePath.content.toString(), (err, data) => {
          if (err) throw err
          console.log('finalData', data)
          res.statusCode = 200
          res.json({
            "data": "data is sent",
            //"dataLength": data.length
          })
        })
      }, {noAck: true})
    })
  })
})*/

/*router.post('/', upload.single('musicFile'), (req, res, next) => {
  console.log('received POST request')
  console.log(req.file)
  let audioFilePath = req.file.path
  //data = senderMQ.send(audioFilePath)
  //res.json({"wave-form-data" : data})
  //sender
  amqp.connect('amqp://localhost', (error, connection) => {
    connection.createChannel((error, channel) => {
      const queue = 'taskQueue'
      //const message = { type : '2', content : 'Hello RabbitMQ' }
      channel.assertQueue(queue, {
        durable: true
      })
      console.log('audioFilePath', audioFilePath)
      channel.sendToQueue(queue, Buffer.from(audioFilePath), {
        persistant : true
      })
      console.log('message sent from sender')
    })
    setTimeout(() => {
      connection.close()
      process.exit(0)
    }, 500)
  })
  //receiver
  amqp.connect('amqp://localhost', (error, connection) => {
    connection.createChannel((error, channel) => {
      const queue = 'taskQueue'
      channel.assertQueue(queue, {
        durable : true
      })
      channel.prefetch(1)
      console.log(`waiting for messages in ${queue}`)
      channel.consume(queue, (audioFilePath) => {
        console.log(`Received` + ' ' + audioFilePath.content.toString())
        fs.readFile(audioFilePath.content.toString(), (err, data) => {
          if (err) throw err
          console.log('finalData', data)
          res.statusCode = 200
          res.json({
            "data": "data is sent",
            //"dataLength": data.length
          })
        })
      }, {noAck: false})
    })
  })
})*/

router.post('/', upload.single('musicFile'), (req, res, next) => {
  console.log('received POST request')
  console.log(req.file)
  let audioFilePath = req.file.path
  //data = senderMQ.send(audioFilePath)
  //res.json({"wave-form-data" : data})

  //rpc-server
  amqp.connect('amqp://localhost', (error0, connection) => {
    if(error0) throw error1
    
    connection.createChannel((error1, channel) => {
      if(error1) throw error1
      
      const queue = 'rpcQueue'
      
      channel.assertQueue(queue, {
        durable : false
      })
      channel.prefetch(1)

      console.log(`awaiting RPC requests in ${queue}`)

      channel.consume(queue, function reply(audioFilePath){
        console.log(`Received` + ' ' + audioFilePath.content.toString())
        fs.readFile(audioFilePath.content.toString(), (err, data) => {
          if (err) throw err
          console.log('finalData', data)
          channel.sendToQueue(audioFilePath.properties.replyTo, 
            Buffer.from(data.toString()), {
              correlationId: audioFilePath.properties.correlationId
            })
          channel.ack(audioFilePath)
          res.json({
            "data" : data
          })
        })
      })
    })
  })

  //rpc-client
  amqp.connect('amqp://localhost', (error0, connection) => {
    if(error0) throw error0
    connection.createChannel((error1, channel) => {
      if(error1) throw error1
      //const message = { type : '2', content : 'Hello RabbitMQ' }
      channel.assertQueue('', {
        exclusive : true
      }, function(error2, q){
        if(error2) throw error2
        
        let correlationId = generateUuid()

        console.log('audioFilePath', audioFilePath)
        channel.consume(q.queue, function(msg){
          if(msg.properties.correlationId === correlationId){
            //console.log('received msg', msg)
            setTimeout(function(){
              connection.close()
              process.exit(0)
            }, 500)
          }
        }, {
          noAck : true
        })
      
        channel.sendToQueue('rpcQueue', Buffer.from(audioFilePath), {
        correlationId: correlationId,
        replyTo: q.queue
        })
        console.log('message recieved in client')
      })
    })
  })

  function generateUuid(){
    return Math.random().toString() + 
           Math.random().toString() + 
           Math.random().toString()
  }
})

module.exports = router
