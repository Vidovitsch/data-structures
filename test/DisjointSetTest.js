const { assert } = require('chai');
const { DisjointSet } = require('../index');

/* eslint-disable no-undef */
describe('DisjointSet', () => {
  /**
   * Error throwing tests
   */
  it("a new instance of DisjointSet should throw an Illegal Argument error when 'n < 0'", () => {
    const n = -1;
    assert.throws(() => { new DisjointSet(n); }, Error); // eslint-disable-line no-new
  });

  it("validate() should throw an Illegal Argument error when 'i < 0' or 'i >= n'", () => {
    const n = 10;
    const i1 = -1;
    const i2 = n;
    const i3 = n + 1;
    const disjointSet = new DisjointSet(n);
    /* eslint-disable no-new */
    assert.throws(() => { disjointSet.validate(i1); }, Error);
    assert.throws(() => { disjointSet.validate(i2); }, Error);
    assert.throws(() => { disjointSet.validate(i3); }, Error);
    /* eslint-enable no-new */
  });

  it("find() should throw an Illegal Argument error when 'i < 0' or 'i >= n'", () => {
    const n = 10;
    const i1 = -1;
    const i2 = n;
    const i3 = n + 1;
    const disjointSet = new DisjointSet(n);
    /* eslint-disable no-new */
    assert.throws(() => { disjointSet.find(i1); }, Error);
    assert.throws(() => { disjointSet.find(i2); }, Error);
    assert.throws(() => { disjointSet.find(i3); }, Error);
    /* eslint-enable no-new */
  });

  it("union() should throw an Illegal Argument error when 'i < 0' or 'i >= n'", () => {
    const n = 10;
    const i1 = -1;
    const i2 = n;
    const i3 = n + 1;
    const i4 = 5;
    const disjointSet = new DisjointSet(n);
    /* eslint-disable no-new */
    assert.throws(() => { disjointSet.union(i1, i4); }, Error);
    assert.throws(() => { disjointSet.union(i2, i4); }, Error);
    assert.throws(() => { disjointSet.union(i3, i4); }, Error);
    assert.throws(() => { disjointSet.union(i4, i1); }, Error);
    assert.throws(() => { disjointSet.union(i4, i2); }, Error);
    assert.throws(() => { disjointSet.union(i4, i3); }, Error);
    /* eslint-enable no-new */
  });

  it("connected() should throw an Illegal Argument error when 'i < 0' or 'i >= n'", () => {
    const n = 10;
    const i1 = -1;
    const i2 = n;
    const i3 = n + 1;
    const i4 = 5;
    const disjointSet = new DisjointSet(n);
    /* eslint-disable no-new */
    assert.throws(() => { disjointSet.connected(i1, i4); }, Error);
    assert.throws(() => { disjointSet.connected(i2, i4); }, Error);
    assert.throws(() => { disjointSet.connected(i3, i4); }, Error);
    assert.throws(() => { disjointSet.connected(i4, i1); }, Error);
    assert.throws(() => { disjointSet.connected(i4, i2); }, Error);
    assert.throws(() => { disjointSet.connected(i4, i3); }, Error);
    /* eslint-enable no-new */
  });

  /**
   * Initialization tests
   */
  it("a new instance of DisjointSet should initialize with a component count of 'n'", () => {
    const n = 10;
    const disjointSet = new DisjointSet(n);
    assert.equal(n, disjointSet.count);
  });

  it('a new instance of DisjointSet should return the same value as the input when find() is called', () => {
    const n = 10;
    const disjointSet = new DisjointSet(n);
    for (let i = 0; i < n; i += 1) {
      assert.equal(i, disjointSet.find(i));
    }
  });

  /**
   * Functionality tests
   */
  it('union() should connect two indeces', () => {
    const n = 10;
    const a = 5;
    const b = 7;
    const disjointSet = new DisjointSet(n);
    assert.equal(false, disjointSet.connected(a, b));
    disjointSet.union(a, b);
    assert.equal(true, disjointSet.connected(a, b));
  });

  it('union() should connect two components (trees) by giving two indeces as parameters', () => {
    const n = 10;
    const a = 1;
    const b = 8;
    const disjointSet = new DisjointSet(n);
    assert.equal(false, disjointSet.connected(a, b));
    // Component 1
    disjointSet.union(1, 5);
    disjointSet.union(3, 1);
    // Component 2
    disjointSet.union(7, 8);
    disjointSet.union(5, 7);
    assert.equal(true, disjointSet.connected(1, 8));
  });

  it('union() should add the smaller component (tree) to the bigger component (tree)', () => {
    const n = 10;
    const a = 1;
    const b = 9;
    const disjointSet = new DisjointSet(n);
    // Component 1
    disjointSet.union(a, 5);
    disjointSet.union(3, a);
    disjointSet.union(2, 3);
    // Component 2
    disjointSet.union(7, 8);
    disjointSet.union(8, b);
    // Root of both components
    const root1 = disjointSet.find(a);
    let root2 = disjointSet.find(b);
    assert.equal(false, root1 === root2);
    disjointSet.union(a, b);

    // Comonent 2 is smaller, so root2 should have changed to root1
    root2 = disjointSet.find(b);
    assert.equal(true, disjointSet.find(a) === disjointSet.find(b));
  });

  it('union() should do nothing when both arguments have the same value', () => {
    const n = 10;
    const a = 5;
    const b = 5;
    const disjointSet = new DisjointSet(n);
    assert.equal(true, disjointSet.connected(a, b));
    disjointSet.union(a, b);
    assert.equal(true, disjointSet.connected(a, b));
  });

  it('find() should find the root of i', () => {
    const n = 10;
    const a = 5;
    const b = 9;
    const disjointSet = new DisjointSet(n);
    assert.equal(a, disjointSet.find(a));
    disjointSet.union(a, b);
    assert.equal(b, disjointSet.find(a));
  });

  it('connected() should return true if components are connected and false otherwise', () => {
    const n = 10;
    const a = 5;
    const b = 9;
    const disjointSet = new DisjointSet(n);
    assert.equal(false, disjointSet.connected(a, b));
    disjointSet.union(a, b);
    assert.equal(true, disjointSet.connected(a, b));
  });

  it('the component count should lower by 1 for every new union between different components', () => {
    const n = 10;
    const disjointSet = new DisjointSet(n);
    assert.equal(n, disjointSet.count);
    // new union #1
    disjointSet.union(1, 8);
    assert.equal(n - 1, disjointSet.count);
    // new union #2
    disjointSet.union(9, 8);
    assert.equal(n - 2, disjointSet.count);
    // existing union
    disjointSet.union(1, 9);
    assert.equal(n - 2, disjointSet.count);
    // new union #3
    disjointSet.union(1, 3);
    assert.equal(n - 3, disjointSet.count);
  });
});
/* eslint-enable no-undef */
