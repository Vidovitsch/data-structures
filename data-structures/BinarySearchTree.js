/**
 * A regular BST implementation
 *
 * 1. insert:   O(n)    Θ(log(n))
 * 2. search:   O(n)    Θ(log(n))
 *
 * @param  {Function}  comperator (optional) custom comparator that defines the sorting/searching
 * @constructor
 */
function BinarySearchTree(comperator) {
  this.root = null;
  this.length = 0;
  this.comparator = comperator;
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
 * @param       {Any} key    Comparable key to be put into the BST
 * @param       {Any} value  Value corresponding to the key
 * @param       {Function}  cmp (optional) custom comparator that defines the sorting/searching
 * @return      {Node}       Node that's been compared
 */
function _put(node, key, value, cmp) {
  if (node === null) return new Node(key, value);
  const comp = compare(node.key, key, cmp);
  if (comp > 0)       node.left = _put(node.left, key, value, cmp);
  else if (comp < 0)  node.right = _put(node.right, key, value, cmp);
  else                node.value = value;
  return node;
}

/**
 * Helper method.
 *
 * Recursively gets the value corresponding with the given key.
 *
 * @param       {Node} node Node to compare keys with
 * @param       {Any} key   Comparable key to be put into the BST
 * @param       {Function} cmp (optional) custom comparator that defines the sorting/searching
 * @return      {Any}      Value corresponding with the key
 */
function _get(node, key, cmp) {
  if (node === null) return null;
  const comp = compare(node.key, key, cmp);
  if (comp > 0)       return _get(node.left, key, cmp);
  else if (comp < 0)  return _get(node.right, key, cmp);
  else                return node.value;
}

/**
 * Helper method.
 *
 * Recursively removes the node corresponding with the given key.
 *
 * @param       {Node} node Node to compare keys with
 * @param       {Any} key  Comparable key to be put into the BST
 * @param       {Function} cmp (optional) custom comparator that defines the sorting/searching
 * @return      {Any}      Value corresponding with the key
 */
function _remove(node, key, cmp) {
  if (node === null) return null;
  const comp = compare(node.key, key, cmp);
  if (comp > 0) node.left = _remove(node.left,  key, cmp);
  else if (comp < 0) node.right = _remove(node.right, key, cmp);
  else {
    if (node.right === null) return node.left;
    if (node.left === null) return node.right;
    let temp = node;
    node = _min(temp.right);
    node.right = _remove(node, node.key, cmp);
    node.left = temp.left;
  }
  return node;
}

function _min(node) {
  if (node.left === null) return node;
  return _min(node.left);
}

// function _max(node) {
//   if (node.right === null) return node;
//   return _min(node.right);
// }

/**
 * Helper method.
 *
 * Compares value 'a' to value 'b'
 *
 * @param  {Any}  a          Value to be compared with 'b'
 * @param  {Any}  b          Value to be compared with 'a'
 * @param  {Function}  cmp (optional) custom comparator that defines the sorting/searching
 * @return {Integer}            -1 if 'a < b', 1 if 'a > b' and 0 if 'a = b'
 * @throws Invalid Argument error, unless the comparator return -1, 1, or 0
 */
function compare(a, b, cmp) {
  if (cmp) {
    const result = cmp(a, b);
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
  this.root = _put(this.root, key, value, this.comparator);
}

/**
 * Gets a value by key from the BST.
 * Returns 'null' if the key isn't found.
 *
 * Time complexity (worst): O(n)
 * Time complexity (average): Θ(log(n))
 *
 * @param  {Any} key Comparable key to be searched into the BST
 * @return {Any}     Value corresponding with the key, or 'null' if not found
 * @throws {Error} Not Found, unless the size of BST is bigger than 0
 * @throws {Error} Invalid Argument, unless key is not 'null'
 */
B.get = function get(key) {
  if (this.root === null) throw new Error("Not Found: BST is empty");
  if (key === null) throw new Error("Invalid Argument: key is null");
  return _get(this.root, key, this.comparator);
}

/**
 * Removes a node from the BST by an corresponding key.
 * Implementation uses the Hibbard deletion method.
 *
 * Time complexity (worst): O(n)
 * Time complexity (average): Θ(√n)
 *
 * @param  {Any} key Comparable key to be searched into the BST
 */
B.remove = function remove(key) {
  if (this.root === null) throw new Error("Not Found: BST is empty");
  if (key === null) throw new Error("Invalid Argument: key is null");
  this.root = _remove(this.root, key, this.comparator);
}

B.min = function min() {
  return _min(this.root).key;
}

B.max = function max() {
  return _max(this.root).key;
}

module.exports = BinarySearchTree;
