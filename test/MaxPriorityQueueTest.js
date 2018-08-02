const { assert } = require('chai');
const { MaxPriorityQueue } = require('../index');

describe('MaxPriorityQueue', () => {
  it('a new MaxPriorityQueue instance should initialize with a length of 0', () => {
    const queue = new MaxPriorityQueue();

    // Assert #1
    assert.equal(queue.length, 0);
  });

  it('insert() should add an item to the queue', () => {
    const queue = new MaxPriorityQueue();

    // Insert three items
    queue.insert(5);
    queue.insert(15);
    queue.insert(25);

    // Assert #1 (check length)
    assert.equal(queue.length, 3);

    // Assert #2 (check for correct items)
    assert.equal(queue.asArray().indexOf(5) !== -1, true);
    assert.equal(queue.asArray().indexOf(15) !== -1, true);
    assert.equal(queue.asArray().indexOf(25) !== -1, true);
  });

  it('insert() should add the max value at the top (beginning) of the queue', () => {
    const queue = new MaxPriorityQueue();
    const max = 25;

    // Insert three items
    queue.insert(5);
    queue.insert(15);
    queue.insert(max);

    // Assert #1 (check if max at beginning)
    assert.equal(queue.asArray()[0], max);
  });

  it('getMax() should return the max value in the queue', () => {
    const queue = new MaxPriorityQueue();
    const max = 1507;

    // Insert five items
    queue.insert(-2019);
    queue.insert(1499);
    queue.insert(-117);
    queue.insert(max);
    queue.insert(0);

    // Assert #1 (check if max value gets returned)
    assert.equal(queue.getMax(), max);
  });

  it('delMax() should return and delete the max value in the queue', () => {
    let queue = new MaxPriorityQueue();
    const max = 11507;

    // Insert nine items
    queue.insert(-2019);
    queue.insert(1499);
    queue.insert(-117);
    queue.insert(max);
    queue.insert(0);
    queue.insert(2019);
    queue.insert(-1499);
    queue.insert(117);
    queue.insert(-1507);

    // Assert #1 (check if max values get returned)
    assert.equal(queue.delMax(), max);
    assert.equal(queue.delMax(), 2019);
    assert.equal(queue.delMax(), 1499);
    assert.equal(queue.delMax(), 117);
    assert.equal(queue.delMax(), 0);

    // Assert #2 (check if length has decreased)
    assert.equal(queue.length, 4);

    // Test corner cases!!!
    queue = new MaxPriorityQueue();

    // Insert five items
    queue.insert(-2019);
    queue.insert(1499);
    queue.insert(-117);
    queue.insert(max);
    queue.insert(0);

    // Assert #1 (check if max values get returned)
    assert.equal(queue.delMax(), max);

    // Assert #2 (check if length has decreased)
    assert.equal(queue.length, 4);
  });

  it('asArray() should return the binary queue in array format', () => {
    const queue = new MaxPriorityQueue();

    // Insert five items
    queue.insert(-2019);
    queue.insert(1499);
    queue.insert(-117);
    queue.insert(1507);
    queue.insert(0);

    // Assert before
    assert.equal(queue.length, 5);

    // Assert #1 (check for correct items)
    const expected = [1507, 1499, -117, -2019, 0]
    queue.asArray().forEach((elem, i) => {
      assert.equal(elem, expected[i])
    });
  });

  it('getMax() should throw an error when queue is empty', () => {
    assert.throws(() => { new MaxPriorityQueue().getMax(); }, Error);
  });

  it('delMax() should throw an error when queue is empty', () => {
    assert.throws(() => { new MaxPriorityQueue().delMax(); }, Error);
  });
});
