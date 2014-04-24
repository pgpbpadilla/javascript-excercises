/*jslint indent: 2*/
'use strict';

module.exports = (function () {
  function genRandNumbers(maxVal, next) {
    var random = require('node-random');

    random.numbers({
      number: maxVal,
      minimum: -maxVal,
      maximum: maxVal
    }, function (error, data) {
      if (error) {
        console.log(error);
      }
      next(data);
    });
  }

  function sortRandomNumbers(sortFunc, next) {
    var prompt = require('prompt'),
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

      genRandNumbers(parseInt(result.maxVal, 10), function (list) {
        console.log('Original list:' + list);
        // measure the execution time
        start = new Date().getTime();
        sortedList = sortFunc(list);
        end = new Date().getTime();
        time = end - start;
        next(sortedList, time);
      });
    });
  }
  return { genRandNumbers: genRandNumbers,
           sortRandomNumbers: sortRandomNumbers};
}());
