const { assert } = require('chai');
const { DisjointSet } = require('../index');

/* eslint-disable no-undef */
describe('DisjointSet', () => {
  // Constructor related tests
  it('a new instance of DisjointSet should throw a Illegal Argument error when n < 0', () => {
    const n = -1;
    assert.throws(() => { new DisjointSet(n); }, Error); // eslint-disable-line no-new
  });
  it('a new instance of DisjointSet should initialize with a component count of n', () => {
    const n = 10;
    const disjointSet = new DisjointSet(n);
    assert.equal(disjointSet.count, n);
  });

  // find() related tests
  it('a new instance of DisjointSet should return the same value as the input when find() is called', () => {
    const n = 10;
    const disjointSet = new DisjointSet(n);
    for (let i = 0; i < n; i += 1) {
      assert.equal(disjointSet.find(i), i);
    }
  });
});
/* eslint-enable no-undef */
