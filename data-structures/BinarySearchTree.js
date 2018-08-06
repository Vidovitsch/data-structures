const root = null;

function BinarySearchTree(comparator) {
  this.length = 0;
}

/**
 * Node that fills an index in the BST.
 *
 * @param       {Any} value the value (item) to be added to this stack
 * @constructor
 */
function Node(key, value) {
  this.key = key;
  this.value = value;
  this.left = null;
  this.right = null;
}

const B = BinarySearchTree.prototype;

B.put = function put(key, value) {

}
