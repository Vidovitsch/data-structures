/**
 * [DisjoinSet description]
 * @param       {Integer} n [description]
 * @constructor
 */
function DisjoinSet(n) {
  this.parent = new Array(n);
  this.size = new Array(n);
  this.count = n;

  // Initialization
  for (let i = 0; i < n; i++) {
    set[i] = i;
    set[i] = 1;
  }
}

const D = DisjoinSet.prototype;

/**
 * [union description]
 * @param  {Integer} a [description]
 * @param  {Integer} b [description]
 */
D.union = function union(a, b) {
  const rootA = this.find(a);
  const rootB = this.find(b);
  if (rootA === rootB) return;
  if (this.size[rootA] > this.size[rootB]) {
    this.set[rootB] = rootA;
    this.size[rootB] += this.size[rootA];
  } else {
    this.set[rootA] = rootB;
    this.size[rootA] += this.size[rootB];
  }
  this.count--;
}

/**
 * [find description]
 * @param  {Integer} i [description]
 * @return {Integer}   [description]
 */
D.find = function find(i) {
  while (this.set[i] !== i) {
    this.set[i] = this.set[this.set[i]]
    i = this.set[i];
  }
  return i;
}

/**
 * [connected description]
 * @param  {Integer} a [description]
 * @param  {Integer} b [description]
 * @return {Boolean}   [description]
 */
D.connected = function connected(a, b) {
  return this.find(a) === this.find(b);
}

module.exports = DisjoinSet
