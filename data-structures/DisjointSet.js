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
  for (let i = 0; i < n; i += 1) {
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
    this.size[rootA] += this.size[rootB];
  } else {
    this.parent[rootA] = rootB;
    this.size[rootB] += this.size[rootA];
  }
  this.count -= 1;
};

/**
 * [find description]
 * @param  {Integer} i [description]
 * @return {Integer}   [description]
 */
D.find = function find(i) {
  this.validate(i);
  let index = i;
  while (this.parent[index] !== index) {
    this.parent[index] = this.parent[this.parent[index]];
    index = this.parent[index];
  }
  return index;
};

/**
 * [connected description]
 * @param  {Integer} a [description]
 * @param  {Integer} b [description]
 * @return {Boolean}   [description]
 */
D.connected = function connected(a, b) {
  return this.find(a) === this.find(b);
};

/**
 *
 * @param  {Integer} i [description]
 */
D.validate = function validate(i) {
  const n = this.parent.length;
  if (i < 0) {
    throw Error(`Illegal Argument: ${i} is smaller than 0 (i < 0)`);
  } else if (i >= n) {
    throw Error(`Illegal Argument: ${i} is bigger than or equal to ${n} (i >= n)`);
  }
};

module.exports = DisjointSet;
