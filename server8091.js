/**
 * The first server listens to port 8091
 */

var NODE_MODULES_PATH = '/usr/local/lib/node_modules/';
var PORT = 8091;


var io = require(NODE_MODULES_PATH + 'socket.io').listen(PORT);
var redis = require(NODE_MODULES_PATH + 'redis');

var RedisStore = require(NODE_MODULES_PATH + 'socket.io/lib/stores/redis');
var pub = redis.createClient();
var sub = redis.createClient();
var client = redis.createClient();

// use redis as store (default is memory)
io.set('store', new RedisStore({
      redisPub: pub,
      redisSub: sub,
      redisClient : client
}));




io.sockets.on('connection', function (socket) {

    // simple event: receive a msg and broadcast it to all clients
    socket.on('msg', function (data) {
        console.log('new message to broadcast');
        socket.broadcast.emit('msg', data);
    });
});
