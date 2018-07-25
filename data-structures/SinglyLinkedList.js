let head = null;
let tail = null;

/**
 * A unidirectional implementation of a linked list.
 *
 * @constructor
 */
function SinglyLinkedList() {
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
}

/**
 * Helper method.
 *
 * Finds a node on a specific index within the linked list.
 *
 * Time complexity (worst): O(n)
 *
 * @param  {Integer} index [description]
 * @return {Node}       [description]
 */
function findNode(index) {
  let i = 0;
  let node = head;
  while (index > i) {
    node = node.next;
    i += 1;
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
    const oldHead = head;
    head = node;
    head.next = oldHead;
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
    tail = head = node
  } else {
    const nodeBefore = tail;
    tail = node;
    nodeBefore.next = tail;
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
    if (length === 1) {
      head = tail = null;
    } else {
      const { value } = head;
      head = head.next;
    }
    return value;
  }

  /**
   * Helper method.
   *
   * Removes the item on the tail of the linked list.
   * If the linked list has only one item, the tail and head will be 'null'.
   *
   * Time complexity (worst): O(n)
   *
   * @param  {Integer} length length of the linked list
   * @return {Any}        Value of the removed item
   */
  function removeTail(length) {
    if (length === 1) {
      tail = head = null;
    } else {
      const { value } = tail;
      tail = findNode(length - 2);
    }
    return value;
  }
}

const S = SinglyLinkedList.prototype;

/**
 * Adds a new item at the end (tail) of the linked list.
 *
 * Time complexity: O(1)
 *
 * @param {Any} value Item to be added
 */
S.add = function add(value) {
  pushToTail(new Node(value), this.length);
  this.length++;
};

/**
 * Inserts an item in a specific index of the linked list.
 *
 * Time complexity (worst): O(n)
 * Time complexity when 'index = 0' or 'index = length - 1': O(1)
 *
 * @param  {Any} value Item to be inserted
 * @param  {Integer} index Index of the linked list
 * @throws Illegal Argument error unless '0 >= index <= length'
 */
S.insertAt = function insertAt(value, index) {
  if (index < 0 || index > this.length) {
    throw Error(`Illegal Argument: given index is smaller than 0 or bigger than ${this.length}`);
  }
  const node = new Node(value);
  if (index === 0) {
    pushToHead(node, this.length);
  } else if (index === this.length) {
    pushToTail(node, this.length);
  } else {
    const nodeBefore = findNode(index - 1);
    const nodeNext = nodeBefore.next;
    nodeBefore.next = node;
    nodeBefore.next.next = nodeNext;
  }
  this.length++;
};

/**
 * Removes an item from a specific index of the linked list.
 *
 * Time complexity (worst): O(n)
 * Time complexity when 'index = 0': O(1)
 *
 * @param  {Integer} index Index of the linked list
 * @return {Any}       Value of the removed item
 */
S.removeAt = function removeAt(index) {
  if (index < 0 || index > this.length - 1) {
    throw Error(`Illegal Argument: given index is smaller than 0 or bigger than ${this.length - 1}`);
  }
  let value;
  if (index === 0) {
    value = removeHead(this.length);
  } else if (index === this.length - 1) {
    value = removeTail(this.length);
  } else {
    const nodeBefore = findNode(index - 1);
    value = nodeBefore.next.value;
    nodeBefore.next = nodeBefore.next.next;
  }
  this.length--;
  return value;
};

/**
 * Searches an item from a specific index of the linked list.
 *
 * Time complexity (worst): O(n)
 * Time complexity when 'index = 0' or 'index = length - 1': O(1)
 *
 * @param  {Integer} index Index of the linked list
 * @return {Any}       Value of the removed item
 */
S.search = function search(index) {
  if (index < 0 || index > this.length - 1) {
    throw Error(`Illegal Argument: index=${index} is smaller than 0 or bigger than 'length - 1'`);
  }
  if (index === 0) {
    return head.value;
  }
  if (index === this.length - 1) {
    return tail.value;
  }
  return findNode(index).value;
};

/**
 * Returns an array of the items in this linked list.
 *
 * Time complexity: O(n)
 *
 * @return {Any[]} Array of items in this linked list
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

module.exports = SinglyLinkedList;
