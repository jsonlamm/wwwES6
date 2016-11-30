'use strict';
const express = require('express');
const path = require('path');
const socketio = require('socket.io');

const server = require('http').createServer();
const app = express();

server.listen(1337, function () {
  console.log('Server on port 1337');
});

server.on('request', app);

app.use(express.static(__dirname));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

let i = 0;

const io = socketio(server);

io.on('connection', function (socket) {

  console.log('new connection', ++i);

  socket.on('newMessage', function (message) {
    io.sockets.emit('chatMessage', message);
  });

});
