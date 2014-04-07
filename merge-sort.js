/*jslint indent:2*/
'use strict';

var i,
  j,
  maxVal,
  orderedList,
  start,
  end,
  time,
  getRandomNumbers = require('./getRandomNumbers');

// push all elements of an array into another
Array.prototype.pushAll = function (valuesArray) {
  for (i = 0; i < valuesArray.length; i = i + 1) {
    this.push(valuesArray[i]);
  }
  return this;
};

function merge(left, right) {
  var mergedList = [],
    // keep a reference to the position of the next
    // element to be compared in each list
    idxLeft = 0,
    idxRight = 0,
    leftValue, // current element in the left list
    rightValue; // current element in the right list

  // while there are more elements in both lists
  while (idxLeft < left.length && idxRight < right.length) {
    // find the smallest element of the two elements
    // at the specified positions of the lists

    // get the next element of each list
    leftValue = left[idxLeft];
    rightValue = right[idxRight];

    if (leftValue < rightValue) { // push the element of the left list
      mergedList.push(leftValue);
      // move to the next element in the left list
      idxLeft = idxLeft + 1;
    } else if (rightValue < leftValue) { // push the element of the right list
      mergedList.push(rightValue);
      // move to the next element in the right list
      idxRight = idxRight + 1;
    } else if (leftValue === rightValue) { // push the current element of both lists
      mergedList.push(leftValue);
      mergedList.push(rightValue);
      // move to the next element in both lists
      idxLeft = idxLeft + 1;
      idxRight = idxRight + 1;
    }
    // continue until you reach the end of both lists
  }

  // there are no more elements in the left list
  if (idxLeft === left.length
      // and there are elements in the right list
      && idxRight < right.length) {
    // push all the remaining elements of the right list
    mergedList.pushAll(right.slice(idxRight));

    // there are no more elements in the right list
  } else if (idxRight === right.length
      // there are more elements in the left list
      && idxLeft < left.length) {
    // push all remaining elemens of the left list
    mergedList.pushAll(left.slice(idxLeft));
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
getRandomNumbers(function (list) {
  start = new Date().getTime();
  orderedList = sort(list);
  end = new Date().getTime();
  time = end - start;

  console.log('Original list:' + list);
  console.log('Sorted list:' + orderedList);
  console.log('Execution time:' + time);
});
