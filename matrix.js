var prompt = require('prompt');

var value;

prompt.start();

function printValue(value){
  console.log('The value is:' + value);
}

prompt.get(['name', 'value'], function(err, result){
  console.log('name:'+ result.name);
  console.log('value:'+ result.value);
  console.log('Stringification of result' + JSON.stringify(result));
  printValue(result.value);
});

