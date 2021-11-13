module.exports = {
    producer: async (event, context) => {
        console.log("event occurs");
        const data = event.data;
        // const data = { userId: "1234123dsfadf", imageUrl: "adfadfadf" };
        const {userId, imageUrl} = data;
        const planeText = `${userId} ${imageUrl}`;

        if (!data || data == "") {
            return "data doesn't exist";
        }

        console.log(data);
        console.log("producer 시작");
        const { Kafka } = require("kafkajs");
        const kafka = new Kafka({
            clientId: "my-app",
            brokers: ["localhost:9092", "kafka.kubeless.svc:9092"],
        });

        const producer = kafka.producer();
        await producer.connect();
        console.log("보내기");
        await producer.send({
            topic: "test-topic",
            messages: [{ value: planeText }],
        });

        await producer.disconnect();
        console.log("producer 끝");
    },
};
