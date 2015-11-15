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
      end = m.length - 1 - layer;

      console.log('start', start);
      console.log('end', end);

      for (i = 0; i < end; i = i + 1) {

        tmp = m[start + i][start]; // top
        console.log('saving top', tmp);
        m[start + i][start] = m[end - i][start]; // top <- left
        console.log('moving top <- left', matrix);
        m[end - i][start] = m[end][end - i]; // left <- bottom
        console.log('moving left <- bottom', matrix);
        m[end][end - i] = m[start + i][end]; // bottom <- right
        console.log('moving bottom <- right', matrix);
        m[start + i][end] = tmp;// right <- tmp
        console.log('moving right <- top[tmp]', matrix);
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
var matrix = Rotator.randomMatrix(2);


console.log('Random matrix:\n' + Rotator.toString(matrix));

// in-place rotation
Rotator.rotate(matrix);
console.log('Rotated matrix:\n' + Rotator.toString(matrix));
