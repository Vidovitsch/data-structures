const { assert } = require('chai');
const { RedBlackTree } = require('../index');

describe('RedBlackTree', () => {
  it("RedBlackTree should throw an error when the custom comparator doesn't return -1, 1, or 0", () => {
    function zeroComp(a, b) { return 0; }
    function negativeComp(a, b) { return -1; }
    function positiveComp(a, b) { return 1; }
    function wrongNegativeComp(a, b) { return -2; }
    function wrongPositiveComp(a, b) { return 2; }

    // No error
    let rbt = new RedBlackTree(zeroComp);
    rbt.put('A', 10);
    rbt.put('B', 10);
    rbt = new RedBlackTree(negativeComp);
    rbt.put('B', 15);
    rbt.put('C', 15);
    rbt = new RedBlackTree(positiveComp);
    rbt.put('C', 20);
    rbt.put('D', 20);

    // Error
    rbt = new RedBlackTree(wrongNegativeComp);
    assert.throws(() => {
      rbt.put('D', 25);
      rbt.put('E', 25);
    }, Error);
    rbt = new RedBlackTree(wrongPositiveComp);
    assert.throws(() => {
      rbt.put('E', 30);
      rbt.put('F', 30);
    }, Error);
  });

  it("put() should throw an error when the key value is 'null'", () => {
    const rbt = new RedBlackTree();
    assert.throws(() => { rbt.put(null, 10) }, Error); // eslint-disable-line no-new
  });

  it("put() should add values to the root of the RBT", () => {
    const rbt = new RedBlackTree();

    // Add four key values
    rbt.put('D', 5);
    rbt.put('A', 55);
    rbt.put('B', 60);
    rbt.put('C', 65);

    // Asserts
    assert.equal(rbt.get('D'), 5);
    assert.equal(rbt.get('A'), 55);
    assert.equal(rbt.get('B'), 60);
    assert.equal(rbt.get('C'), 65);
  });

  it("put() should update an existing key", () => {
    const rbt = new RedBlackTree();

    // Add root
    rbt.put('R', 50);

    // Add one lower value
    rbt.put('A', 20);

    // Assert (before)
    assert.equal(rbt.get('A'), 20);

    // Put key 'A' again with other value
    rbt.put('A', 35);

    // Assert
    assert.equal(rbt.get('A'), 35);
  });

  it("put() should add key value pairs when using a comparator while maintaining rbt properties", () => {
    // Create custom type
    function Node(value) {
      this.data = value;
    }
    // Create comparator
    const comp = function(a, b) {
      if (a.data < b.data) return -1;
      if (a.data > b.data) return 1;
      return 0;
    }

    const rbt = new RedBlackTree(comp);

    // Put two key value pairs
    rbt.put(new Node('C'), 50);
    rbt.put(new Node('A'), 55);

    // Asserts
    assert.equal(rbt.root.key.data, 'C');
    assert.equal(rbt.root.left.key.data, 'A');
  });

  it("get() should throw an error when the rbt is empty", () => {
    const rbt = new RedBlackTree();
    assert.throws(() => { rbt.get('A'); }, Error);
  });

  it("get() should throw an error when the key value is 'null'", () => {
    const rbt = new RedBlackTree();

    // Put one key
    rbt.put('A', 25);

    // Assert
    assert.throws(() => { rbt.get(null); }, Error);
  });

  it("get() should return 'null' when key is not found", () => {
    const rbt = new RedBlackTree();

    // Put one key
    rbt.put('A', 25);

    // Assert
    assert.equal(rbt.get('B'), null);
  });

  it("get() should return the correct value corresponding with the given key", () => {
    const rbt = new RedBlackTree();

    // Put five keys
    rbt.put('D', 10);
    rbt.put('A', 15);
    rbt.put('E', 20);
    rbt.put('Q', 25);
    rbt.put('Z', 30);

    // Assert
    assert.equal(rbt.get('A'), 15);
    assert.equal(rbt.get('Q'), 25);
  });

  it("get() should return the correct value corresponding with the given key while using a comparator", () => {
    // Create custom type
    function Node(value) {
      this.data = value;
    }
    // Create comparator
    const comp = function(a, b) {
      if (a.data < b.data) return -1;
      if (a.data > b.data) return 1;
      return 0;
    }

    const rbt = new RedBlackTree(comp);

    // Build three nodes
    const n1 = new Node('C');
    const n2 = new Node('A');
    const n3 = new Node('E');

    // Put three key value pairs
    rbt.put(n1, 10);
    rbt.put(n2, 15);
    rbt.put(n3, 60);

    // Asserts
    assert.equal(rbt.get(n2), 15);
    assert.equal(rbt.get(n3), 60);
  });

  it("remove() should throw an error when the rbt is empty", () => {
    const rbt = new RedBlackTree();
    assert.throws(() => { rbt.remove('A'); }, Error);
  });

  it("remove() should throw an error when the key value is 'null'", () => {
    const rbt = new RedBlackTree();

    // Put one key
    rbt.put('A', 25);

    // Assert
    assert.throws(() => { rbt.remove(null); }, Error);
  });

  it("remove() should remove the correct node corresponding with the given key", () => {
    const rbt = new RedBlackTree();

    // Put six keys
    rbt.put('D', 10);
    rbt.put('A', 15);
    rbt.put('C', 15);
    rbt.put('F', 20);
    rbt.put('E', 20);
    rbt.put('G', 25);
    rbt.put('Q', 30);

    // Remove four nodes
    rbt.remove('A');
    rbt.remove('D');
    rbt.remove('F');
    rbt.remove('G');
    rbt.remove('C');

    // Test corner case: key not found
    rbt.remove('Z');

    // Assert
    assert.equal(rbt.get('D'), null);
    assert.equal(rbt.get('F'), null);
    assert.equal(rbt.get('G'), null);
    assert.equal(rbt.get('A'), null);
  });

  it("remove() should return the correct value corresponding with the given key while using a comparator", () => {
    // Create custom type
    function Node(value) {
      this.data = value;
    }
    // Create comparator
    const comp = function(a, b) {
      if (a.data < b.data) return -1;
      if (a.data > b.data) return 1;
      return 0;
    }

    const rbt = new RedBlackTree(comp);

    // Build three nodes
    const n1 = new Node('C');
    const n2 = new Node('A');
    const n3 = new Node('E');

    // Put three key value pairs
    rbt.put(n1, 10);
    rbt.put(n2, 15);
    rbt.put(n3, 60);

    // Remove two nodes
    rbt.remove(n1);
    rbt.remove(n2);

    // Asserts
    assert.equal(rbt.get(n1), null);
    assert.equal(rbt.get(n2), null);
  });

  it("min() should throw an error when the rbt is empty", () => {
    const rbt = new RedBlackTree();
    assert.throws(() => { rbt.min(); }, Error);
  });

  it("min() should return the key with the smallest value in the rbt", () => {
    const rbt = new RedBlackTree();

    // Put six keys
    rbt.put('D', 10);
    rbt.put('A', 15);
    rbt.put('F', 20);
    rbt.put('E', 20);
    rbt.put('G', 25);
    rbt.put('Q', 30);

    // Assert
    assert.equal(rbt.min(), 'A');
  });

  it("min() should return the key with the smallest value in the rbt while using a comparator", () => {
    // Create custom type
    function Node(value) {
      this.data = value;
    }
    // Create comparator
    const comp = function(a, b) {
      if (a.data < b.data) return -1;
      if (a.data > b.data) return 1;
      return 0;
    }

    const rbt = new RedBlackTree(comp);

    // Build three nodes
    const n1 = new Node('C');
    const n2 = new Node('A');
    const n3 = new Node('E');
    const n4 = new Node('Q');

    // Put three key value pairs
    rbt.put(n1, 10);
    rbt.put(n2, 15);
    rbt.put(n3, 60);
    rbt.put(n4, 65);

    // Asserts
    assert.equal(rbt.min(), n2);
  });

  it("max() should throw an error when the rbt is empty", () => {
    const rbt = new RedBlackTree();
    assert.throws(() => { rbt.max(); }, Error);
  });

  it("max() should return the key with the greatest value in the rbt", () => {
    const rbt = new RedBlackTree();

    // Put six keys
    rbt.put('D', 10);
    rbt.put('A', 15);
    rbt.put('F', 20);
    rbt.put('E', 20);
    rbt.put('G', 25);
    rbt.put('Y', 30);

    // Assert
    assert.equal(rbt.max(), 'Y');
  });

  it("max() should return the key with the greatest value in the rbt while using a comparator", () => {
    // Create custom type
    function Node(value) {
      this.data = value;
    }
    // Create comparator
    const comp = function(a, b) {
      if (a.data < b.data) return -1;
      if (a.data > b.data) return 1;
      return 0;
    }

    const rbt = new RedBlackTree(comp);

    // Build three nodes
    const n1 = new Node('C');
    const n2 = new Node('A');
    const n3 = new Node('E');
    const n4 = new Node('Q');

    // Put three key value pairs
    rbt.put(n1, 10);
    rbt.put(n2, 15);
    rbt.put(n3, 60);
    rbt.put(n4, 65);

    // Asserts
    assert.equal(rbt.max(), n4);
  });

  it("keys() should throw an error when the rbt is empty", () => {
    const rbt = new RedBlackTree();
    assert.throws(() => { rbt.keys(); }, Error);
  });

  it("keys() should return an ordered list (ascending) of all keys in the rbt", () => {
    const rbt = new RedBlackTree();

    // Put six keys
    rbt.put('D', 10);
    rbt.put('A', 15);
    rbt.put('F', 20);
    rbt.put('E', 20);
    rbt.put('G', 25);
    rbt.put('Y', 30);

    // Get keys
    const keys = rbt.keys();

    // Assert
    assert.equal(keys[0], 'A');
    assert.equal(keys[1], 'D');
    assert.equal(keys[2], 'E');
    assert.equal(keys[3], 'F');
    assert.equal(keys[4], 'G');
    assert.equal(keys[5], 'Y');
  });
});
