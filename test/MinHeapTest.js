const { assert } = require('chai');
const { MinHeap } = require('../index');

describe('MinHeap', () => {
  it('a new MinHeap instance should initialize with a length of 0', () => {
    const heap = new MinHeap();

    // Assert #1
    assert.equal(heap.length, 0);
  });

  it('insert() should add an item to the heap', () => {
    const heap = new MinHeap();

    // Insert three items
    heap.insert(-5);
    heap.insert(-15);
    heap.insert(-25);

    // Assert #1 (check length)
    assert.equal(heap.length, 3);

    // Assert #2 (check for correct items)
    assert.equal(heap.asArray().indexOf(-5) !== -1, true);
    assert.equal(heap.asArray().indexOf(-15) !== -1, true);
    assert.equal(heap.asArray().indexOf(-25) !== -1, true);
  });

  it('insert() should add the min value at the top (beginning) of the heap', () => {
    const heap = new MinHeap();
    const min = -25;

    // Insert three items
    heap.insert(-5);
    heap.insert(-15);
    heap.insert(min);

    // Assert #1 (check if min at beginning)
    assert.equal(heap.asArray()[0], min);
  });

  it('getMin() should return the min value in the heap', () => {
    const heap = new MinHeap();
    const min = -1507;

    // Insert five items
    heap.insert(2019);
    heap.insert(-1499);
    heap.insert(117);
    heap.insert(min);
    heap.insert(0);

    // Assert #1 (check if min value gets returned)
    assert.equal(heap.getMin(), min);
  });

  it('delMin() should return and delete the min value in the heap', () => {
    let heap = new MinHeap();
    const min = -11507;

    // Insert nine items
    heap.insert(-2019);
    heap.insert(-1499);
    heap.insert(117);
    heap.insert(min);
    heap.insert(0);
    heap.insert(2019);
    heap.insert(1499);
    heap.insert(-117);
    heap.insert(1507);

    // Assert #1 (check if min values get returned)
    assert.equal(heap.delMin(), min);
    assert.equal(heap.delMin(), -2019);
    assert.equal(heap.delMin(), -1499);
    assert.equal(heap.delMin(), -117);
    assert.equal(heap.delMin(), 0);

    // Assert #2 (check if length has decreased)
    assert.equal(heap.length, 4);

    // Test corner cases!!!
    heap = new MinHeap();

    // Insert five items
    heap.insert(2019);
    heap.insert(-1499);
    heap.insert(117);
    heap.insert(min);
    heap.insert(0);

    // Assert #1 (check if min values get returned)
    assert.equal(heap.delMin(), min);

    // Assert #2 (check if length has decreased)
    assert.equal(heap.length, 4);
  });

  it('asArray() should return the binary heap in array format', () => {
    const heap = new MinHeap();

    // Insert five items
    heap.insert(2019);
    heap.insert(-1499);
    heap.insert(117);
    heap.insert(-1507);
    heap.insert(0);

    // Assert before
    assert.equal(heap.length, 5);

    // Assert #1 (check for correct items)
    const expected = [-1507, -1499, 117, 2019, 0]
    heap.asArray().forEach((elem, i) => {
      assert.equal(elem, expected[i])
    });
  });

  it('getMin() should throw an error when heap is empty', () => {
    assert.throws(() => { new MinHeap().getMin(); }, Error);
  });

  it('delMin() should throw an error when heap is empty', () => {
    assert.throws(() => { new MinHeap().delMin(); }, Error);
  });
});
