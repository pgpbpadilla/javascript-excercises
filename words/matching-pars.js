var test = [ ")(){}", "[]({})", "([])", "{()[]}", "([)]", "{]{}{]][)))(", "}])[({", "[[{[({})()]}]()]"];

function matching(expression) {
  console.log(expression);
  var stack = [];

  stack.push(expression.charAt(0));

  for (var i = 1; i< expression.length; ++i) {
    
    var cc = expression.charAt(i);
    
    var topChar = stack[stack.length-1];
    
    if (topChar === '(' && cc === ')'
        || topChar === '[' && cc === ']'
        || topChar === '{' && cc === '}') {
      
      stack.pop();
      
    } else {
      
      stack.push(expression.charAt(i));
    }

    console.log(stack);
  }
  
  if (0 === stack.length) {
    return 0;
  }
  
  return 1;
}


for (var i = 0 ; i< test.length; ++i) {
  console.log(matching(test[i]));
}
