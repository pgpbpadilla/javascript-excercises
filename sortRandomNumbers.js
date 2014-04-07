/*jslint indent: 2*/
'use strict';

module.exports = function (sortFunc, next) {
  var prompt = require('prompt'),
    maxVal,
    sign,
    j,
    list = [],
    start,
    end,
    time,
    sortedList;

  prompt.start();
  console.log('How many random numbers?');

  prompt.get(['maxVal'], function (err, result) {
    if (err) {
      console.log(err);
      process.exit(1);
    }

    maxVal = result.maxVal;
    for (j = 0; j < maxVal; j = j + 1) {
      sign = Math.random() > 0.5 ? 1 : -1;
      list.push(sign * Math.floor((Math.random() * maxVal) + 1));
    }

    // measure the execution time
    start = new Date().getTime();
    sortedList = sortFunc(list);
    end = new Date().getTime();
    time = end - start;

    console.log('Original list:' + list);
    next(sortedList, time);
  });
};