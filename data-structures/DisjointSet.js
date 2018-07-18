/**
 * This disjoint set implementation uses weighted quick union
 * and path compression.
 *
 * Worst-case time complexity: N + M * lg(N)
 * Where:
 * M = union-find operations
 * N = number of indeces in disjoint set
 *
 * The constructor initializes an empty disjoint set data
 * structure with length 'n' ('0' through 'n-1').
 * Each index is in its own component.
 * Initial compnent sizes are therefore of size 1.
 *
 * @param       {Integer} n number of indeces of the disjoint set ('0' through 'n-1')
 * @constructor
 * @throws Illegal Argument Error unless 'n >= 0'
 */
function DisjointSet(n) {
  if (n < 0) {
    throw new Error('Illegal Argument (n < 0)');
  }
  this.parent = new Array(n);
  this.size = new Array(n);

  // Number of different components
  this.count = n;

  // Initialization
  for (let i = 0; i < n; i += 1) {
    this.parent[i] = i;
    this.size[i] = 1;
  }
}

const D = DisjointSet.prototype;

/**
 * Connects the component containing index 'a' with the
 * component containing index 'b'.
 *
 * @param  {Integer} a first index of the disjoint set
 * @param  {Integer} b second index of the disjoint set
 * @throws Illegal Argument Error unless '0 >= a < n' and '0 >= b < n'
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
 * Returns the root of the component for the component containing index 'i'.
 *
 * @param  {Integer} i index of the disjoint set
 * @return {Integer}   root of component containing index 'i'
 * @throws Illegal Argument Error unless '0 >= i < n'
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
 * Returns true if the two indeces are in the same component.
 *
 * @param  {Integer} a first index of the disjoint set
 * @param  {Integer} b second index of the disjoint set
 * @return {Boolean}   'true' if the two given indeces ('a' and 'b') are within the same component, otherwise 'false'
 * @throws Illegal Argument Error unless '0 >= a < n' and '0 >= b < n'
 */
D.connected = function connected(a, b) {
  return this.find(a) === this.find(b);
};

/**
 * Validates if 'i' is a valid index within this disjoint set.
 *
 * @param  {Integer} i index of the disjoint set
 * @throws Illegal Argument Error unless '0 >= i < n'
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
