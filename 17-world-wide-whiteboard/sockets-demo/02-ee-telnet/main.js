'use strict';
const net = require('net');
const EOL = require('os').EOL; // OS-based end-of-line character
const dEOL = EOL + EOL;
const _ = require('lodash');

const telnetServer = net.createServer();
const PORT = 8124;

let connectionPool = [];

telnetServer.listen(PORT, function () {
  console.log(`TCP server listening on ${PORT}`);
});

telnetServer.on('connection', function (connection) {

  connection.write('Welcome to the server! What is your name?' + dEOL);

  connection.on('data', extraNewline);
  connection.on('data', receiveName);

  connection.on('end', function () {
    // connection collection correction section
    connectionPool = _.without(connectionPool, connection);
  });

  function extraNewline () {
    connection.write(EOL);
  }

  function receiveName (name) {
    // add to collection of connections
    connection.name = name.toString().trim();
    connectionPool.push(connection);
    // from now on, new data to this connection results in chat messages
    connection.removeListener('data', receiveName);
    connection.on('data', sendMessage);
  }

  function sendMessage (message) {
    const chat = `${connection.name} says: ${message.toString().trim()}`;
    // send (push!) to other connected TCP sockets for them to see chat:
    _.without(connectionPool, connection).forEach(function (cnxn) {
      cnxn.write(chat + dEOL);
    });
    // also log to server for projected demo
    console.log(chat + EOL);
  }

});
