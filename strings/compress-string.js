debugger;
var compressor = require('./compressor');

var compressedString;

compressedString = compressor.compress('abbcccdddeaaaayyyiiioopppprrr', compressor.strategies.counting);
console.log('compressed:', compressedString);
// compressedString = compressor.compress('abbcccdddeaaaayyyiiioopppprrr', compressor.strategies.counting);

compressedString = compressor.compress('abbcccddddeeeee', compressor.strategies.counting);
console.log('compressed:', compressedString);

compressedString = compressor.compress('aaaaabbbbcccdde', compressor.strategies.counting);
console.log('compressed:', compressedString);
