const amqp = require('amqplib/callback_api')

exports.receive = function(){
  amqp.connect('amqp://localhost', (error, connection) => {
    connection.createChannel((error, channel) => {
      const queue = 'firstQueue'

      channel.assertQueue(queue, {durable:false})
      console.log(`waiting for messages in ${queue}`)
      channel.consume(queue, (audioData) => {
        console.log(`Received` + ' ' + audioData)
        //console.log(audioData)
      }, {noAck : true})
    })

  })
}

