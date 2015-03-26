/*jslint indent: 2, node:true*/
'use strict';

function printNode(node) {
  var data = '',
    childrenData,
    i;

  if (0 === node.children.length) {
    return '[' + node.data + ']';
  }

  childrenData = '';
  for (i = 0; i < node.children.length; i += 1) {
    childrenData += printNode(node.children[i]);
  }

  data = node.data + childrenData;

  return '[' + data + ']';
}

function parse(treeString) {

  var i,
    curState,
    root,
    curNode,
    curChar,
    tmpNode,
    lastBracketIdx;

  // states = ['start',
  //   'newNode',
  //   'nodeData',
  //   'endNode',
  //   'newChild',
  //   'endNode',
  //   'end'];

  console.log('Tree string: ' + treeString);

  curState = 'start';
  curNode = null;

  for (i = 0; i < treeString.length; i += 1) {

    // console.log('Current State:' + curState);

    curChar = treeString.charAt(i);

    // console.log('Read:' + curChar);


    if ('[' === curChar) {

      if ('start' === curState) { // Root node '[data...'

        root = {
          parent: null,
          data: '',
          children: []
        };

        curNode = root;
        curState = 'newNode';

      } else if ('nodeData' === curState) { // new child node '[parent[...'

        tmpNode = {
          parent: curNode, // child of the current node
          data: '',
          children: []
        };

        curNode.data = treeString.substring(lastBracketIdx + 1, i);
        curNode.children.push(tmpNode);

        curNode = tmpNode; // set as the current node
        curState = 'newNode';

      } else if ('endNode' === curState) { // new sibling '...node][sibling...'

        tmpNode = {
          parent: curNode.parent, // same parent as the current node
          data: '',
          children: []
        };

        curNode.parent.children.push(tmpNode); // as as sibling
        curNode = tmpNode; // set as current node
        curState = 'newNode';

      }

      lastBracketIdx = i; // update the last bracket's position

    } else if (']' === curChar) {

      if ('nodeData' === curState) { // finished reading current node data: '...data]'

        curNode.data = treeString.substring(lastBracketIdx + 1, i);
        curState = 'endNode';

      } else if ('endNode' === curState) { // '...data]]'
        curNode = curNode.parent;
        curState = 'endNode';
      }

      lastBracketIdx = i;

    } else { // any other character

      if ('newNode' === curState || 'nodeData' === curState) {
        curState = 'nodeData';
      }

    }

    // console.log('New State:' + curState);
    console.log('Root:' + printNode(root));
  }

  return curNode;
}

function testPrintNode() {
  var tree;

  tree = {
    parent: undefined,
    data: 'root',
    children: []
  };

  tree.children.push({
    parent: tree,
    data: 'c1',
    children: []
  });
  tree.children.push({
    parent: tree,
    data: 'c2',
    children: []
  });

  tree.children[0].children.push({
    parent: tree.children[0],
    data: 'c3',
    children: []
  });
  console.log(printNode(tree));
}


// testPrintNode();


var tree, myTreeString;

myTreeString = '[root[n1][n2[n7]][n3[n4][n5[n6]]]]'; //'[root[n1][n2][n3[n4][n5][n6]]]';
tree = parse(myTreeString);

console.log('My parsed tree:' + printNode(tree));

if (myTreeString === printNode(tree)) {
  console.log('Succesfully parsed tree');
} else {
  console.log('Error: parsed tree does not match the treeString:\n'
    + printNode(tree) + '\n'
    + myTreeString);
}