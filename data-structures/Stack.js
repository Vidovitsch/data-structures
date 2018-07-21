let head = null;

/**
 * A stack implementation backed by a LinkedList.
 *
 * @constructor
 */
function Stack() {
  this.length = 0;
}

/**
 * Node that fills an index in the stack.
 *
 * @param       {Any} value the value (item) to be added to this stack
 * @constructor
 */
function Node(value) {
  this.value = value;
  this.next = null;
}

const S = Stack.prototype;

/**
 * Pushes a new node at the beginning of this stack.
 *
 * Time complexity (worst): O(1)
 *
 * @param  {Any} value the value (item) to be added to this stack
 */
S.push = function push(value) {
  const oldHead = head;
  head = new Node(value);
  head.next = oldHead;
  this.length += 1;
};

/**
 * Removes the node at the beginning of this stack.
 *
 * Time complexity (worst): O(1)
 *
 * @return {Any} the value (item) of the node that has been removed from this stack
 */
S.pop = function pop() {
  const { value } = head;
  head = head.next;
  this.length -= 1;
  return value;
};

/**
 * Returns the value (item) of the most recently added node on this stack.
 *
 * Time complexity (worst): O(1)
 *
 * @return {Any} the value (item) of the node most recenly added to this stack
 */
S.peek = function peek() {
  return head.value;
};

/**
 * Returns an array of the items in this stack.
 *
 * Time complexity: O(n)
 *
 * @return {Any[]} Array of items in this stack
 */
S.asArray = function asArray() {
  const arr = new Array(this.length);
  let node = head;
  while (node.next) {
    arr.push(node.value);
    node = node.next;
  }
  return arr;
};

module.exports = Stack;
