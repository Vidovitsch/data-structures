function Node(value) {
  this.value = value;
  this.next = null;
}

function LinkedList() {
  this.length = 0;
  this.head = null;
  this.tail = null;
}

const L = LinkedList.prototype;

L.insertAt = function insertAt(value, index) {
  if (index > this.length - 1) {
    throw new Error(`Illegal Argument: index ${index} doesn't exist`);
  }
};

L.removeAt = function removeAt(value, index) {

};

module.exports = LinkedList;
