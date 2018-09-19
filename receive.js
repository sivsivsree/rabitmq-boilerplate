var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function (err, conn) {
    conn.createChannel(function (err, ch) {
        var q = 'new_task';

        ch.assertQueue(q, { durable: true });
        ch.prefetch(1);

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);

        ch.consume(q, function (msg) {
            console.log(" [x] Received %s", msg.content.toString());
            ch.ack(msg);
        }, { noAck: false });

    });
});
