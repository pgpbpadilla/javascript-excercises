debugger;
var compressor = require('./compressor');

var compressedString,
  str;

str = 'abbcccdddeaaaayyyiiioopppprrr';
console.log('expectedSize:', compressor.utils.expectedSize(str));
compressedString = compressor.compress(str, compressor.strategies.counting);
console.log('compressed:', compressedString);

str = 'abbcccddddeeeee';
console.log('expectedSize:', compressor.utils.expectedSize(str));
compressedString = compressor.compress(str, compressor.strategies.counting);
console.log('compressed:', compressedString);

str = 'aaaaabbbbcccdde';
console.log('expectedSize:', compressor.utils.expectedSize(str));
compressedString = compressor.compress(str, compressor.strategies.counting);
console.log('compressed:', compressedString);

str = 'abcedfg';
console.log('expectedSize:', compressor.utils.expectedSize(str));
compressedString = compressor.compress(str, compressor.strategies.counting);
console.log('compressed:', compressedString);
