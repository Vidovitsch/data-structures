let head = null;

function Bag() {
  this.length = 0;
}

/**
 * Node that fills an index in the bag.
 *
 * @param       {Any} value the value (item) to be added to this bag
 * @constructor
 */
function Node(value) {
  this.value = value;
  this.next = null;
}

const B = Bag.prototype;

/**
 * Adds a value to this bag.
 *
 * Time complexity (worst): O(1)
 *
 * @param {Any} value the value to be added to this bag
 */
B.add = function add(value) {
  const oldHead = head;
  head = new Node(value);
  head.next = oldHead;
  this.length += 1;
};

/**
 * Returns an array of the items in this bag.
 *
 * Time complexity: O(n)
 *
 * @return {Any[]} Array of items in this bag
 */
B.asArray = function asArray() {
  const arr = new Array(this.length);
  let node = head;
  while (node.next) {
    arr.push(node.value);
    node = node.next;
  }
  return arr;
};

module.exports = Bag;
