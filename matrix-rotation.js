/*jslint indent:2, node:true*/
/*global module, exports*/

'use strict';

module.exports.MatrixRotator = {
  randomMatrix: function (size) {
    var matrix = [], row, col;

    for (row = 0; row < size; row = row + 1) {
      matrix.push([]);// create new row

      for (col = 0; col < size; col = col + 1) {
        matrix[row].push(Math.ceil(Math.random()*size));
      }

    }

    return matrix;
  },
  rotate: function (matrix, size) {

    function rotateLayer (matrix, layer, layerSize) {
      
      
      
      return matrix; 
    }
    
    var layers = Math.ceil(size/2), 
      l;

    for (l = layers; l > 0; l = l - 1) {
      rotateLayer(matrix, l, size - 2*l);
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
var Rotator = exports.MatrixRotator;
var matrix = Rotator.randomMatrix(5);


console.log('Random matrix:\n' + Rotator.toString(matrix));

// in-place rotation
Rotator.rotate(matrix);
console.log('Rotated matrix:\n' + Rotator.toString(matrix));
