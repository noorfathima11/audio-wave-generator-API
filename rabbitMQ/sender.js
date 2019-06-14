const amqp = require('amqplib/callback_api')
const readAudioData = require('../analysis/read-audio-data')
const receiverMQ = require('./receiver')

exports.send = (audioFilePath => {
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
  }, data = receiverMQ.receive())
})

/*exports.send = ((audioFilePath) => {
amqp.connect('amqp://localhost', (error, connection) => {
  connection.createChannel((error, channel) => {
    const queue = 'firstQueue'
    //const message = { type : '2', content : 'Hello RabbitMQ' }
    channel.assertQueue(queue, {durable: false})
    console.log('audioFilePath', audioFilePath)
    channel.sendToQueue(queue, Buffer.from(audioFilePath))
    console.log('message sent from sender')
  })
})
}, () => {
  return 'Message Sent!'
})*/

