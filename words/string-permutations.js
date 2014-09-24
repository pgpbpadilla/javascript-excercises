
/*jslint indent:2*/
'use strict';

// this will be dictionary containing
// - key: a string
// - all possible words with the characters of the key
var memory = {},
  callsToFunction = 0;

// find all posible strings that can be formed with
// n characters, without repeating characters
// @param string {String} The initial String to use to generate all combinations
// @memoization {bool} Whether or not you want to use memoization
function findAllWords(string, memoization) {
  var allWords = [],
    i,
    prefix = '',
    wordsWithSubstring,
    wordsWithPrefix,
    remainingChars;

  // count the number calls to this function 
  callsToFunction = callsToFunction + 1;
  // if we've already seen this word and have
  // calculated it's combinations, then just
  // return it
  if ('true' === memoization // only use memoization when set to true
      && memory.hasOwnProperty(string)) {
    // return the array of all the possible words
    // formed with the chars of `string`
    return memory[string];
  }

  // if there's only one char in the string
  // there's only one word tha can be formed
  if (1 === string.length) {
    return [string];
  }

  function getAllWordsWithPrefix(prefix, words) {
    var result = [];
    words.forEach(function (item) {
      result.push(prefix + item);
    });

    return result;
  }
  // the string has at least 2 characters
  // chose one char and put that in the first position
  for (i = 0; i < string.length; i = i + 1) {
    // fix the first character
    prefix = string.charAt(i);
    // then recursively find all posible words with the
    // remaining characters
    remainingChars = string.substr(0, i) + string.substr(i + 1);
    wordsWithSubstring = findAllWords(remainingChars, memoization);

    // add all words that begin with the `prefix`
    wordsWithPrefix = getAllWordsWithPrefix(prefix, wordsWithSubstring);
    allWords = allWords.concat(wordsWithPrefix);
  }

  if ('true' === memoization) {
    // add all the words to our dictionary
    memory[string] = allWords;
  }
  return allWords;
}

var myWord = 'a',
  prompt = require('prompt'),
  sizeof = require('../gists/sizeof/sizeof');

console.log('Setup:');
prompt.get(['string', 'memoization'], function (err, result) {
  var found;
  if (err) {
    console.log(err);
  } else {
    found = findAllWords(result.string, result.memoization);
    console.log(found);
    console.log(found.length + ' words found.');
    console.log('Calls to `findAllWords`:' + callsToFunction);
    console.log('Memory used: ' + sizeof(memory));
    callsToFunction = 0;
  }
});