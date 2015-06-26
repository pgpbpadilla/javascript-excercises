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

  function sizeForCompressedString(aString) {
    var size,
      i,
      lastChar,
      lastCharCount;

    size = 0;
    lastChar = '';
    lastCharCount = 0;

    for (i = 0; i < aString.length; i = i + 1) {

      if (lastChar !== aString.charAt(i)) {

        size = size + 1 + lastCharCount.toString(10).length;

        lastChar = aString.charAt(i); 
        lastCharCount = 1; // this is the first time we see this char
        
      } else {

        lastCharCount = lastCharCount + 1;

      }
    }

    return size;
  }

  function compress(aString, compressionStrategy) {
    console.log('Compressing string:', aString);

    var result;

    if ('' === aString) {
      return aString;
    }

    var compressedSize = sizeForCompressedString(aString);

    if (compressedSize >= aString.length) {
      console.log('Not worth compressing...');
      return aString;
    }

    result = compressionStrategy(aString);

    console.log('Length after compression: ', result.length);

    return result;
  }

  return {
    compress: compress,
    strategies: {
      counting: compressByCounting
    },
    utils: {
      expectedSize: sizeForCompressedString
    }
  };
}());
