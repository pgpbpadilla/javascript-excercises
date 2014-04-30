/*jslint indent:2, browser: true, node: true*/

/** Taken from: http://stackoverflow.com/a/11900218/400544 */

'use strict';

(function () {
  var typeOfWindow = typeof window;

  function sizeof(object) {
    var objectList = [],
      stack = [ object ],
      bytes = 0,
      value,
      i;

    while (stack.length) {
      value = stack.pop();

      if (typeof value === 'boolean') {
        bytes += 4;
      } else if (typeof value === 'string') {
        bytes += value.length * 2;
      } else if (typeof value === 'number') {
        bytes += 8;
      } else if (typeof value === 'object'
          && objectList.indexOf(value) === -1) {
        objectList.push(value);

        for (i in value) {
          if (value.hasOwnProperty(i)) {
            stack.push(value[i]);
          }
        }
      }
    }
    return bytes;
  }

  // export function
  if ('undefined' !== typeOfWindow) { // export to window
    window.sizeof = sizeof;
  } else { // export to node
    module.exports = sizeof;
  }
}());