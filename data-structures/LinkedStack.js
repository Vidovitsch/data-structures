/**
 * Node that fills an index in the Stack.
 *
 * @param       {Any} value the value (item) to be added to this stack
 * @constructor
 */
function Node(value) {
  this.value = value;
  this.next = null;
}

/**
 * A stack implementation backed by a LinkedList.
 *
 * @constructor
 */
function LinkedStack() {
  this.head = null;
  this.length = 0;
}

const L = LinkedStack.prototype;

/**
 * Pushes a new node at the beginning of this stack.
 *
 * Time complexity (worst): O(1)
 *
 * @param  {Any} value the value (item) to be added to this stack
 */
L.push = function push(value) {
  const oldHead = this.head;
  this.head = new Node(value);
  this.head.next = oldHead;
  this.length += 1;
};

/**
 * Removes the node at the beginning of this stack.
 *
 * Time complexity (worst): O(1)
 *
 * @return {Any} the value (item) of the node that has been removed from this stack
 */
L.pop = function pop() {
  const { value } = this.head;
  this.head = this.head.next;
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
L.peek = function peek() {
  return this.head.value;
};

module.exports = LinkedStack;
