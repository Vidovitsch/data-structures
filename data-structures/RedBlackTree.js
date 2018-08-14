/**
 * A left leaning Red Black Tree implementation
 *
 * 1. insert:   O(log(n))    Θ(log(n))
 * 2. search:   O(log(n))    Θ(log(n))
 * 3. remove:   O(log(n))    Θ(log(n))
 * 4. min:      O(log(n))    Θ(log(n))
 * 5. max:      O(log(n))    Θ(log(n))
 * 6. inOrder:  O(n)         Θ(n)
 *
 * @param  {Function}  comperator (optional) custom comparator that defines the sorting/searching
 * @constructor
 */
function RedBlackTree(comperator) {
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
  this.isRed = true;
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

  if (isRed(node.right) && !isRed(node.left))    node = rotateLeft(node);
  if (isRed(node.left) && isRed(node.left.left)) node = rotateRight(node);
  if (isRed(node.left) && isRed(node.right))     flipColors(node);

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

/**
 * Helper method.
 *
 * Recursively gets the node with the smallest key valaue.
 *
 * @param       {Any} node Node to compare keys with
 * @return      {Any}      Node with smallest value in the BST
 */
function _min(node) {
  if (node.left === null) return node;
  return _min(node.left);
}

/**
 * Helper method.
 *
 * Recursively gets the node with the greatest key valaue.
 *
 * @param       {Any} node Node to compare keys with
 * @return      {Any}      Node with smallest value in the BST
 */
function _max(node) {
  if (node.right === null) return node;
  return _max(node.right);
}

/**
 * Helper method
 *
 * Returns all the keys in the BST in ascending order.
 *
 * @param       {Any} node [description]
 * @return      {Any[]} Array of keys in ascending order
 */
function _keys(node, keys) {
  if (node === null) return;
  _keys(node.left, keys);
  keys.push(node.key);
  _keys(node.right, keys);
  return keys;
}

/**
 * Makes a right leaning red link lean left.
 *
 * @param  {Node} node node from which to rotate
 * @return {Node}      rotated node
 */
function rotateLeft(node) {
  const x = node.right;
  node.right = x.left;
  x.left = node;
  x.isRed = x.left.isRed;
  x.left.isRed = true;
  x.size = node.size;
  return x;
}

/**
 * Makes a left leaning red link lean right.
 *
 * @param  {Node} node node from which to rotate
 * @return {Node}      rotated node
 */
function rotateRight(node) {
  const x = node.left;
  node.left = x.right;
  x.right = node;
  x.isRed = x.right.isRed;
  x.right.isRed = true;
  x.size = node.size;
  return x;
}

/**
 * Flips colors of the node itself and its two children.
 *
 * @param  {Node} node parent node that flips color together with its child nodes
 */
function flipColors(node) {
  node.isRed = !node.isRed;
  node.left.isRed = !node.left.isRed;
  node.right.isRed = !node.right.isRed;
}

function isRed(node) {
  return node && node.isRed;
}

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

const B = RedBlackTree.prototype;

/**
 * Puts a key-value pair into the BST.
 * If the key already exists, the current value will be updated by the new value.
 *
 * Time complexity (worst): O(log(n))
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
 * Time complexity (worst): O(log(n))
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
 * Time complexity (worst): O(log(n))
 * Time complexity (average): Θ(log(n))
 *
 * @throws {Error} Not Found, unless the size of BST is bigger than 0
 * @throws {Error} Invalid Argument, unless key is not 'null'
 * @param  {Any} key Comparable key to be searched into the BST

 */
B.remove = function remove(key) {
  if (this.root === null) throw new Error("Not Found: BST is empty");
  if (key === null) throw new Error("Invalid Argument: key is null");
  this.root = _remove(this.root, key, this.comparator);
}

/**
 * Returns the key with the minimum value in the BST.
 *
 * Time complexity (worst): O(log(n))
 * Time complexity (average): Θ(log(n))
 *
 * @return {Any} Key with minimum value in the BST
 * @throws {Error} Not Found, unless the size of BST is bigger than 0
 */
B.min = function min() {
  if (this.root === null) throw new Error("Not Found: BST is empty");
  return _min(this.root).key;
}

/**
 * Returns the key with the maximum value in the BST.
 *
 * Time complexity (worst): O(log(n))
 * Time complexity (average): Θ(log(n))
 *
 * @return {Any} Key with maximum value in the BST
 * @throws {Error} Not Found, unless the size of BST is bigger than 0
 */
B.max = function max() {
  if (this.root === null) throw new Error("Not Found: BST is empty");
  return _max(this.root).key;
}

/**
 * Returns an array of all keys in the BST in ascending order
 *
 * Time complexity (worst): O(n)
 * Time complexity (average): Θ(n)
 *
 * @return {Any[]} Array of keys in ascending order
 * @throws {Error} Not Found, unless the size of BST is bigger than 0
 */
B.keys = function keys() {
  if (this.root === null) throw new Error("Not Found: BST is empty");
  return _keys(this.root, []);
}

module.exports = RedBlackTree;
