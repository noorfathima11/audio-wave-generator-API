const amqp = require('amqplib/callback_api')
const readAudioData = require('../analysis/read-audio-data')
const receiverMQ = require('./receiver')

let data

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
  /*setTimeout(() => {
    connection.close()
    process.exit(0) }, 500)*/
}, data = receiverMQ.receive())
})

/*exports.send = function(audioFilePath) {
  amqp.connect('amqp://localhost', (error, connection) => {
    connection.createChannel((error, channel) => {
      const queue = 'firstQueue'
      //const message = { type : '2', content : 'Hello RabbitMQ' }

      channel.assertQueue(queue, {durable: false})
      let dataRead
      console.log('audioFilePath', audioFilePath)
      dataRead = readAudioData.readData(audioFilePath)
      console.log('dataRead', dataRead)
    })
    setTimeout(() => {
      connection.close()
      process.exit(0) }, 500)
  })
}*/
