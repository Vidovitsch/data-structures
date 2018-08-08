const { assert } = require('chai');
const { BinarySearchTree } = require('../index');

describe('BinarySearchTree', () => {
  it("BinarySearchTree should throw an error when the custom comparator doesn't return -1, 1, or 0", () => {
    function zeroComp(a, b) { return 0; }
    function negativeComp(a, b) { return -1; }
    function positiveComp(a, b) { return 1; }
    function wrongNegativeComp(a, b) { return -2; }
    function wrongPositiveComp(a, b) { return 2; }

    // No error
    let bst = new BinarySearchTree(zeroComp);
    bst.put('A', 10);
    bst.put('B', 10);
    bst = new BinarySearchTree(negativeComp);
    bst.put('B', 15);
    bst.put('C', 15);
    bst = new BinarySearchTree(positiveComp);
    bst.put('C', 20);
    bst.put('D', 20);

    // Error
    bst = new BinarySearchTree(wrongNegativeComp);
    assert.throws(() => {
      bst.put('D', 25);
      bst.put('E', 25);
    }, Error);
    bst = new BinarySearchTree(wrongPositiveComp);
    assert.throws(() => {
      bst.put('E', 30);
      bst.put('F', 30);
    }, Error);
  });

  it("put() should throw an error when the key value is 'null'", () => {
    const bst = new BinarySearchTree();
    assert.throws(() => { bst.put(null, 10) }, Error); // eslint-disable-line no-new
  });

  it("put() should add a lower key value to the left of the parent", () => {
    const bst = new BinarySearchTree();

    // Add root
    bst.put('R', 50);

    // Add three lower key values in descending order
    bst.put('C', 50);
    bst.put('B', 50);
    bst.put('A', 50);

    // Asserts
    assert.equal(bst.root.key, 'R');
    assert.equal(bst.root.right, null);
    assert.equal(bst.root.left.key, 'C');
    assert.equal(bst.root.left.left.key, 'B');
    assert.equal(bst.root.left.left.left.key, 'A');
  });

  it("put() should add a greater key value to the right of the parent", () => {
    const bst = new BinarySearchTree();

    // Add root
    bst.put('R', 50);

    // Add three greater key values in ascending order
    bst.put('S', 50);
    bst.put('T', 50);
    bst.put('U', 50);

    // Asserts
    assert.equal(bst.root.key, 'R');
    assert.equal(bst.root.left, null);
    assert.equal(bst.root.right.key, 'S');
    assert.equal(bst.root.right.right.key, 'T');
    assert.equal(bst.root.right.right.right.key, 'U');
  });

  it("put() should update an existing key", () => {
    const bst = new BinarySearchTree();

    // Add root
    bst.put('R', 50);

    // Add one lower value
    bst.put('A', 20);

    // Asserts (before)
    assert.equal(bst.root.left.key, 'A');
    assert.equal(bst.root.left.value, 20);

    // Put key 'A' again with other value
    bst.put('A', 35);

    // Asserts
    assert.equal(bst.root.left.key, 'A');
    assert.equal(bst.root.left.value, 35);
  });

  it("put() should add key value pairs when using a comparator while maintaining BST properties", () => {
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

    const bst = new BinarySearchTree(comp);

    // Put three key value pairs
    bst.put(new Node('C'), 50);
    bst.put(new Node('A'), 55);
    bst.put(new Node('E'), 60);

    // Asserts
    assert.equal(bst.root.key.data, 'C');
    assert.equal(bst.root.left.key.data, 'A');
    assert.equal(bst.root.right.key.data, 'E');
  });

  it("get() should throw an error when the BST is empty", () => {
    const bst = new BinarySearchTree();
    assert.throws(() => { bst.get('A'); }, Error);
  });

  it("get() should throw an error when the key value is 'null'", () => {
    const bst = new BinarySearchTree();

    // Put one key
    bst.put('A', 25);

    // Assert
    assert.throws(() => { bst.get(null); }, Error);
  });

  it("get() should return 'null' when key is not found", () => {
    const bst = new BinarySearchTree();

    // Put one key
    bst.put('A', 25);

    // Assert
    assert.equal(bst.get('B'), null);
  });

  it("get() should return the correct value corresponding with the given key", () => {
    const bst = new BinarySearchTree();

    // Put five keys
    bst.put('D', 10);
    bst.put('A', 15);
    bst.put('E', 20);
    bst.put('Q', 25);
    bst.put('Z', 30);

    // Assert
    assert.equal(bst.get('A'), 15);
    assert.equal(bst.get('Q'), 25);
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

    const bst = new BinarySearchTree(comp);

    // Build three nodes
    const n1 = new Node('C');
    const n2 = new Node('A');
    const n3 = new Node('E');

    // Put three key value pairs
    bst.put(n1, 10);
    bst.put(n2, 15);
    bst.put(n3, 60);

    // Asserts
    assert.equal(bst.get(n2), 15);
    assert.equal(bst.get(n3), 60);
  });

  it("remove() should throw an error when the BST is empty", () => {
    const bst = new BinarySearchTree();
    assert.throws(() => { bst.remove('A'); }, Error);
  });

  it("remove() should throw an error when the key value is 'null'", () => {
    const bst = new BinarySearchTree();

    // Put one key
    bst.put('A', 25);

    // Assert
    assert.throws(() => { bst.remove(null); }, Error);
  });

  it("remove() should remove the correct node corresponding with the given key", () => {
    const bst = new BinarySearchTree();

    // Put six keys
    bst.put('D', 10);
    bst.put('A', 15);
    bst.put('C', 15);
    bst.put('F', 20);
    bst.put('E', 20);
    bst.put('G', 25);
    bst.put('Q', 30);

    // Remove four nodes
    bst.remove('A');
    bst.remove('D');
    bst.remove('F');
    bst.remove('G');
    bst.remove('C');

    // Assert
    assert.equal(bst.get('D'), null);
    assert.equal(bst.get('F'), null);
    assert.equal(bst.get('G'), null);
    assert.equal(bst.get('A'), null);
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

    const bst = new BinarySearchTree(comp);

    // Build three nodes
    const n1 = new Node('C');
    const n2 = new Node('A');
    const n3 = new Node('E');

    // Put three key value pairs
    bst.put(n1, 10);
    bst.put(n2, 15);
    bst.put(n3, 60);

    // Remove two nodes
    bst.remove(n1);
    bst.remove(n2);

    // Asserts
    assert.equal(bst.get(n1), null);
    assert.equal(bst.get(n2), null);
  });

  it("min() should throw an error when the BST is empty", () => {
    const bst = new BinarySearchTree();
    assert.throws(() => { bst.min(); }, Error);
  });

  it("min() should return the key with the smallest value in the BST", () => {
    const bst = new BinarySearchTree();

    // Put six keys
    bst.put('D', 10);
    bst.put('A', 15);
    bst.put('F', 20);
    bst.put('E', 20);
    bst.put('G', 25);
    bst.put('Q', 30);

    // Assert
    assert.equal(bst.min(), 'A');
  });

  it("min() should return the key with the smallest value in the BST while using a comparator", () => {
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

    const bst = new BinarySearchTree(comp);

    // Build three nodes
    const n1 = new Node('C');
    const n2 = new Node('A');
    const n3 = new Node('E');
    const n4 = new Node('Q');

    // Put three key value pairs
    bst.put(n1, 10);
    bst.put(n2, 15);
    bst.put(n3, 60);
    bst.put(n4, 65);

    // Asserts
    assert.equal(bst.min(), n2);
  });

  it("max() should throw an error when the BST is empty", () => {
    const bst = new BinarySearchTree();
    assert.throws(() => { bst.max(); }, Error);
  });

  it("max() should return the key with the greatest value in the BST", () => {
    const bst = new BinarySearchTree();

    // Put six keys
    bst.put('D', 10);
    bst.put('A', 15);
    bst.put('F', 20);
    bst.put('E', 20);
    bst.put('G', 25);
    bst.put('Y', 30);

    // Assert
    assert.equal(bst.max(), 'Y');
  });

  it("max() should return the key with the greatest value in the BST while using a comparator", () => {
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

    const bst = new BinarySearchTree(comp);

    // Build three nodes
    const n1 = new Node('C');
    const n2 = new Node('A');
    const n3 = new Node('E');
    const n4 = new Node('Q');

    // Put three key value pairs
    bst.put(n1, 10);
    bst.put(n2, 15);
    bst.put(n3, 60);
    bst.put(n4, 65);

    // Asserts
    assert.equal(bst.max(), n4);
  });

  it("keys() should throw an error when the BST is empty", () => {
    const bst = new BinarySearchTree();
    assert.throws(() => { bst.keys(); }, Error);
  });

  it("keys() should return an ordered list (ascending) of all keys in the BST", () => {
    const bst = new BinarySearchTree();

    // Put six keys
    bst.put('D', 10);
    bst.put('A', 15);
    bst.put('F', 20);
    bst.put('E', 20);
    bst.put('G', 25);
    bst.put('Y', 30);

    // Get keys
    const keys = bst.keys();

    // Assert
    assert.equal(keys[0], 'A');
    assert.equal(keys[1], 'D');
    assert.equal(keys[2], 'E');
    assert.equal(keys[3], 'F');
    assert.equal(keys[4], 'G');
    assert.equal(keys[5], 'Y');
  });
});
