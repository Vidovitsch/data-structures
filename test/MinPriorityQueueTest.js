const { assert } = require('chai');
const { MinPriorityQueue } = require('../index');

describe('MinPriorityQueue', () => {
  it('a new MinPriorityQueue instance should initialize with a length of 0', () => {
    const queue = new MinPriorityQueue();

    // Assert #1
    assert.equal(queue.length, 0);
  });

  it('insert() should add an item to the queue', () => {
    const queue = new MinPriorityQueue();

    // Insert three items
    queue.insert(-5);
    queue.insert(-15);
    queue.insert(-25);

    // Assert #1 (check length)
    assert.equal(queue.length, 3);

    // Assert #2 (check for correct items)
    assert.equal(queue.asArray().indexOf(-5) !== -1, true);
    assert.equal(queue.asArray().indexOf(-15) !== -1, true);
    assert.equal(queue.asArray().indexOf(-25) !== -1, true);
  });

  it('insert() should add the min value at the top (beginning) of the queue', () => {
    const queue = new MinPriorityQueue();
    const min = -25;

    // Insert three items
    queue.insert(-5);
    queue.insert(-15);
    queue.insert(min);

    // Assert #1 (check if min at beginning)
    assert.equal(queue.asArray()[0], min);
  });

  it('getMin() should return the min value in the queue', () => {
    const queue = new MinPriorityQueue();
    const min = -1507;

    // Insert five items
    queue.insert(2019);
    queue.insert(-1499);
    queue.insert(117);
    queue.insert(min);
    queue.insert(0);

    // Assert #1 (check if min value gets returned)
    assert.equal(queue.getMin(), min);
  });

  it('delMin() should return and delete the min value in the queue', () => {
    let queue = new MinPriorityQueue();
    const min = -11507;

    // Insert nine items
    queue.insert(-2019);
    queue.insert(-1499);
    queue.insert(117);
    queue.insert(min);
    queue.insert(0);
    queue.insert(2019);
    queue.insert(1499);
    queue.insert(-117);
    queue.insert(1507);

    // Assert #1 (check if min values get returned)
    assert.equal(queue.delMin(), min);
    assert.equal(queue.delMin(), -2019);
    assert.equal(queue.delMin(), -1499);
    assert.equal(queue.delMin(), -117);
    assert.equal(queue.delMin(), 0);

    // Assert #2 (check if length has decreased)
    assert.equal(queue.length, 4);

    // Test corner cases!!!
    queue = new MinPriorityQueue();

    // Insert five items
    queue.insert(2019);
    queue.insert(-1499);
    queue.insert(117);
    queue.insert(min);
    queue.insert(0);

    // Assert #1 (check if min values get returned)
    assert.equal(queue.delMin(), min);

    // Assert #2 (check if length has decreased)
    assert.equal(queue.length, 4);
  });

  it('asArray() should return the binary queue in array format', () => {
    const queue = new MinPriorityQueue();

    // Insert five items
    queue.insert(2019);
    queue.insert(-1499);
    queue.insert(117);
    queue.insert(-1507);
    queue.insert(0);

    // Assert before
    assert.equal(queue.length, 5);

    // Assert #1 (check for correct items)
    const expected = [-1507, -1499, 117, 2019, 0]
    queue.asArray().forEach((elem, i) => {
      assert.equal(elem, expected[i])
    });
  });

  it('getMin() should throw an error when queue is empty', () => {
    assert.throws(() => { new MinPriorityQueue().getMin(); }, Error);
  });

  it('delMin() should throw an error when queue is empty', () => {
    assert.throws(() => { new MinPriorityQueue().delMin(); }, Error);
  });
});
