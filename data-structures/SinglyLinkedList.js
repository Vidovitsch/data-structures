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

const S = SinglyLinkedList.prototype;

/**
 * Adds a new item at the end (tail) of the linked list.
 *
 * Time complexity: O(1)
 *
 * @param {Any} value Item to be added
 */
S.add = function add(value) {
  const node = new Node(value);
  if (this.length === 0) {
    head = tail = node;
  } else {
    const nodeBefore = tail;
    tail = node;
    nodeBefore.next = tail;
  }
  this.length++;
};

/**
 * Inserts a new item in a specific index of the linked list.
 *
 * @param  {Any} value Item to be inserted
 * @param  {Integer} index Index of the linked list
 * @throws Illegal Argument error unless '0 >= index < length'
 */
S.insertAt = function insertAt(value, index) {
  if (index < 0 || index >= this.length) {
    throw Error(`Illegal Argument: given index is smaller than 0 or bigger than ${this.length - 1}`);
  }
  if (index === 0) {
    this.insertHead(value);
  } else if (index === this.length - 1) {
    this.add(value);
  } else {
    const nodeBefore = findNode(index - 1);
    const nodeNext = nodeBefore.next;
    nodeBefore.next = new Node(value);
    nodeBefore.next.next = nodeNext;
    this.length++;
  }
};

/**
 * [removeAt description]
 * @param  {[type]} index [description]
 * @return {[type]}       [description]
 */
S.removeAt = function removeAt(index) {
  if (index < 0 || index > this.length - 1) {
    throw Error(`Illegal Argument: index=${index} is smaller than 0 or bigger than 'length - 1'`);
  }
  if (index === 0) {
    this.removeHead();
  } else if (index === this.length - 1) {
    this.removeTail();
  } else {
    const nodeBefore = findNode(index - 1);
    nodeBefore.next = nodeBefore.next.next;
    this.length--;
  }
};

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

S.removeHead = function removeTail() {
  if (this.length === 0) {
    throw new Error('No Such Element: linked list is empty');
  }
  if (this.length === 1) {
    head = null;
    tail = null;
  } else {
    head = head.next;
  }
  this.length -= 1;
};

S.removeTail = function removeTail() {
  if (this.length === 0) {
    throw new Error('No Such Element: linked list is empty');
  }
  if (this.length === 1) {
    head = null;
    tail = null;
  } else {
    findNode(this.length - 2).next = null;
  }
  this.length -= 1;
};

S.insertHead = function insertHead(value) {
  const newNode = new Node(value);
  if (this.length === 0) {
    head = newNode;
    tail = newNode;
  } else {
    const oldHead = head;
    head = newNode;
    head.next = oldHead;
  }
  this.length += 1;
};

S.peekStart = function peekStart() {
  if (this.length === 0) {
    throw new Error('No Such Element: linked list is empty');
  }
  return head.value;
};

S.peekEnd = function peekEnd() {
  if (this.length === 0) {
    throw new Error('No Such Element: linked list is empty');
  }
  return tail.value;
};

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
