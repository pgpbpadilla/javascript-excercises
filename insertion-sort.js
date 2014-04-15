/*jslint indent:2*/
'use strict';

var sortRandomNumbers = require('./sortRandomNumbers');

function sort(list) {
  var i,
    j,
    key;

  // traverse the array from left to right
  // starting with the second element
  for (i = 1; i < list.length; i = i + 1) {
    // mark the current position so that
    // we'll have two partitions
    // left: [0,i], right: [i+1, list.length]
    key = list[i];

    // traverse the left partition of the array
    j = i - 1;
    // from right to left, while there are
    // elements at the left of the key
    while (j >= 0
        // and the key is lesser the current element
        && key < list[j]) {
      // move the current element to the right
      list[j + 1] = list[j];
      // scan next value to the left
      j = j - 1;
    }
    // the j-th element must be leq than the key
    // thus place the key next to it
    list[j + 1] = key;
  }
  return list;
}

var list = [2, 4, 9, 5, 3, 8, 7, 5];
console.log('Original:' + list);
console.log('Sorted:' + sort(list));

list = [72, 4, 69, 5, 43, 8, 7, 25];
console.log('Original:' + list);
console.log('Sorted:' + sort(list));

list = [72, 4, 69, 5, 43, 8, 7, 25, 0, -12, -45, 5, 7, -2];
console.log('Original:' + list);
console.log('Sorted:' + sort(list));

// test with random numbers
sortRandomNumbers.sortRandomNumbers(sort, function (sortedList, time) {
  console.log('Sorted list:' + sortedList);
  console.log('Execution time:' + time);
});
