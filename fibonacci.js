/*jslint indent:2*/
'use strict';

// returns an array with the first n Fibonnaci numbers
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

// Returns the first n Fibonacci numbers
// @param n The number of Fibonacci numbers to return
// @param memoization true if you want to use cache, false otherwise
function recursiveFibonacci(n, memoization) {

  var cache = [1, 1],// memoization cache
    fib = [],
    i = 0,
    currentFib;

  // Returns the n-th Fibonacci number,
  // @param nth {number} The cardinal of the desired Fibonacci number
  // @param memoization {bool} true if you want to use memoization
  function nthFib(nth, memoization) {
    // we've calculated this element before
    if (true === memoization
        && cache[nth] && typeof cache[nth] === 'number') {
      return cache[nth];
    }

    // base cases, halting conditions
    if (0 === nth || 1 === nth) {
      return 1;
    }

    // Divide et impera
    currentFib = nthFib(nth - 1, memoization) + nthFib(nth - 2, memoization);
    if (true === memoization) {
      // add element to cache
      cache.push(currentFib);
    }
    return currentFib;
  }

  // add all Fibonacci numbers to an array.
  for (i = 0; i < n; i = i + 1) {
    // add the nth Fibonacdi number
    fib.push(nthFib(i, memoization));
  }

  return fib;
}

var prompt = require('prompt'),
  max,
  results,
  start,
  end,
  timeIter = 0,
  timeRecursive = 0,
  memoization;

console.log('How many Fibonacci numbers?');
prompt.get(['max', 'memoization'], function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Iterative:');
  start = new Date().getTime();
  results = iterFibonacci(parseInt(result.max, 10));
  end = new Date().getTime();
  console.log(results.join(', '));
  timeIter = end - start;

  results = [];
  start = 0;
  end = 0;

  memoization = ('true' === result.memoization ? true : false);
  console.log('Recursive:');
  start = new Date().getTime();
  results = recursiveFibonacci(parseInt(result.max, 10), memoization);
  end = new Date().getTime();
  console.log(results.join(', '));
  timeRecursive = end - start;

  console.log('TimeIter: ' + timeIter);
  console.log('TimeRecursive: ' + timeRecursive);

});