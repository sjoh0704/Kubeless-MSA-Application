const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["kafka.kubeless.svc:9092"],
  // brokers: ["localhost:9092"]
});

const producer = kafka.producer();

const run = async (data) => {
  // Producing
  console.log("run!!");
  await producer.connect();
  await producer.send({
    topic: "test-topic",
    messages: [{ value: null, data: data }],
  });
  process.exit()
};



module.exports = {
    producer: function async(event, context) {
      console.log("event occurs")

        // const axios = require("axios");
        console.log(event);
        try {
            
            const data = event["data"];
            // const data = { userId: "1234123dsfadf", a: 0.1, b: 0.2 };
            // const data = "data"
            console.log(data);
            run(data).catch((e)=>{
              console.log(e);
              process.exit()
            }); 
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
