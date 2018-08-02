const { assert } = require('chai');
const { MaxHeap } = require('../index');

describe('MaxHeap', () => {
  it('a new MaxHeap instance should initialize with a length of 0', () => {
    const heap = new MaxHeap();

    // Assert #1
    assert.equal(heap.length, 0);
  });

  it('insert() should add an item to the heap', () => {
    const heap = new MaxHeap();

    // Insert three items
    heap.insert(5);
    heap.insert(15);
    heap.insert(25);

    // Assert #1 (check length)
    assert.equal(heap.length, 3);

    // Assert #2 (check for correct items)
    assert.equal(heap.asArray().indexOf(5) !== -1, true);
    assert.equal(heap.asArray().indexOf(15) !== -1, true);
    assert.equal(heap.asArray().indexOf(25) !== -1, true);
  });

  it('insert() should add the max value at the top (beginning) of the heap', () => {
    const heap = new MaxHeap();
    const max = 25;

    // Insert three items
    heap.insert(5);
    heap.insert(15);
    heap.insert(max);

    // Assert #1 (check if max at beginning)
    assert.equal(heap.asArray()[0], max);
  });

  it('getMax() should return the max value in the heap', () => {
    const heap = new MaxHeap();
    const max = 1507;

    // Insert five items
    heap.insert(-2019);
    heap.insert(1499);
    heap.insert(-117);
    heap.insert(max);
    heap.insert(0);

    // Assert #1 (check if max value gets returned)
    assert.equal(heap.getMax(), max);
  });

  it('delMax() should return and delete the max value in the heap', () => {
    let heap = new MaxHeap();
    const max = 11507;

    // Insert nine items
    heap.insert(-2019);
    heap.insert(1499);
    heap.insert(-117);
    heap.insert(max);
    heap.insert(0);
    heap.insert(2019);
    heap.insert(-1499);
    heap.insert(117);
    heap.insert(-1507);

    // Assert #1 (check if max values get returned)
    assert.equal(heap.delMax(), max);
    assert.equal(heap.delMax(), 2019);
    assert.equal(heap.delMax(), 1499);
    assert.equal(heap.delMax(), 117);
    assert.equal(heap.delMax(), 0);

    // Assert #2 (check if length has decreased)
    assert.equal(heap.length, 4);

    // Test corner cases!!!
    heap = new MaxHeap();

    // Insert five items
    heap.insert(-2019);
    heap.insert(1499);
    heap.insert(-117);
    heap.insert(max);
    heap.insert(0);

    // Assert #1 (check if max values get returned)
    assert.equal(heap.delMax(), max);

    // Assert #2 (check if length has decreased)
    assert.equal(heap.length, 4);
  });

  it('asArray() should return the binary heap in array format', () => {
    const heap = new MaxHeap();

    // Insert five items
    heap.insert(-2019);
    heap.insert(1499);
    heap.insert(-117);
    heap.insert(1507);
    heap.insert(0);

    // Assert before
    assert.equal(heap.length, 5);

    // Assert #1 (check for correct items)
    const expected = [1507, 1499, -117, -2019, 0]
    heap.asArray().forEach((elem, i) => {
      assert.equal(elem, expected[i])
    });
  });

  it('getMax() should throw an error when heap is empty', () => {
    assert.throws(() => { new MaxHeap().getMax(); }, Error);
  });

  it('delMax() should throw an error when heap is empty', () => {
    assert.throws(() => { new MaxHeap().delMax(); }, Error);
  });
});
