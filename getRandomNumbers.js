/*jslint indent: 2*/
'use strict';

module.exports = function (next) {
  var prompt = require('prompt'),
    maxVal,
    j,
    list = [];

  prompt.start();
  console.log('How many random numbers?');

  prompt.get(['maxVal'], function (err, result) {
    if (err) {
      console.log(err);
      process.exit(1);
    }

    maxVal = result.maxVal;
    for (j = 0; j < maxVal; j = j + 1) {
      list.push(Math.floor((Math.random() * maxVal) + 1));
    }
    next(list);
  });
};