const { assert } = require('chai');
const { Bag } = require('../index');

/* eslint-disable no-undef */
describe('Bag', () => {
  it('add() should add a new item to the bag', () => {
    const bag = new Bag();
    // Assert before
    assert.equal(bag.length, 0);

    // Add first item
    bag.add(8);

    // Assert #1
    assert.equal(bag.length, 1);

    // Add second item
    bag.add(10);

    // Assert #2
    assert.equal(bag.length, 2);
  });

  it('asArray() should return an array corresponding with the items in the bag', () => {
    const bag = new Bag();

    let bagArr = bag.asArray();

    // Assert #1
    assert.equal(bagArr.length, 0);

    bag.add(10);
    bag.add(8);
    bag.add(12);
    bagArr = bag.asArray();

    // Assert #2
    assert.equal(bagArr[0], 12);
    assert.equal(bagArr[1], 8);
    assert.equal(bagArr[2], 10);
  });
});
/* eslint-enable no-undef */
