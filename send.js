var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function (err, conn) {
  conn.createChannel(function (err, ch) {
    const QUEUE = 'new_task';




    let i = 0;
    setInterval(() => {
      msg = 'Message ' + i;
      ch.assertQueue(QUEUE, { durable: true });
      ch.sendToQueue(QUEUE, Buffer.from(msg), { persistent: true });
      i++;
      console.log(" [x] Sent %s", msg);
    }, 100);


  })

});