/*jslint indent:2*/
'use strict';

var i;
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
    posNextLeft = 0,
    posNextRight = 0,
    // at most we have the sum of the number
    // of elements in each list
    remaining = left.length + right.length,
    nextLeft, // next element in the left list
    nextRight; // next element in the right list

  // while there are more elements in both lists
  while (posNextLeft < left.length && posNextRight < right.length) {
    // find the smallest element of the two elements
    // at the specified positions of the lists

    // get the next element of each list
    nextLeft = left[posNextLeft];
    nextRight = right[posNextRight];

    if (nextLeft < nextRight) { // push the element of the left list
      mergedList.push(nextLeft);
      // move to the next element in the left list
      posNextLeft = posNextLeft + 1;
      remaining = remaining - 1;
    } else if (nextRight < nextLeft) { // push the element of the right list
      mergedList.push(nextRight);
      // move to the next element in the right list
      posNextRight = posNextRight + 1;
      remaining = remaining - 1;
    } else if (nextLeft === nextRight) { // push the current element of both lists
      mergedList.push(nextLeft);
      mergedList.push(nextRight);
      // move to the next element in both lists
      posNextLeft = posNextLeft + 1;
      posNextRight = posNextRight + 1;
      remaining = remaining - 2;
    }
    // continue until you reach the end of both lists
  }

  // there are no more elements in the left list
  if (posNextLeft === left.length) {
    // push all the remaining elements of the right list
    mergedList.pushAll(right.slice(posNextRight));

    // there are no more elements in the right list
  } else if (posNextRight === right.length) {
    // push all remaining elemens of the left list
    mergedList.pushAll(left.slice(posNextLeft));
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

  // for lists with more than one elements
  // find the middle of the list
  middle = Math.ceil(list.length / 2);

  // recursively sort the left and right parts of the list
  // then merge the result
  // the left list includes all elements from 0 to middle-1
  left = sort(list.slice(0, middle));
  // the right list includes all elements from middle to list.length
  right = sort(list.slice(middle, list.length));
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