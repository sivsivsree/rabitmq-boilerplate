const amqp = require('amqplib/callback_api'),
	r = require('rethinkdb'),
	Promise = require('bluebird'),
	ampqConn = require('./services/AMPQ'),
	rethinkConn = require('./services/RethinkConn')

const RETHINK = { host: '172.17.0.2', port: 28015 };

let streamProcess = async () => {

	try {
		let ch = await ampqConn({ host: 'amqp://localhost' });
		let rConn = await rethinkConn(RETHINK);



		var q = 'data_queue';
		ch.assertQueue(q, { durable: true });
		ch.prefetch(1);
		ch.consume(q, function (msg) {

			r.table('livedata').insert({ uglyData: msg.content.toString() })
				.run(rConn, function (err, result) {
					if (err) throw err;
				})

			ch.ack(msg);
		}, { noAck: false });

	} catch (err) {
		console.log(err)
	}
}



let listenChanges = async () => {
	let rConn = await rethinkConn(RETHINK);
	r.table('livedata').changes().run(rConn, function(err, cursor) {
		if (err) throw err;
		cursor.each(function(err, row) {
			if (err) throw err;
			console.log(JSON.stringify(row, null, 2));
		});
	});
}





streamProcess();
listenChanges();


