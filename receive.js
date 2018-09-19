var amqp = require('amqplib/callback_api'),
	r = require('rethinkdb'),
	Promise = require('bluebird')




var connection = null;
r.connect({ host: '172.17.0.2', port: 28015 }, function (err, conn) {
	if (err) throw err;
	connection = conn;

	amqp.connect('amqp://localhost', function (err, conn) {
		conn.createChannel(function (err, ch) {
			var q = 'giveMeOOM';

			ch.assertQueue(q, { durable: true });
			ch.prefetch(1);

			ch.consume(q, function (msg) {
				r.table('livedata').insert({uglyData:msg.content.toString()})
					.run(connection, function (err, result) {
						if (err) throw err;
						console.log(JSON.stringify(result, null, 2));
					})
				ch.ack(msg);
			}, { noAck: false });

		});
	});




})
