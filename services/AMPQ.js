"use strict"

const amqp = require('amqplib/callback_api'),
    Promise = require('bluebird');

const getAMQP = (options) => {
    return new Promise((resolve, reject) => {
        amqp.connect(options.host, function (err, conn) {
            if (err) {
                reject(err);
            } else {
                conn.createChannel(function (err, channel) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(channel);
                    }

                })
            }
        });
    })

}







module.exports = getAMQP; 