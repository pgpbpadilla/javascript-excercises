/*jslint indent:2*/

module.exports = (function () {
  'use strict';

  function compressByCounting(aString) {
    var compressedString,
      charFrequencies,
      currentCharInfo,
      i,
      j;

    compressedString = '';
    charFrequencies = [];
    currentCharInfo = {
      char: '', // asume the strin is in [a-z]
      count: -1
    };

    for (i = 0; i < aString.length; i += 1) {

      if (currentCharInfo.char !== aString.charAt(i)) {

        currentCharInfo = {
          char: aString.charAt(i),
          count: 1
        };

        charFrequencies.push(currentCharInfo);

      } else {

        currentCharInfo.count = currentCharInfo.count + 1;

      }

    }

//    console.log('frequencies', charFrequencies);

    compressedString = '';
    charFrequencies.forEach(function (value) {
      compressedString += value.char + value.count;
  //    console.log('cs:', compressedString);
    });

    return compressedString;
  }

  // function sizeForCompressedString() {
  //   return 0;
  // }

  function compress(aString, compressionStrategy) {
    console.log('Compressing string:', aString);

    if ('' === aString) {
      return aString;
    }

    // var compressedSize = sizeForCompressedString(aString);

    // if (compressedSize >= aString.length) {
    //   return aString;
    // }

    return compressionStrategy(aString);
  }

  return {
    compress: compress,
    strategies: {
      counting: compressByCounting
    }
  };
}());
