/*jslint indent:2*/

// find all the rotations of a word

var prompt = require('prompt'),
  word,
  N,
  rotations;

console.log('Give me a word:');
prompt.get(['word'], function (err, result) {

  if (err) {
    console.error(err);
  }

  word = result.word;
  N = word.length;
  rotations = [];

  for (var i = 0; i<N; ++i) {
      word = word.substr(N-1, 1) + word.substr(0, N-1);
      rotations.push(word);  
  }

  console.log('There are: ' + rotations.length + ' rotations: ');
  rotations.forEach(function (item) {
    console.log(item);
  });

  console.log('Give me another word:');
  prompt.get(['newWord'], function (err, result) {
    if (err) {
      console.error(err);
    }

    if (0 > rotations.indexOf(result.newWord)) {
      console.log(result.newWord + ' is not a rotation of: ' + word);
      return;
    }

    console.log('YES! ' +  result.newWord + ' is a rotation of: ' + word);
  });

});
