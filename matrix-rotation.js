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
  rotate: function (matrix) {

    // layer is zero-based
    function rotateLayer (m, layer) {
      
      var i, tmp, start, size, end;

      start = layer;
      size = m.length - 2*layer;
      end = start + size - 1;

      console.log('start', start);
      console.log('size', size);
      console.log('end', end);

      for (i = start; i < end; i = i + 1) {
        console.log('i', i);
        tmp = m[i][start]; // top
        m[i][start] = m[start][start + size - i]; // left -> top
        m[start][start + size - i] = m[end - i][end]; // bottom -> left
        m[end - i][end] = m[end][i]; // right -> bottom
        m[end][i] = tmp;// tmp -> right
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
var Rotator = exports.MatrixRotator;
var matrix = Rotator.randomMatrix(3);


console.log('Random matrix:\n' + Rotator.toString(matrix));

// in-place rotation
Rotator.rotate(matrix);
console.log('Rotated matrix:\n' + Rotator.toString(matrix));
