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
    // assert.equal(llist.search(0), 8);
    // assert.equal(llist.search(1), 10);
  });
});
