/*jslint indent:2, node:true*/
/*global module, exports*/

'use strict';

module.exports.MatrixRotator = {
  randomMatrix: function (size) {
    var matrix = [], row, col;

    for (row = 0; row < size; row = row + 1) {
      matrix.push([]);// create new row

      for (col = 0; col < size; col = col + 1) {
        matrix[row].push((1+row)*size + col);
      }

    }

    return matrix;
  },
    copyMatrix: function (m) {
      var copy = [];

      m.forEach(function (row, rowIdx) {
        copy.push([]);
        row.forEach(function (el) {
          copy[rowIdx].push(el);
        });
      });

      return copy;
    },
  rotate: function (matrix) {

    // layer is zero-based
    function rotateLayer (m, layer) {
      
        var step, tmp, start, size, end, maxSteps;

      start = layer;
      end = m.length - 1 - layer;
        maxSteps = end - start;


        for (step = 0; step < maxSteps; step = step + 1) {
          
          tmp = m[start][start + step]; // tmp <- top

          m[start][start + step] = m[end - step][start]; 

          m[end - step][start] = m[end][end - step]; 

          m[end][end - step] = m[start + step][end]; 

          m[start + step][end] = tmp;
      }
    }
    
    var layers = Math.ceil(matrix.length/2), 
      l;
    console.log('layers', layers);

    for (l = 0; l < layers; l = l + 1) {
      rotateLayer(matrix, l);
      console.log('step' + l, matrix);
    }

    return matrix;
  },
  toString: function (matrix) {
    var result = '';

    matrix.forEach(function (row) {
      row.forEach(function (value) {
        result += value + '\t';
      });
      result += '\n';
    });

    return result;
  }
};


// Main program

var prompt = require('prompt');
var Rotator = exports.MatrixRotator;

prompt.start();

prompt.get(['size'], function (err, result) {
  if (err) {
    console.log(err);
    return;
  }

  var matrix = Rotator.randomMatrix(parseInt(result.size, 10)),
      mCopy = Rotator.copyMatrix(matrix);



  console.log('Random matrix:\n' + Rotator.toString(matrix));

  // in-place rotation
  Rotator.rotate(matrix);
  console.log('Original matrix:\n' + Rotator.toString(mCopy));
  console.log('Rotated matrix:\n' + Rotator.toString(matrix));

});
