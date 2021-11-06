const Redis = require("./redis");
let publisher = new Redis();

let channelName = "test";

publisher.publish(channelName, "hello!");
publisher.quit();
