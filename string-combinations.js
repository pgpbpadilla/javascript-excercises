
/*jslint indent:2*/
'use strict';

// find all posible strings that can be formed with 
// n characters, without repeating characters
function findAllWords(string) {
  var allWords = [],
    i,
    firstChar = '',
    wordsWithSubstring,
    remainingChars,
    j;
  // if there's only one char in the string
  // there's only one word tha can be formed
  if (1 === string.length) {
    return [string];
  }

  // the string has at least 2 characters
  // chose one char and put that in the first position
  for (i = 0; i < string.length; i = i + 1) {
    // fix the first character
    firstChar = string.charAt(i);
    // then recursively find all posible words with the 
    // remaining characters
    remainingChars = string.substr(0, i) + string.substr(i + 1);
    wordsWithSubstring = findAllWords(remainingChars);

    // add all words that begin with the `firstChar`
    for (j = 0; j < wordsWithSubstring.length; j = j + 1) {
      allWords.push(firstChar + wordsWithSubstring[j]);
    }
  }

  return allWords;
}

function printWords(stringArray) {
  var i;
  for (i = 0; i < stringArray.length; i = i + 1) {
    console.log(stringArray[i]);
  }
}

var myWord = 'a',
  prompt = require('prompt');

printWords(findAllWords(myWord));

myWord = 'ab';
printWords(findAllWords(myWord));

myWord = 'abc';
printWords(findAllWords(myWord));

myWord = 'abc';
printWords(findAllWords(myWord));

console.log('Give me the initial string:');
prompt.get(['string'], function (err, result) {
  var found;
  if (err) {
    console.log(err);
  } else {
    found = findAllWords(result.string);
    printWords(found);
    console.log(found.length + ' words found.');
  }
});