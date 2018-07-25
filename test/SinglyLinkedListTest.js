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

  //Tests for insertAt() function
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
    llist.insertAt(10, 1);

    // Assert #2
    assert.equal(llist.search(0), 8);
    assert.equal(llist.search(1), 10);

    // Insert second item
    llist.insertAt(12, 1);

    // Assert #3
    assert.equal(llist.search(0), 8);
    assert.equal(llist.search(1), 12);
    assert.equal(llist.search(2), 10);
  });
});
