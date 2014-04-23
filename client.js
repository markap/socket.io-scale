/**
 * Client connects to server
 * receives and emits the 'msg' event
 */

var NODE_MODULES_PATH = '/usr/local/lib/node_modules/';
var PORT = 8090;
var HOST = 'http://localhost';

var port = parseInt(process.argv[2]) || PORT;

console.log('client connects to port ' + port);

var io = require(NODE_MODULES_PATH + 'socket.io-client');
var socket = io.connect(HOST + ':' + PORT);

socket.on('connect', function () {

    // send message to server
    socket.emit('msg', {'foo': 'bar'});

    // wait for messages
    socket.on('msg', function(data) {
        console.log('new message received');
    });
});
