const { assert } = require('chai');
const { Queue } = require('../index');

describe('Queue', () => {
  it('dequeue() should throw an error when the queue is empty', () => {
    const queue = new Queue();
    // Assert before
    assert.equal(queue.length, 0);

    // Assert #1
    assert.throws(() => { queue.dequeue(); }, Error);
  });

  it('peek() should throw an error when the queue is empty', () => {
    const queue = new Queue();
    // Assert before
    assert.equal(queue.length, 0);

    // Assert #1
    assert.throws(() => { queue.peek(); }, Error);
  });

  it('enqueue() should add a new item to the end of the queue', () => {
    const queue = new Queue();
    // Assert before
    assert.equal(queue.length, 0);

    // Enqueue first item
    queue.enqueue(8);

    // Assert #1
    assert.equal(queue.length, 1);

    // Enqueue second item
    queue.enqueue(10);

    // Assert #2
    assert.equal(queue.length, 2);
  });

  it('dequeue() should remove the item at the beginning of the queue', () => {
    let dequeuedItem;
    const queue = new Queue();
    queue.enqueue(8);
    queue.enqueue(10);
    queue.enqueue(12);

    // Assert before
    assert.equal(queue.length, 3);

    // Dequeue first item
    dequeuedItem = queue.dequeue();

    // Assert #1
    assert.equal(dequeuedItem, 8);
    assert.equal(queue.length, 2);

    // Dequeue second item
    dequeuedItem = queue.dequeue();

    // Assert #2
    assert.equal(dequeuedItem, 10);
    assert.equal(queue.length, 1);
  });

  it('peek() should show the item at the beginning of the queue', () => {
    const queue = new Queue();
    queue.enqueue(8);
    queue.enqueue(10);
    queue.enqueue(12);

    // Assert #1
    assert.equal(queue.peek(), 8);

    // Dequeue first item
    queue.dequeue();

    // Assert #2
    assert.equal(queue.peek(), 10);
  });

  it('asArray() should return an array corresponding with the items in the queue', () => {
    const queue = new Queue();

    let queueArr = queue.asArray();

    // Assert #1
    assert.equal(queueArr.length, 0);

    queue.enqueue(10);
    queue.enqueue(8);
    queue.enqueue(12);
    queueArr = queue.asArray();

    // Assert #2
    assert.equal(queueArr[0], 10);
    assert.equal(queueArr[1], 8);
    assert.equal(queueArr[2], 12);
  });
});
