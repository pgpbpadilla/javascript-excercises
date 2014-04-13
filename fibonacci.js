/*jslint indent:2*/
'use strict';

// returns an array with the first n fibonnaci numbers
// Uses an iterative algorithm
function iterFibonacci(n) {
  var i,
    fib;

  // the list cannot have less than 1 element
  if (n < 1) {
    // return the empty list
    return [];
  }

  // th first element is 1
  if (1 === n) {
    return [1];
  }

  // add the base cases
  fib = [1, 1];
  // iteratively add the Fibonacci numbers to an array
  for (i = 2; i < n; i = i + 1) {
    // F[i] = F[i-1] + F[i-2];
    fib.push(fib[i - 2] + fib[i - 1]);
  }

  return fib;
}

var prompt = require('prompt'),
  max;

console.log('How many Fibonacci numbers?');
prompt.get(['max'], function (err, result) {
  if (err) {
    console.log(err);
  }
  console.log(iterFibonacci(result.max));
});