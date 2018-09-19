"use strict"

const Promise = require('bluebird'),
    r = require('rethinkdb');

const rethinkConn = (options) => {
    return new Promise((resolve, reject) => {
        r.connect(options, function (err, conn) {
            if (err) {
                reject(err);
            } else {
                resolve(conn);
            }
        })
    })

}


module.exports = rethinkConn; 