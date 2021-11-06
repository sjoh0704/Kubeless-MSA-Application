const Redis = require("./redis");
let subscriber = new Redis();

let channelName = "test";

subscriber.subscribe(channelName);

subscriber.on("subscribe", (channel, count) => {
    console.log("구독완료");
    console.log(channel, count);
});

subscriber.on("message", (channel, message) => {
    console.log(channel, message);
});

setTimeout(() => {
    subscriber.unsubscribe(channelName);
    subscriber.quit();
}, 10000);
