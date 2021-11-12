module.exports = {
    producer: function async(event, context) {
        console.log("event occurs");
        // console.log(event);
        console.log(1);
        const { Kafka } = require("kafkajs");
        console.log(2);
        const kafka = new Kafka({
            clientId: "my-app",
            brokers: ["kafka.kubeless.svc:9092"],
            // brokers: ["localhost:9092"],
        });
        console.log(3);

        try {
          console.log("try");
            const producer = kafka.producer();
            // const run = async (data) => {
            // Producing

            // };
            console.log(4);
            const data = event["data"];
            // const data = { userId: "1234123dsfadf", a: 0.1, b: 0.2 };
            // const data = "data"
            console.log("data", data);
            producer.connect();
            console.log(5);
            producer.send({
                topic: "test-topic",
                messages: [{ value: null, data: data }],
            });
            console.log(6);
            process.exit();
            // axios.post("http://checkface.default.svc:8080", data).then((res) => {
            //     console.log(res);
            //     return "ok";
            // });
        } catch (error) {
          // console.log("");
            console.log("error",error);
            return "fail";
        }
    },
};
