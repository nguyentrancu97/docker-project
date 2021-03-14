let app = require('express')();
let http = require('http').Server(app);
console.log(http);
let io = require('socket.io')(http, {
    origin: "https://example.com", methods: ["GET", "POST"], allowEIO3: true
});
let Redis = require('ioredis');
let redis = new Redis();

redis.subscribe('chat-channel', function (err, count) {
});

redis.on('message', function (channel, message) {
    message = JSON.parse(message);
    io.emit(channel + ':' + message.event, message.data);
});

http.listen(81, function () {
    console.log('Listening on Port 9000');
});
