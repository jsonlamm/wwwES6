'use strict';
/* global io */
$(function () {

  const socket = io(window.location.origin);
  const $main = $('main');
  const $input = $('input');

  // function createUserMessage (messageDetails) {
  //   return `<h3><span>${messageDetails.name}</span>: ${messageDetails.message}</h3>`;
  // }

  $input.on('keydown', function (event) {
    if (event.keyCode !== 13) return;
    const message = $input.val();
    $input.val(null);
    socket.emit('newMessage', message);
  });

  socket.on('connect', function () {
    console.log('new connection');
  });

  socket.on('chatMessage', function (message) {
    $main.append(`<span>${message.trim()} </span>`);
  });

});
