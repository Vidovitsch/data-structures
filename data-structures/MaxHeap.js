let tree;

/**
 * A max oriented binary heap implementation.
 *
 * Complexities:
 * 1. find max: O(1)
 * 2. delete max: O(log(n))
 * 3. insert: O(log(n))
 *
 * @constructor
 */
function MaxHeap() {
  this.length = 0;
  tree = [undefined];
}

/**
 * Helper method.
 *
 * Swaps two values of two indeces within the tree.
 *
 * @param  {Integer} a index to be swapped with index b
 * @param  {Integer} b index to be swapped with index a
 */
function swap(a, b) {
  const temp = tree[a];
  tree[a] = tree[b];
  tree[b] = temp;
}

/**
 * Helper method.
 *
 * Orders the heap by setting the value of 'k' higher in the tree
 * when its parent is smaller.
 *
 * @param  {Integer} k index to check with his parent
 */
function swim(k) {
  while (k > 1 && tree[Math.floor(k / 2)] < tree[k]) {
    swap(k, Math.floor(k / 2));
    k = Math.floor(k / 2);
  }
}

/**
 * Helper method.
 *
 * Orders the heap by setting the value of 'k' lower in the tree
 * when one of the two children is bigger.
 *
 * @param  {Integer} k index to check with his parent
 * @param  {Integer} n length of the heap
 */
function sink(k, n) {
  while (2 * k <= n) {
    let j = 2 * k;
    if (j < n && tree[j] < tree[j + 1]) j++;
    if (tree[k] > tree[j]) break;
    swap(k, j);
    k = j;
  }
}

const M = MaxHeap.prototype;

/**
 * Inserts a new value within the heap.
 *
 * Time complexity (worst): O(log(n))
 *
 * @param  {Any} value value to be inserted into the heap
 */
M.insert = function insert(value) {
  tree.push(value);
  this.length++;
  swim(this.length);
}

/**
 * Returns the max value currently in the heap.
 *
 * Time complexity (worst): O(1)
 *
 * @return {Any} current maximum value of the heap
 */
M.getMax = function getMax() {
  if (this.length === 0) throw new Error('Not Found: heap is empty');
  return tree[1];
}

/**
 * Deletes the max value currently in the heap.
 *
 * Time complexity (worst): O(log(n))
 *
 * @return {Any} deleted value
 */
M.delMax = function delMax() {
  if (this.length === 0) throw new Error('Not Found: heap is empty');
  swap(1, this.length);
  this.length--;
  sink(1, this.length);
  return tree.pop();
}

/**
 * Returns an array representation of the heap.
 *
 * Time complexity (worst): O(1)
 *
 * @return {Any[]} array representation of the heap.
 */
M.asArray = function asArray() {
  return tree.slice(1);
}

module.exports = MaxHeap;
