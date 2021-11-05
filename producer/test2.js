const redis = require('redis');
const subscriber = redis.createClient();
const publisher = redis.createClient();
const msg_count = 0;

     // subscriber 객체가 구독을 시작할 때 발생하는 콜백 함수
     subscriber.on('subscribe', function (channel, count) {
         // 구독 시작 후 publisher 객체가 발행 하도록 함. (일치하는 채널만)
         publisher.publish('Goorm Channel', '발행자 첫번째 메시지');
         publisher.publish('Goorm Channel', '발행자 두번째 메시지');
         publisher.publish('Goorm Channel', '발행자 마지막 메시지');
     });

     // subscriber 객체가 메시지를 받으면 호출되는 함수
     subscriber.on('message', function (channel, message) {
         console.log('채널명: ' + channel + ', 메시지: ' + message);
         msg_count += 1;

         // 메시지를 3번 보냈을 시 subscriber 구독 종료, 구독/발행자 종료
         if (msg_count == 3) {
            subscriber.unsubscribe();
            subscriber.end();
            publisher.end();
         }
     });

     // Goorm Channel의 구독을 시작
     subscriber.subscribe('Goorm Channel');