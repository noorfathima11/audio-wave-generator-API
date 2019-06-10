const amqp = require('amqplib/callback_api')
const readAudioData = require('../analysis/read-audio-data')
const receiverMQ = require('./receiver')

/*exports.send = (audioFilePath => {
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
}, receiverMQ.receive())
})*/

exports.send = function(audioFilePath) {
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
}
