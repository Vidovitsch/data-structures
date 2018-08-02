let tree;

/**
 * A min oriented binary queue implementation.
 *
 * Complexities:
 * 1. find max: O(1)
 * 2. delete max: O(log(n))
 * 3. insert: O(log(n))
 *
 * @constructor
 */
function MinPriorityQueue() {
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
 * Orders the queue by setting the value of 'k' higher in the tree
 * when its parent is greater.
 *
 * @param  {Integer} k index to check with his parent
 */
function swim(k) {
  while (k > 1 && tree[Math.floor(k / 2)] > tree[k]) {
    swap(k, Math.floor(k / 2));
    k = Math.floor(k / 2);
  }
}

/**
 * Helper method.
 *
 * Orders the queue by setting the value of 'k' lower in the tree
 * when one of the two children is smaller.
 *
 * @param  {Integer} k index to check with his parent
 * @param  {Integer} n length of the queue
 */
function sink(k, n) {
  while (2 * k <= n) {
    let j = 2 * k;
    if (j < n && tree[j] > tree[j + 1]) j++;
    if (tree[k] < tree[j]) break;
    swap(k, j);
    k = j;
  }
}

const M = MinPriorityQueue.prototype;

/**
 * Inserts a new value within the queue.
 *
 * Time complexity (worst): O(log(n))
 *
 * @param  {Any} value value to be inserted into the queue
 */
M.insert = function insert(value) {
  tree.push(value);
  this.length++;
  swim(this.length);
}

/**
 * Returns the min value currently in the queue.
 *
 * Time complexity (worst): O(1)
 *
 * @return {Any} current maximum value of the queue
 */
M.getMin = function getMin() {
  if (this.length === 0) throw new Error('Not Found: queue is empty');
  return tree[1];
}

/**
 * Deletes the min value currently in the queue.
 *
 * Time complexity (worst): O(log(n))
 *
 * @return {Any} deleted value
 */
M.delMin = function delMin() {
  if (this.length === 0) throw new Error('Not Found: queue is empty');
  swap(1, this.length);
  this.length--;
  sink(1, this.length);
  return tree.pop();
}

/**
 * Returns an array representation of the queue.
 *
 * Time complexity (worst): O(1)
 *
 * @return {Any[]} array representation of the queue.
 */
M.asArray = function asArray() {
  return tree.slice(1);
}

module.exports = MinPriorityQueue;
