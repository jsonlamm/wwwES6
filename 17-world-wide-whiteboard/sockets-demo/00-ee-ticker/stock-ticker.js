'use strict';
const events = require('events'); // built-in library
const stockTicker = new events.EventEmitter();

// Using event emitters in Node.
{

  function randomElement (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  const companies = ['MSFT', 'GOOG', 'YHO', 'APP'];

  setInterval(function() {
    const company = randomElement(companies);
    const newRating = Math.floor(Math.random() * 1e3);
    stockTicker.emit('tick', company, newRating);
  }, 500);

}

module.exports = stockTicker;
