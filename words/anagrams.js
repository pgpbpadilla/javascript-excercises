function anagrams(w1, w2) {
//  console.log('anagrams:' 
  //            + '\nw1:' + w1 
    //          + '\nw2:' + w2);

    var letter_count = [];
    
    for(var x = 0; x<w1.length; ++x) {
        
        var l1 = w1.charAt(x);
        if (undefined === letter_count[l1]) {
          letter_count[l1] = {
            w1 : 1
          };
        } else {
          letter_count[l1].w1 = letter_count[l1].w1 + 1;
        }
    }
  //console.log(letter_count);
    // letter count for second word

    for(var z = 0; z<w2.length; ++z) {
        
        var l2 = w2.charAt(z);
      
      // the current letter is not in the first word
        if (undefined === letter_count[l2]) {
//          console.log('letter:' + l2 + ' not in' + w1);
          return 0;
        }

      // the letter exist in the first word
      if (undefined === letter_count[l2].w2) {
        letter_count[l2].w2 = 1;
      } else {
        letter_count[l2].w2 = letter_count[l2].w2 + 1;
      }
    }
  
//  console.log(letter_count);

    for(var cl in letter_count) {

      if (false === letter_count.hasOwnProperty(cl)) {
        continue;
      }

//      console.log(cl + '- w1 - ' + letter_count[cl].w1);
 //     console.log(cl + '- w2 - ' + letter_count[cl].w2);
      
      if (letter_count[cl].w1 !== letter_count[cl].w2) {
        return 0;
      }
      return 1;
    }

    return -1;
}

function check_anagrams(first_words, second_words) {
    // To print results to the standard output please use console.log()
    // Example: console.log("Hello world!");
    
    if (first_words.length !== second_words.length) {
        console.log('fw.len = ' + first_words.length);
        console.log('sw.len = ' + second_words.length);
        console.log(-1);
    }
    
    for(var i = 0; i< first_words.length; ++i){
      var result = anagrams(first_words[i], second_words[i]);
      if(1 === result) {
        console.log(1);
      } else {
        console.log(result);
      }
    }
}


var fw = ["cinema","host","aba","train"];
var sw = ["iceman","shot","bab","rain"];

for (var i = 0 ; i<100; ++i) {
  check_anagrams(fw, sw);
}
