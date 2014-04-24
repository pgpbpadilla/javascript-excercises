/*jslint indent:2*/
'use strict';

// Will find the sub array with the greatest sum.
// @param array {Array} The original array
// @param low {int} Starting index of the current sub-array
// @param middle {int} Middle index of the current sub-array
// @param high {int} End index of the current sub-array
function maxCrosssingSubArray(array, low, middle, high) {
  var leftSum = -Infinity,
    rightSum = -Infinity,
    maxLeft,
    maxRight,
    sum,
    i;

  // look for the max sub array in the left side
  sum = 0;
  for (i = middle; i >= low; i = i - 1) {
    sum += array[i];
    if (sum > leftSum) {
      leftSum = sum; // keep only the largest sum
      maxLeft = i; // keep the index that gave out the largest sum
    }
  }
  // look for the max sub array in the right side
  sum = 0;
  for (i = middle + 1; i <= high; i = i + 1) {
    sum += array[i];
    if (sum > rightSum) {
      rightSum = sum; // keep the largest sum
      maxRight = i; // keep the index that gave out the largest sum
    }
  }
  // the max sub array is the concatenation of the max
  // left & right sub arrays.
  return {
    maxLeft: maxLeft,
    maxRight: maxRight,
    sum: (leftSum + rightSum)
  };
}

function maxSubArray(array, low, high) {
  var middle,
    leftMaxSubArray,
    rightMaxSubArray,
    crossingMaxSubArray;

  if (high === low) {
    // base case, only one element
    return {
      low: low,
      high: high,
      sum: array[low]
    };
  }

  middle = Math.floor((high + low) / 2);

  leftMaxSubArray = maxSubArray(array, low, middle); // problem of size n/2 = T(n/2)
  rightMaxSubArray = maxSubArray(array, middle + 1, high); // problem of size n/2 = T(n/2)
  crossingMaxSubArray = maxCrosssingSubArray(array, low, middle, high); // problem of size n = \theta(n)

  if (leftMaxSubArray.sum > rightMaxSubArray.sum
      && leftMaxSubArray.sum > crossingMaxSubArray.sum) {
    return { // the left is the greatest sub array
      low: leftMaxSubArray.low,
      high: leftMaxSubArray.high,
      sum: leftMaxSubArray.sum
    };
  }
  if (rightMaxSubArray.sum > leftMaxSubArray.sum
      && rightMaxSubArray.sum > crossingMaxSubArray.sum) {
    return {  // the right is the greatest sub array
      low: rightMaxSubArray.low,
      high: rightMaxSubArray.high,
      sum: rightMaxSubArray.sum
    };
  }
  // the crossing is the greatest sub array
  return {
    low: crossingMaxSubArray.maxLeft,
    high: crossingMaxSubArray.maxRight,
    sum: crossingMaxSubArray.sum
  };
}

var prompt = require('prompt'),
  utils = require('./utils/sortRandomNumbers');

prompt.start();
prompt.get(['maxLen'], function (err, result) {
  var maxSubInfo,
    maxSub;

  if (err) {
    console.log(err);
  }

  utils.genRandNumbers(parseInt(result.maxLen, 10), function (array) {
    // Test Array
    // array = [13, -3, -25, 20, -3, -16, -23, 18, 20, -7, 12, -5, -22, 15, -4, 7];

    // find the max sub array
    maxSubInfo = maxSubArray(array, 0, array.length - 1);
    maxSub = array.slice(maxSubInfo.low, maxSubInfo.high + 1);
    console.log('Original array: ' + array);
    console.log('Max sub-array Info: ' + JSON.stringify(maxSubInfo));
    console.log('Max sub-array: ' + maxSub);
  });
});