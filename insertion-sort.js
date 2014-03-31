function sort(list) {
	var auxVal,
    i,
    j,
    key;

    // traverse the array from left to right
    for (i = 1; i < list.length; i = i+1) {
      // mark the current position so that
      // we'll have two partitions
      // left: [0,i], right: [i+1, list.length]
      j = i; // element i is what we call the `key`
      key = list[i];
      // traverse the left side of the array
      // from right to left, while there are
      // elements at the left of the key
      while (j > 0
        // and the key is lesser than it's left neighbor
        && key < list[j-1]){
        // swap the key and it's left neighbor
        list[j] = list[j-1];
        // scan next value to the left
        j = j-1;
      }
      // now the key is at the left of all 
      // values greater than itself
      list[j] = key;
    }
    return list;
}

var list= [2,4,9,5,3,8,7,5];
console.log('Original:' + list);
console.log('Sorted:' + sort(list));

list= [72,4,69,5,43,8,7,25];
console.log('Original:' + list);
console.log('Sorted:' + sort(list));

list= [72,4,69,5,43,8,7,25,0,-12,-45,5,7,-2];
console.log('Original:' + list);
console.log('Sorted:' + sort(list));