const amqp = require('amqplib/callback_api')
const fs = require('fs')

exports.receive = function(){
  amqp.connect('amqp://localhost', (error, connection) => {
    connection.createChannel((error, channel) => {
      const queue = 'firstQueue'

      channel.assertQueue(queue, {durable:false})
      console.log(`waiting for messages in ${queue}`)
      channel.consume(queue, (audioFilePath) => {
      console.log(`Received` + ' ' + audioFilePath.content.toString())
      fs.readFile(audioFilePath.content.toString(), (err, data) => {
        console.log('data', data)
        if (err) throw err
        console.log('data', data)
      })
      },{noAck : true})
    })
  })
}

