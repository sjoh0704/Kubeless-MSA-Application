const conf = require("./conf/redis-conf");
const redis = require("redis");

module.exports = class {
    constructor() {
        this._setRedis();
    }

    quit(callback) {
        this.client.quit(callback);
    }

    _setRedis() {
        this._setRedisClient();
        this.client.on("connect", this._connectHandler);
        this.client.on("error", this._errorHandler);
        this.client.on("end", this._endHandler);
    }

    _errorHandler(err) {
        console.error("######Redis connection Error!! >>", err);
    }
    on(event, callback) {
        this.client.on(event, callback);
    }
    //채널에 메세지 전송
    publish(channel, message) {
        this.client.publish(channel, message);
    }
    //채널 구독
    subscribe(channel) {
        this.client.subscribe(channel);
    }
    //채널 구독 취소
    unsubscribe(channel) {
        this.client.unsubscribe(channel);
    }

    _endHandler() {
        console.error("######Redis connection close!!");
    }

    _connectHandler() {
        console.log("#######Redis connection!");
    }

    _setRedisClient() {
        //redis client 생성
        this.client = redis.createClient(`redis://${conf.user}:${conf.password}@${conf.host}:${conf.port}`);
    }
};
