const amqpcm = require('amqp-connection-manager');
const amqp = require('amqplib/callback_api');
let connection,
    amqp_conn,
    amqp_chanel,
    channelWrapper;
let init = async function () {
    let queueName = "amqpcmDemo";
    connection = await amqpcm.connect('amqp://localhost');
    channelWrapper = await connection.createChannel({
        json: true,
        setup: function (channel) {
            return channel.assertQueue(queueName, {
                durable: false
            })
        }
    });
    // let amqp_url = sprintf("amqp://%s:%d","localhost", 5672);
    // try {
    //     amqp_conn = await amqp_connect_promise(amqp_url);
    //     amqp_chanel = await amqp_createChannel_promise(amqp_conn);
    //     amqp_chanel.assertQueue(queueName, {
    //         durable: false
    //     });
    // } catch (error) {
    //     log.error(error);
    // }
    // let msgObj = {
    //     name: "amqpcm"
    // };
    let stratTime = new Date();
    for (let i = 0; i < 500000; i++) {
        let msgObj = {
            index :i,
            poll_type: "polling",
            neid: 2857,
            resourcestate: 0,
            hostname: "10.10.10.10",
            poll_enabled: 1,
            last_polling_time: "2018-03-13T06:08:00.000Z",
            poll_interval: 60,
            polling_templates:
                [{
                    type: "ICMP",
                    config: {
                        timeout: 5,
                        retries: 1
                    }
                }],
            node_abilities:
                [{
                    protocol: "ICMP",
                    call_type: "static",
                    name: "icmpPing"
                }],
            timestamp: 1520921350,
            queueName: "nepoll_result"
        };

        let msg = JSON.stringify(msgObj);
        amqpcm_send(queueName, msg);
        // amqp_send(queueName, msg).then(function () {
        //     console.log("Message was sent!  Hooray!",msgObj.index);
        // });

    }
    // let endTime = new Date();
    // console.log(endTime-stratTime);

};


function amqpcm_send(queueName, msg) {
    //console.log("send msg :", JSON.parse(msg).index);
    let msg1 = new Buffer(msg);
    channelWrapper.sendToQueue(queueName, msg1)
        .then(function () {
            return console.log("Message was sent!  Hooray!",JSON.parse(msg).index);
        }).catch(function (err) {
        return console.log("Message was rejected...  Boo!");
    });
}
function amqp_send(topic, payload) {
    let queueName = topic;
    let msg = new Buffer(payload);
    return new Promise(function (resolve, reject) {
        resolve(amqp_chanel.sendToQueue(queueName, msg));
    });
}

function amqp_createChannel_promise(amqp_conn) {
    return new Promise(function (resolve, reject) {
        amqp_conn.createChannel(function (err, mq_ch) {
            if (err) {
                reject(err);
            }
            resolve(mq_ch);
        });
    });
}

function amqp_connect_promise(amqp_url) {
    return new Promise(function (resolve, reject) {
        amqp.connect(amqp_url, function (err, mq_conn) {
            if (err) {
                reject(err);
            }
            resolve(mq_conn);
        });
    });
}

exports.init = init;