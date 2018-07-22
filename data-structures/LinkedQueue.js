let head = null;
let tail = null;

/**
 * A queue implementation backed by a LinkedList.
 * @constructor
 */
function LinkedQueue() {
  this.length = 0;
}

/**
 * Node that fills an index in the queue.
 *
 * @param       {Any} value the value (item) to be added to this queue
 * @constructor
 */
function Node(value) {
  this.value = value;
  this.next = null;
}

const L = LinkedQueue.prototype;

/**
 * Enqueues a new node in this queue.
 *
 * Time complexity (worst): O(1)
 *
 * @param  {Any} value the value (item) to be added to this queue
 */
L.enqueue = function enqueue(value) {
  const oldTail = tail;
  tail = new Node(value);
  oldTail.next = tail;
  this.length += 1;
};

/**
 * Dequeues a node from this queue.
 *
 * Time complexity (worst): O(1)
 *
 * @return {[type]} [description]
 * @throws No Such Element error unless 'length > 0'
 */
L.dequeue = function dequeue() {
  if (this.length === 0) {
    throw new Error('No Such Element: queue is empty');
  }
  const oldHead = head;
  head = oldHead.next;
  this.length -= 1;
  return oldHead.value;
};

/**
 * Returns the value (item) of the least recently added node on this queue.
 *
 * Time complexity (worst): O(1)
 *
 * @return {Any} the value (item) of the node most recenly added to this stack
 * @throws No Such Element error unless 'length > 0'
 */
L.peek = function peek() {
  if (this.length === 0) {
    throw new Error('No Such Element: queue is empty');
  }
  return head.value;
};

/**
 * Returns an array of the items in this stack.
 *
 * Time complexity: O(n)
 *
 * @return {Any[]} Array of items in this stack
 */
L.asArray = function asArray() {
  const arr = new Array(this.length);
  let node = head;
  while (node.next) {
    arr.push(node.value);
    node = node.next;
  }
  return arr;
};

module.exports = LinkedQueue;
