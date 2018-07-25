const { assert } = require('chai');
const { SinglyLinkedList } = require('../index');

describe('SinglyLinkedList', () => {
  // Tests for add() function
  it('add() should add a new item to the linked list', () => {
    const llist = new SinglyLinkedList();
    // Assert before
    assert.equal(llist.length, 0);

    // Add two items
    llist.add(8);
    llist.add(10);

    // Assert #1
    assert.equal(llist.length, 2);
    assert.equal(llist.search(0), 8);
    assert.equal(llist.search(1), 10);
  });

  // Tests for insertAt() function
  it("insertAt() should throw an error when index is out of range 'i < 0' or 'i > length' ", () => {
    const llist = new SinglyLinkedList();

    // Assert #1
    assert.throws(() => { llist.insertAt(12, 1); }, Error);

    // Add two items
    llist.add(8);
    llist.add(10);

    // Assert #2
    assert.throws(() => { llist.insertAt(12, -1); }, Error);
    assert.throws(() => { llist.insertAt(12, 3); }, Error);
  });

  it('insertAt() should insert an item on the given index within the linked list', () => {
    const llist = new SinglyLinkedList();

    // Insert first item
    llist.insertAt(8, 0);

    // Assert #1
    assert.equal(llist.search(0), 8);

    // Insert second item
    llist.insertAt(10, 0);

    // Assert #2
    assert.equal(llist.search(0), 10);
    assert.equal(llist.search(1), 8);

    // Insert second item
    llist.insertAt(12, 1);

    // Assert #3
    assert.equal(llist.search(0), 10);
    assert.equal(llist.search(1), 12);
    assert.equal(llist.search(2), 8);

    // Insert third item
    llist.insertAt(14, 2);

    // Assert #3
    assert.equal(llist.search(0), 10);
    assert.equal(llist.search(1), 12);
    assert.equal(llist.search(2), 14);
    assert.equal(llist.search(3), 8);

    // Insert fourth item
    llist.insertAt(16, 4);

    // Assert #4
    assert.equal(llist.search(0), 10);
    assert.equal(llist.search(1), 12);
    assert.equal(llist.search(2), 14);
    assert.equal(llist.search(3), 8);
    assert.equal(llist.search(4), 16);
  });

  // Tests for removeAt() function
  it ("removeAt() should throw an error when index is out of range 'i < 0' or 'i > length - 1'", () => {
    const llist = new SinglyLinkedList();

    // Assert #1 (remove from empty array)
    assert.throws(() => { llist.removeAt(0); }, Error);

    // Add three items
    llist.add(2);
    llist.add(4);
    llist.add(6);

    // Assert #2 (remove on index lower than 0)
    assert.throws(() => { llist.removeAt(-1); }, Error);

    // Assert #3 (remove on index higher than 'length - 1')
    assert.throws(() => { llist.removeAt(llist.length); }, Error);
  });

  it("removeAt() should remove an item by the given index", () => {
    const llist = new SinglyLinkedList();

    // Add five items
    llist.add(2);
    llist.add(4);
    llist.add(6);
    llist.add(8);
    llist.add(10);

    // Assert #1 (remove from head)
    assert.equal(llist.removeAt(0), 2);
    assert.equal(llist.length, 4);
    assert.equal(llist.search(0), 4); // Head has changed

    // Assert #2 (remove from tail)
    assert.equal(llist.removeAt(llist.length - 1), 10);
    assert.equal(llist.length, 3);
    assert.equal(llist.search(llist.length - 1), 8); // Tail has changed

    // Assert #3 (remove from middle)
    assert.equal(llist.removeAt(1), 6);
    assert.equal(llist.length, 2);

    // Assert #4 (remove all by head)
    assert.equal(llist.removeAt(0), 4);
    assert.equal(llist.removeAt(0), 8);
    assert.equal(llist.length, 0);
  });

  // Tests for search() function
  it ("search() should throw an error when index is out of range 'i < 0' or 'i > length - 1'", () => {
    const llist = new SinglyLinkedList();

    // Assert #1 (remove from empty array)
    assert.throws(() => { llist.search(0); }, Error);

    // Add three items
    llist.add(2);
    llist.add(4);
    llist.add(6);

    // Assert #2 (remove on index lower than 0)
    assert.throws(() => { llist.search(-1); }, Error);

    // Assert #3 (remove on index higher than 'length - 1')
    assert.throws(() => { llist.search(llist.length); }, Error);
  });

  it("search() should return a value of an item by the given index", () => {
    const llist = new SinglyLinkedList();

    // Add five items
    llist.add(2);
    llist.add(4);
    llist.add(6);
    llist.add(8);
    llist.add(10);

    // Assert #1 (search head)
    assert.equal(llist.search(0), 2);

    // Assert #2 (search tail)
    assert.equal(llist.search(llist.length - 1), 10);

    // Assert #3 (search middle)
    assert.equal(llist.search(2), 6);
  });

  // Tests for asArray() function
  it('asArray() should return an array corresponding with the items in the linked list', () => {
    const llist = new SinglyLinkedList();

    let llArr = llist.asArray();

    // Assert #1
    assert.equal(llArr.length, 0);

    llist.add(10);
    llist.add(8);
    llist.add(12);
    llArr = llist.asArray();

    // Assert #2
    assert.equal(llArr[0], 10);
    assert.equal(llArr[1], 8);
    assert.equal(llArr[2], 12);
  });
});
