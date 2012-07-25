/**
 * The server
 */

var NODE_MODULES_PATH = '/usr/local/lib/node_modules/';
var PORT = 8090;

var port = process.argv[2] || PORT;

console.log('server listens on port ' + port);


var io = require(NODE_MODULES_PATH + 'socket.io').listen(port);
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
