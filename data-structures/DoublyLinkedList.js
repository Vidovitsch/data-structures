let head = null;
let tail = null;

/**
 * A bidirectional implementation of a linked list.
 *
 * @constructor
 */
function DoublyLinkedList() {
  this.length = 0;
}

/**
 * Node that fills an index in the linked list.
 *
 * @param       {Any} value the value (item) to be added to this stack
 * @constructor
 */
function Node(value) {
  this.value = value;
  this.next = null;
  this.previous = null;
}

/**
 * Helper method.
 *
 * Finds a node on a specific index within the linked list.
 *
 * Time complexity (worst): O(0.5 * n)
 *
 * @param  {Integer} index [description]
 * @return {Node}       [description]
 */
function findNode(index, length) {
  const m = Math.floor(length / 2);
  let node;
  let i = 0;
  // If 'index' is smaller than half the length of the linked list,
  // then look from head, otherwise look from tail.
  if (m > index) {
    node = head;
    while (index > i) {
      node = node.next;
      i++;
    }
  } else {
    node = tail;
    while (index < length - i - 1) {
      node = node.previous;
      i++;
    }
  }
  return node;
}

/**
 * Helper method.
 *
 * Pushes an item to the head of the linked list.
 * If the linked list is empty, the tail and head will be the same.
 *
 * Time complexity (worst): O(1)
 *
 * @param  {Node} node Node to be pushed
 */
function pushToHead(node, length) {
  if (length === 0) {
    head = tail = node;
  } else {
    const nodeAfter = head;
    head = node;
    head.next = nodeAfter;
    head.next.previous = head;
  }
}

/**
 * Helper method.
 *
 * Pushes an item to the tail of the linked list.
 * If the linked list is empty, the tail and head will be the same.
 *
 * Time complexity (worst): O(1)
 *
 * @param  {Node} node Node to be pushed
 * @param  {Integer} length length of the linked list
 */
function pushToTail(node, length) {
  if (length === 0) {
    tail = head = node;
  } else {
    const nodeBefore = tail;
    tail = node;
    nodeBefore.next = tail;
    nodeBefore.next.previous = nodeBefore
  }
}

/**
 * Helper method.
 *
 * Removes the item on the head of the linked list.
 * If the linked list has only one item, the tail and head will be 'null'.
 *
 * Time complexity (worst): O(1)
 *
 * @param  {Integer} length length of the linked list
 * @return {Any}        Value of the removed item
 */
function removeHead(length) {
  let remValue;
  if (length === 1) {
    remValue = head.value;
    head = tail = null;
  } else {
    remValue = head.value;
    head = head.next;
    head.previous = null;
  }
  return remValue;
}

/**
 * Helper method.
 *
 * Removes the item on the tail of the linked list.
 * If the linked list has only one item, the tail and head will be 'null'.
 *
 * Time complexity (worst): O(1)
 *
 * @param  {Integer} length length of the linked list
 * @return {Any}        Value of the removed item
 */
function removeTail(length) {
  // If-statement to check 'length = 1' can be removed,
  // because it will never be called due the implementation of the removeAt() function
  const remValue = tail.value;
  tail = findNode(length - 2, length);
  tail.next = null;
  return remValue;
}

const D = DoublyLinkedList.prototype;

/**
 * Adds a new item at the end (tail) of the linked list.
 *
 * Time complexity: O(1)
 *
 * @param {Any} value Item to be added
 */
D.add = function add(value) {
  pushToTail(new Node(value), this.length);
  this.length++;
};

/**
 * Inserts an item in a specific index of the linked list.
 *
 * Time complexity (worst): O(0.5 * n)
 * Time complexity when 'index = 0' or 'index = length - 1': O(1)
 *
 * @param  {Any} value Item to be inserted
 * @param  {Integer} index Index of the linked list
 * @throws Illegal Argument error unless '0 >= index <= length'
 */
D.insertAt = function insertAt(value, index) {
  if (index < 0 || index > this.length) {
    throw Error(`Illegal Argument: given index is smaller than 0 or bigger than ${this.length}`);
  }
  const node = new Node(value);
  if (index === 0) {
    pushToHead(node, this.length);
  } else if (index === this.length) {
    pushToTail(node, this.length);
  } else {
    const nodeBefore = findNode(index - 1, this.length);
    const nodeNext = nodeBefore.next;
    nodeBefore.next = node;
    nodeBefore.next.previous = nodeBefore;
    nodeBefore.next.next = nodeNext;
    nodeBefore.next.next.previous = node;
  }
  this.length++;
};

/**
 * Removes an item from a specific index of the linked list.
 *
 * Time complexity (worst): O(0.5 * n)
 * Time complexity when 'index = 0' or 'index = length - 1': O(1)
 *
 * @param  {Integer} index Index of the linked list
 * @return {Any}       Value of the removed item
 */
D.removeAt = function removeAt(index) {
  if (index < 0 || index > this.length - 1) {
    throw Error(`Illegal Argument: given index is smaller than 0 or bigger than ${this.length - 1}`);
  }
  let value;
  if (index === 0) {
    value = removeHead(this.length);
  } else if (index === this.length - 1) {
    value = removeTail(this.length);
  } else {
    const nodeBefore = findNode(index - 1, this.length);
    value = nodeBefore.next.value;
    nodeBefore.next = nodeBefore.next.next;
    nodeBefore.next.previous = nodeBefore;
  }
  this.length--;
  return value;
};

/**
 * Searches an item from a specific index of the linked list.
 *
 * Time complexity (worst): O(0.5 * n)
 * Time complexity when 'index = 0' or 'index = length - 1': O(1)
 *
 * @param  {Integer} index Index of the linked list
 * @return {Any}       Value of the removed item
 */
D.search = function search(index) {
  if (index < 0 || index > this.length - 1) {
    throw Error(`Illegal Argument: given index is smaller than 0 or bigger than ${this.length - 1}`);
  }
  return index === 0 ? head.value : (index === this.length - 1 ? tail.value : findNode(index, this.length).value);
};

/**
 * Returns an array of the items in this linked list.
 * The array will be in reversed order if 'reversed' is true.
 *
 * Time complexity: O(n)
 *
 * @return {Any[]} Array of items in this linked list
 */
D.asArray = function asArray(reversed) {
  const arr = new Array(this.length);
  let node;
  if (reversed) {
    node = tail;
    for (let i = 0; i < this.length; i += 1) {
      arr[i] = node.value;
      node = node.previous;
    }
  } else {
    node = head;
    for (let i = 0; i < this.length; i += 1) {
      arr[i] = node.value;
      node = node.next;
    }
  }
  return arr;
};

module.exports = DoublyLinkedList;
