'use strict';
const stockTicker = require('./stock-ticker');

stockTicker.on('tick', function(company, rating) {
  console.log(`Company ${company}\tRating ${rating}`);
});

let i = 0;

stockTicker.on('tick', function() {
  console.log('tick', ++i);
});
