let comparator = null;

/**
 * A regular BST implementation
 *
 * 1. insert:   O(n)    Θ(log(n))
 *
 * @param  {Function}  comp (optional) custom comparator that defines the sorting/searching
 * @constructor
 */
function BinarySearchTree(comp) {
  this.root = null;
  comparator = comp;
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

/**
 * Helper method.
 *
 * Recursively puts the key-value pair into position.
 *
 * @param       {Node} node  Node to compare keys with
 *                           1. If new key is lower: continue with the left child of the node
 *                           2. If new key is greater: continue with the right child of the node
 *                           3. If new key is same: update value of current node
 * @param       {Any} key    Comparable key to be put into the BST
 * @param       {Any} value Value corresponding to the key
 * @return      {Node}       Node that's been compared
 */
function _put(node, key, value) {
  if (node === null) return new Node(key, value);
  const comp = compare(node.key, key);
  if (comp > 0)       node.left = _put(node.left, key, value);
  else if (comp < 0)  node.right = _put(node.right, key, value);
  else                node.value = value;
  return node;
}

/**
 * Helper method.
 *
 * Compares value 'a' to value 'b'
 *
 * @param  {Any}  a          Value to be compared with 'b'
 * @param  {Any}  b          Value to be compared with 'a'
 * @param  {Function}  comparator (optional) custom comparator that defines the sorting/searching
 * @return {Integer}            -1 if 'a < b', 1 if 'a > b' and 0 if 'a = b'
 * @throws Invalid Argument error, unless the comparator return -1, 1, or 0
 */
function compare(a, b) {
  if (comparator) {
    const result = comparator(a, b);
    if (result !== 1 && result !== -1 && result !== 0) {
      throw new Error('Invalid Argument: the comparator function should return -1 (a < b), 0 (a = b) or 1 (a > b)');
    }
    return result;
  }
  return a < b ? -1 : (a > b ? 1 : 0);
}

const B = BinarySearchTree.prototype;

/**
 * Puts a key-value pair into the BST.
 * If the key already exists, the current value will be updated by the new value.
 *
 * Time complexity (worst): O(n)
 * Time complexity (average): Θ(log(n))
 *
 * @param  {Any} key   Comparable key to be put into the BST
 * @param  {Any} value Value corresponding to the key
 * @throws {Error} Invalid Argument, unless key is not 'null'
 */
B.put = function put(key, value) {
  if (key === null) throw new Error("Invalid Argument: key is null");
  this.root = _put(this.root, key, value);
}

module.exports = BinarySearchTree;
