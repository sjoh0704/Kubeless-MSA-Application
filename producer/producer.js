const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

const run = async (data) => {
  // Producing
  await producer.connect();
  console.log(1)
  await producer.send({
    topic: "topic1",
    messages: [{ value: data }],
  });
  console.log(2)
  process.exit()
};



module.exports = {
    producer: function async(event, context) {
        const axios = require("axios");
        console.log(event);
        try {
            
            // const data = event["data"];
            const data = { userId: "1234123dsfadf", a: 0.1, b: 0.2 };
            run(data).catch(console.error);
            // axios.post("http://checkface.default.svc:8080", data).then((res) => {
            //     console.log(res);
            //     return "ok";
            // });
        } catch (error) {
            console.log(error);
            return "fail";
        }

        return "fail";
    },
};
