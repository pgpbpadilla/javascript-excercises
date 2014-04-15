/*jslint indent:2*/
'use strict';

// Swaps two elements of an array in-place
// @param elements {array} The array from which the elements are going to be swapped
// @param i,j {int, int} The index of the elements to be swapped
function swap(elements, i, j) {
  var aux;

  aux = elements[i];
  elements[i] = elements[j];
  elements[j] = aux;
}

// Partitions the sub-array of `elements` defined by the indices `start`, and `end`
// into two partitions such that, all elements in the left partition are leq than
// the pivot, and all elements in the right partition are geq than the pivot.

// @param elements {array} the original sub-array
// @param start {int} The starting index of the sub-array
// @param end {int} The ending index of the sub-array
// @returns The index of the pivot.
function partition(elements, start, end) {
  // get the value of the pivot
  var pivotValue = elements[start],
  // `i` will mark the boundary of the left sub-array, i.e.
  // all elements to the left of `i` are leq than the pivot
    i = start, // start from left to right
    j;

  // loop over the sub-array from left to right
  // starting from the element next to the pivot
  // stop when you have scanned all elements in the sub-array
  for (j = start + 1; j <= end; j = j + 1) {
    // if the current element being scanned is leq than the pivot
    if (elements[j] <= pivotValue) {
      // move the boundary to the right
      // this will keep adding elements that are leq at the right of the boundary.
      i = i + 1;
      // swap elements i & j, so that the most recently found element
      // that is leq than the pivot is at the right end of the boundary
      swap(elements, i, j);
    }
  }
  // at this point `i` is the index of the right-most
  // element in the left partition, i.e., the last element that is leq than the pivot
  // swap the pivotValue and the last element that is leq than the pivot
  swap(elements, start, i);

  // the pivot is now at the middle of the two partitions at the index `i`
  return i;
}

// Sorts a sub-array delimited by `start` and `end` using QuickSort
// @param elements {Array} The array to be sorted
// @param start, end {int, int} The indices that define the sub-array that will be sorted.
function sort(elements, start, end) {
  var pivotIndex;

  // only sort if the sub-array is non-empty
  if (start < end) {
    // calculate the partition and the position of the pivot
    pivotIndex = partition(elements, start, end);
    // `pivotIndex` delimits the left and right partitions
    // sort recursively the left and right paritions
    // none of the partitions includes the pivot since 
    // it's already in the right place.
    sort(elements, start, pivotIndex - 1);
    sort(elements, pivotIndex + 1, end);
  }
}

var list = [2, 4, 9, 5, 3, 8, 7, 5],
  prompt = require('prompt'),
  sortRandomNumbers = require('../utils/sortRandomNumbers'),
  start,
  end,
  time;

console.log('Original:' + list);
sort(list, 0, list.length - 1);
console.log('Sorted:' + list);

list = [72, 4, 69, 5, 43, 8, 7, 25];
console.log('Original:' + list);
sort(list, 0, list.length - 1);
console.log('Sorted:' + list);

list = [72, 4, 69, 5, 43, 8, 7, 25, 0, -12, -45, 5, 7, -2];
console.log('Original:' + list);
sort(list, 0, list.length - 1);
console.log('Sorted:' + list);

list = [72, -4, -69, 5, 43];
console.log('Original:' + list);
sort(list, 0, list.length - 1);
console.log('Sorted:' + list);

// test with random numbers
// sort using `sort` subroutine
prompt.start();
prompt.get(['maxVal'], function (err, result) {
  if (err) {
    console.log(err);
  }

  list = sortRandomNumbers.genRandNumbers(parseInt(result.maxVal, 10));

  start = new Date().getTime();
  sort(list, 0, list.length - 1);
  end = new Date().getTime();

  console.log('Sorted:' + list);
  time = end - start;

  console.log('Execution time: ' + time);
});

