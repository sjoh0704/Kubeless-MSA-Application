const amqp = require("amqplib/callback_api");
const conf = require("./conf/rabbit-conf");
const url = `amqp://${conf.username}:${conf.password}@${conf.host}:${conf.port}`;
const queueName = "testqueue";
console.log(url);

amqp.connect(url, function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }

        var msg = {
            userId: "123",
            a: 0.1,
            b: 0.2,
        };

        channel.assertQueue(queueName, {
            durable: false,
        });

        channel.sendToQueue(queueName, Buffer.from(JSON.stringify(msg)));
        console.log(" [x] Sent %s", msg);
    });
});
