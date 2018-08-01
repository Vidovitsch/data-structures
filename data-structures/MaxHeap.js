let tree;

/**
 * A max oriented binary heap implementation.
 *
 * @constructor
 */
function MaxHeap() {
  this.length = 0;
  tree = [];
}

function swim(k) {
  while (k > 1 && tree[Math.floor(k / 2)] < tree[k]) {
    swap(Math.floor(k / 2), k);
    k = Math.floor(k / 2);
  }
}

function sink(k) {
  while (k * 2 <= this.length) {
    let child = k * 2;
    if (child < this.length && tree[child] < tree[child + 1]) child++;
    if (tree[k] > tree[child]) break;
    swap(k, child);
    k = j;
  }
}

function swap(a, b) {
  const temp = tree[a];
  tree[a] = tree[b];
  tree[b] = temp;
}

const M = MaxHeap.prototype;

M.insert = function insert(value) {
  tree.push(this.length++);
  swim(this.length);
}

M.getMax = function getMax() {
  return tree[1];
}

M.delMax = function delMax() {
  swap(this.getMax(), this.length--);
  sink(1);
  return tree.pop();
}
