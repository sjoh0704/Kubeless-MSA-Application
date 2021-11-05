const conf = require('./conf/redis-conf');
const redis = require('redis');

module.exports = class {
  constructor() {
    this._setRedis();
  }

  _setRedis() {
    this._setRedisClient();

    //connect 성공
    this.client.on('connect', this._connectHandler);
  }

  _connectHandler() {
    console.log("#######Redis connection!");
  }

  _setRedisClient() {
    //redis client 생성
    this.client = redis.createClient(`redis://${conf.user}:${conf.password}@${conf.host}:${conf.port}`);
  }
   //event listener 등록
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

}