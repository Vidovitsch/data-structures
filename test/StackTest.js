const { assert } = require('chai');
const { Stack } = require('../index');

/* eslint-disable no-undef */
describe('Stack', () => {
  it('pop() should throw an error when the stack is empty', () => {
    const stack = new Stack();
    // Assert before
    assert.equal(stack.length, 0);

    // Assert #1
    assert.throws(() => { stack.pop(); }, Error);
  });

  it('peek() should throw an error when the stack is empty', () => {
    const stack = new Stack();
    // Assert before
    assert.equal(stack.length, 0);

    // Assert #1
    assert.throws(() => { stack.peek(); }, Error);
  });

  it('push() should add a new item to the beginning of the stack', () => {
    const stack = new Stack();
    // Assert before
    assert.equal(stack.length, 0);

    // Push first item
    stack.push(8);

    // Assert #1
    assert.equal(stack.length, 1);
    assert.equal(stack.peek(), 8);

    // Push second item
    stack.push(10);

    // Assert #2
    assert.equal(stack.length, 2);
    assert.equal(stack.peek(), 10);
  });

  it('pop() should remove the item at the beginning of the stack', () => {
    let poppedItem;
    const stack = new Stack();
    stack.push(8);
    stack.push(10);
    stack.push(12);

    // Assert before
    assert.equal(stack.length, 3);
    assert.equal(stack.peek(), 12);

    // Pop first item
    poppedItem = stack.pop();

    // Assert #1
    assert.equal(poppedItem, 12);
    assert.equal(stack.length, 2);
    assert.equal(stack.peek(), 10);

    // Pop second item
    poppedItem = stack.pop();

    // Assert #2
    assert.equal(poppedItem, 10);
    assert.equal(stack.length, 1);
    assert.equal(stack.peek(), 8);
  });

  it('peek() should show the item at the beginning of the stack', () => {
    const stack = new Stack();
    stack.push(8);
    stack.push(10);
    stack.push(12);

    // Assert #1
    assert.equal(stack.peek(), 12);

    // Pop first item
    stack.pop();

    // Assert #2
    assert.equal(stack.peek(), 10);
  });

  it('asArray() should return an array corresponding with the items in the stack', () => {
    const stack = new Stack();

    let stackArr = stack.asArray();

    // Assert #1
    assert.equal(stackArr.length, 0);

    stack.push(10);
    stack.push(8);
    stack.push(12);
    stackArr = stack.asArray();

    // Assert #2
    assert.equal(stackArr[0], 12);
    assert.equal(stackArr[1], 8);
    assert.equal(stackArr[2], 10);
  });
});
/* eslint-enable no-undef */
