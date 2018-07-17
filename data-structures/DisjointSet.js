/**
 * This disjoint set implementation uses weighted quick union
 * and path compression.
 *
 * @param       {Integer} n [description]
 * @constructor
 */
function DisjointSet(n) {
  if (n < 0) {
    throw new Error('Illegal Argument (n < 0)');
  }
  this.parent = new Array(n);
  this.size = new Array(n);
  this.count = n;

  // Initialization
  for (let i = 0; i < n; i++) {
    this.parent[i] = i;
    this.size[i] = 1;
  }
}

const D = DisjointSet.prototype;

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
    this.parent[rootB] = rootA;
    this.size[rootB] += this.size[rootA];
  } else {
    this.parent[rootA] = rootB;
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
  while (this.parent[i] !== i) {
    this.parent[i] = this.parent[this.parent[i]]
    i = this.parent[i];
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

module.exports = DisjointSet;
