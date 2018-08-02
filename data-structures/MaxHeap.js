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

function swap(a, b) {
  const temp = tree[a];
  tree[a] = tree[b];
  tree[b] = temp;
}

function swim(k) {
  while (k > 1 && tree[Math.floor(k / 2)] < tree[k]) {
    swap(k, Math.floor(k / 2));
    k = Math.floor(k / 2);
  }
}

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

M.insert = function insert(value) {
  tree.push(value);
  this.length++;
  swim(this.length);
}

M.getMax = function getMax() {
  if (this.length === 0) throw new Error('Not Found: heap is empty');
  return tree[1];
}

M.delMax = function delMax() {
  if (this.length === 0) throw new Error('Not Found: heap is empty');
  swap(1, this.length);
  this.length--;
  sink(1, this.length);
  return tree.pop();
}

M.asArray = function asArray() {
  return tree.slice(1);
}

module.exports = MaxHeap;
