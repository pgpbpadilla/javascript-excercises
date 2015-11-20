/*jslint indent:2, node:true*/
/*global module, exports*/

'use strict';

(function () {
  
  'use strict';

  var winston = require('winston');

  var logger, logLevel = 'error';


  if (process.argv.length >= 3) {
    winston.log('info', 'Set logger.level: ' + process.argv[2]);
    logLevel = process.argv[2];
  }
  
  logger = new (winston.Logger)({
    level: logLevel,
    transports: [
      new (winston.transports.Console)()
    ]
  });

  function shouldMarkEntryAt(row, col, entries) {
    var result, i;

    for(i = 0; i < entries.length; i = i + 1) {
      if (row === entries[i].row 
          && col === entries[i].col) {
        return true;
      }
    }

    return false;
  }

  function formatMatrix(matrix, markedEntries) {
    var result = '';

    matrix.forEach(function (row, rowIdx) {
      row.forEach(function (value, colIdx) {

        if (undefined !== markedEntries 
            && shouldMarkEntryAt(rowIdx, colIdx, markedEntries)) {
          result += '>' + value + '<';
        } else {
          result += value;
        }

        result += '\t';

      });

      result += '\n';
    });

    return result;
  }

  // http://stackoverflow.com/a/3488745/400544
  function rotateSO(m) {
    var f, c, x, y, n, temp;

    f = Math.floor(m.length/2);
    c = Math.ceil(m.length/2);
    n = m.length;

    for (x = 0; x <= f - 1; x = x + 1) {
      for (y = 0; y <= f - 1; y = y + 1) {
        temp = m[x][y];
        m[x][y] = m[y][n-1-x];
        m[y][n-1-x] = m[n-1-x][n-1-y];
        m[n-1-x][n-1-y] = m[n-1-y][x];
        m[n-1-y][x] = temp;
      }
    }
    return m;
  }
  // layer is zero-based
  function rotateLayer (m, layer) {
    
    var step, tmp, start, size, end, maxSteps;

    start = layer;
    end = m.length - 1 - layer;
    maxSteps = end - start;

    logger.debug('START', start);
    logger.debug('END', end);

    for (step = 0; step < maxSteps; step = step + 1) {
      logger.debug('STEP - ', step);
      
      tmp = m[start][start + step]; // tmp <- top

      m[start][start + step] = m[end - step][start]; 
      logger.debug('MOVED top <- left\n', formatMatrix(m, [
        { row: end - step, col: start },
        { row: start, col: start + step}
      ]));

      m[end - step][start] = m[end][end - step]; 
      logger.debug('MOVED left <- bottom\n', formatMatrix(m, [
        { row: end, col: end - step },
        { row: end - step, col: start }
      ]));

      m[end][end - step] = m[start + step][end]; 
      logger.log('MOVED bottom <- right\n', formatMatrix(m, [
        { row: start + step, col: end },
        { row: end, end: end - step }
      ]));

      m[start + step][end] = tmp;
      logger.debug('MOVED right <- top[tmp]\n', formatMatrix(m, [
        { row: start + step, col: end }
      ]));
    }
  }

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
    rotate: function (matrix, strategy) {

      var layers = Math.ceil(matrix.length/2), 
          l;
      
      if ('so' === strategy) {
        return rotateSO(matrix);
      } 

      logger.debug('LAYERS', layers);

      for (l = 0; l < layers; l = l + 1) {
        logger.debug('ROTATING LAYER - ' + l + '\n');
        rotateLayer(matrix, l);
      }

      return matrix;
    },
    toString: formatMatrix
  };
  
}());



// Main program

var prompt = require('prompt');
var Rotator = exports.MatrixRotator;

prompt.start();

prompt.get(['size', 'strategy'], function (err, result) {
  if (err) {
    console.log(err);
    return;
  }

  var matrix = Rotator.randomMatrix(parseInt(result.size, 10)),
      mCopy = Rotator.copyMatrix(matrix);

  console.log('Random matrix:\n' + Rotator.toString(matrix));

  // in-place rotation
  Rotator.rotate(matrix, result.strategy);
  console.log('Original matrix:\n' + Rotator.toString(mCopy));
  console.log('Rotated matrix:\n' + Rotator.toString(matrix));

});
