/*jslint indent:2*/
'use strict';

var i,
  j,
  remaining,
  sortRandomNumbers = require('./sortRandomNumbers');

// push all elements of an array into another
Array.prototype.pushAll = function (valuesArray) {
  for (i = 0; i < valuesArray.length; i = i + 1) {
    this.push(valuesArray[i]);
  }
  return this;
};

function merge(left, right) {
  var mergedList = [],
    remaining = left.length + right.length,
    // keep a reference to the position of the next
    // element to be compared in each list
    idxLeft = 0,
    idxRight = 0,
    leftValue, // current element in the left list
    rightValue; // current element in the right list

  // add sentinels to both lists
  left.push(Number.POSITIVE_INFINITY);
  right.push(Number.POSITIVE_INFINITY);

  // while there are more elements in both lists
  for (j = 0; j < remaining; j = j + 1) {
    // find the smallest element of the two elements
    // at the specified positions of the lists

    // get the next element of each list
    leftValue = left[idxLeft];
    rightValue = right[idxRight];

    if (leftValue <= rightValue) {
      mergedList.push(leftValue);
      idxLeft = idxLeft + 1;
    } else {
      mergedList.push(rightValue);
      idxRight = idxRight + 1;
    }
  }

  return mergedList;
}

function sort(list) {
  var orderedList,
    middle,
    left,
    right;

  // if the list is of length one
  // it's already ordered
  if (1 === list.length) {
    return list;
  }

  // for lists with more than one element
  // find the middle of the list
  middle = Math.ceil(list.length / 2);

  // recursively sort the left and right parts of the list
  // the left list includes all elements from 0 to middle-1
  left = sort(list.slice(0, middle));
  // the right list includes all elements from middle to list.length
  right = sort(list.slice(middle, list.length));
  // then merge the result
  orderedList = merge(left, right);

  return orderedList;
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

list = [72, -4, -69, 5, 43];
console.log('Original:' + list);
console.log('Sorted:' + sort(list));

// test with random numbers
// sort using `sort` subroutine
sortRandomNumbers.sortRandomNumbers(sort, function (sortedList, time) {
  console.log('Sorted list:' + sortedList);
  console.log('Execution time:' + time);
});
